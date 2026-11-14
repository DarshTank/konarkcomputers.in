export type PcDataContract = {
  file: string;
  requiredKeys: string[];
  critical: boolean;
};

export const PC_DATA_CONTRACT: PcDataContract[] = [
  { file: 'cpu.json', requiredKeys: ['name', 'price', 'core_count', 'core_clock', 'boost_clock', 'microarchitecture', 'tdp', 'graphics'], critical: true },
  { file: 'motherboard.json', requiredKeys: ['name', 'price', 'socket', 'form_factor', 'max_memory', 'memory_slots', 'color'], critical: true },
  { file: 'memory.json', requiredKeys: ['name', 'price', 'speed', 'modules', 'cas_latency', 'first_word_latency'], critical: true },
  { file: 'video-card.json', requiredKeys: ['name', 'price', 'chipset', 'memory', 'core_clock', 'boost_clock', 'length'], critical: false },
  { file: 'power-supply.json', requiredKeys: ['name', 'price', 'type', 'efficiency', 'wattage', 'modular'], critical: true },
  { file: 'case.json', requiredKeys: ['name', 'price', 'type', 'color', 'psu', 'side_panel', 'external_volume', 'internal_35_bays'], critical: true },
  { file: 'cpu-cooler.json', requiredKeys: ['name', 'price', 'rpm', 'noise_level', 'size'], critical: false },
  { file: 'case-fan.json', requiredKeys: ['name', 'price'], critical: false },
  { file: 'internal-hard-drive.json', requiredKeys: ['name', 'price', 'capacity', 'type', 'cache', 'form_factor', 'interface'], critical: true },
  { file: 'monitor.json', requiredKeys: ['name', 'price'], critical: false },
];
