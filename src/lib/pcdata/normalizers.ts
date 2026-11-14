import crypto from 'node:crypto';

export type PcPartCategory =
  | 'processor'
  | 'motherboard'
  | 'ram-desktop'
  | 'graphics-card'
  | 'power-supply'
  | 'cabinet'
  | 'cpu-cooler'
  | 'cabinet-fan'
  | 'internal-hard-drive'
  | 'ssd-sata'
  | 'ssd-nvme'
  | 'hdd-internal'
  | 'monitor';

export type RawPcPart = Record<string, unknown> & { name?: unknown; price?: unknown };

export interface NormalizedPcPart {
  externalKey: string;
  categoryId: PcPartCategory;
  name: string;
  specs: Record<string, unknown>;
  derivedFields: string[];
  priceUsd?: number;
  brand?: string;
  sourceRaw: RawPcPart;
}

const CATEGORY_RULES: Record<PcPartCategory, (row: RawPcPart, out: NormalizedPcPart) => void> = {
  processor: (row, out) => {
    if (typeof row.core_count === 'number') out.specs.cores = row.core_count;
    if (typeof row.core_clock === 'number') out.specs.baseClockGhz = row.core_clock;
    if (typeof row.boost_clock === 'number') out.specs.boostClockGhz = row.boost_clock;
    if (typeof row.graphics === 'string' && row.graphics) out.specs.graphics = row.graphics;
    if (typeof row.microarchitecture === 'string') out.specs.microarchitecture = row.microarchitecture;
  },
  motherboard: (row, out) => {
    if (typeof row.socket === 'string') out.specs.socket = row.socket.toUpperCase();
    if (typeof row.form_factor === 'string') out.specs.formFactor = row.form_factor;
    if (typeof row.memory_slots === 'number') out.specs.memorySlots = row.memory_slots;
    if (typeof row.max_memory === 'number') out.specs.maxMemoryGb = row.max_memory;
  },
  'ram-desktop': (row, out) => {
    if (typeof row.speed === 'number') out.specs.speedMhz = row.speed;
    if (typeof row.modules === 'number') out.specs.modules = row.modules;
    if (typeof row.cas_latency === 'number') out.specs.casLatency = row.cas_latency;
    if (typeof row.first_word_latency === 'number') out.specs.firstWordLatency = row.first_word_latency;
  },
  'graphics-card': (row, out) => {
    if (typeof row.memory === 'number') out.specs.memoryGb = row.memory;
    if (typeof row.chipset === 'string') out.specs.chipset = row.chipset;
    if (typeof row.length === 'number') out.specs.lengthMm = row.length;
  },
  'power-supply': (row, out) => {
    if (typeof row.wattage === 'number') out.specs.wattage = row.wattage;
    if (typeof row.efficiency === 'string') out.specs.efficiency = row.efficiency;
    if (typeof row.modular === 'string') out.specs.modular = row.modular;
  },
  cabinet: (row, out) => {
    if (typeof row.type === 'string') out.specs.formFactor = row.type;
    if (typeof row.external_volume === 'number') out.specs.volumeL = row.external_volume;
    if (typeof row.internal_35_bays === 'number') out.specs.internal35Bays = row.internal_35_bays;
  },
  'cpu-cooler': (row, out) => {
    if (typeof row.size === 'number') out.specs.sizeMm = row.size;
    if (typeof row.rpm === 'string') out.specs.rpm = row.rpm;
    if (typeof row.noise_level === 'number') out.specs.noiseDb = row.noise_level;
  },
  'cabinet-fan': () => undefined,
  'hdd-internal': (row, out) => {
    if (typeof row.capacity === 'number') out.specs.capacityGb = row.capacity;
    if (typeof row.type === 'string') out.specs.driveType = row.type;
    if (typeof row.interface === 'string') out.specs.interface = row.interface;
  },
  'internal-hard-drive': (row, out) => {
    if (typeof row.capacity === 'number') out.specs.capacityGb = row.capacity;
    if (typeof row.type === 'string' || typeof row.type === 'number') out.specs.driveType = String(row.type);
    if (typeof row.interface === 'string') out.specs.interface = row.interface;
  },
  'ssd-sata': (row, out) => {
    if (typeof row.capacity === 'number') out.specs.capacityGb = row.capacity;
    out.specs.driveType = 'SSD';
    if (typeof row.interface === 'string') out.specs.interface = row.interface;
  },
  'ssd-nvme': (row, out) => {
    if (typeof row.capacity === 'number') out.specs.capacityGb = row.capacity;
    out.specs.driveType = 'SSD';
    if (typeof row.interface === 'string') out.specs.interface = row.interface;
  },
  monitor: () => undefined,
};

export function normalizePcPart(categoryId: PcPartCategory, row: RawPcPart): NormalizedPcPart {
  const name = typeof row.name === 'string' ? row.name.trim() : '';
  if (!name) throw new Error('PC part name is required');
  const resolvedCategory = categoryId === 'internal-hard-drive'
    ? resolveStorageCategory(row)
    : categoryId;
  if (!resolvedCategory) throw new Error('Unsupported internal-drive type or interface');
  const sourceRaw = { ...row };
  const externalKey = `pcpp:${crypto.createHash('sha1')
    .update(`${resolvedCategory}|${name.toLowerCase()}`)
    .digest('hex')
    .slice(0, 20)}`;
  const out: NormalizedPcPart = {
    externalKey,
    categoryId: resolvedCategory,
    name,
    specs: { ...row },
    derivedFields: [],
    priceUsd: typeof row.price === 'number' ? row.price : undefined,
    brand: typeof row.brand === 'string' ? row.brand.trim().toLowerCase() : undefined,
    sourceRaw,
  };
  const before = new Set(Object.keys(out.specs));
  CATEGORY_RULES[resolvedCategory](row, out);
  for (const key of Object.keys(out.specs)) if (!before.has(key)) out.derivedFields.push(key);
  return out;
}

export function resolveStorageCategory(row: RawPcPart): 'ssd-nvme' | 'ssd-sata' | 'hdd-internal' | undefined {
  const type = String(row.type ?? '').toLowerCase();
  const formFactor = String(row.form_factor ?? '').toLowerCase();
  const driveInterface = String(row.interface ?? '').toLowerCase();
  if (formFactor.includes('msata') || driveInterface.includes('sas')) return undefined;
  if (type === 'ssd') {
    if (formFactor.startsWith('m.2') || formFactor.includes('pcie') ||
      driveInterface.includes('m.2') || driveInterface.includes('pcie')) {
      return 'ssd-nvme';
    }
    return 'ssd-sata';
  }
  if (/^\d+(?:\.\d+)?$/.test(type) || formFactor === '3.5' || formFactor === '2.5') {
    return 'hdd-internal';
  }
  return undefined;
}
