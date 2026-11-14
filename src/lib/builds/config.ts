import { getAdminDb } from '../firebase/admin';
import type { BuildConfig, BuildProfile } from '../db/types';

export const DEFAULT_BUILD_CONFIG: BuildConfig = {
  platforms: {
    intel: {
      minPaise: 4000000,
      maxPaise: 30000000,
      stepPaise: 500000,
      presetsPaise: [5000000, 10000000, 15000000, 20000000],
    },
    ryzen: {
      minPaise: 4000000,
      maxPaise: 30000000,
      stepPaise: 500000,
      presetsPaise: [5000000, 10000000, 15000000, 20000000],
    },
  },
  tolerancePct: 15,
  stretchPct: 10,
  maxBuildsShown: 3,
  supportedSockets: {
    intel: ['LGA1200', 'LGA1700', 'LGA1851'],
    ryzen: ['AM4', 'AM5'],
  },
  autoServiceItemIds: ['srv-assembly'],
  requireGpuWhenNoIgpu: true,
};

export const DEFAULT_BUILD_PROFILES: BuildProfile[] = [
  {
    id: 'essential',
    name: 'Essential',
    tier: 1,
    isActive: true,
    minBudgetPaise: 4000000,
    maxBudgetPaise: 10000000,
    shares: { processor: 0.24, motherboard: 0.16, 'ram-desktop': 0.1, 'ssd-nvme': 0.12, 'power-supply': 0.08, cabinet: 0.07, 'graphics-card': 0.15 },
    required: ['processor', 'motherboard', 'ram-desktop', 'ssd-nvme', 'power-supply', 'cabinet'],
    optional: ['graphics-card', 'cpu-cooler'],
    minSpecs: {},
  },
  {
    id: 'balanced',
    name: 'Balanced',
    tier: 2,
    isActive: true,
    minBudgetPaise: 10000001,
    maxBudgetPaise: 20000000,
    shares: { processor: 0.2, motherboard: 0.13, 'ram-desktop': 0.09, 'ssd-nvme': 0.1, 'power-supply': 0.07, cabinet: 0.06, 'graphics-card': 0.28 },
    required: ['processor', 'motherboard', 'ram-desktop', 'ssd-nvme', 'power-supply', 'cabinet'],
    optional: ['graphics-card', 'cpu-cooler'],
    minSpecs: {},
  },
  {
    id: 'performance',
    name: 'Performance',
    tier: 3,
    isActive: true,
    minBudgetPaise: 20000001,
    maxBudgetPaise: 30000000,
    shares: { processor: 0.16, motherboard: 0.11, 'ram-desktop': 0.08, 'ssd-nvme': 0.09, 'power-supply': 0.07, cabinet: 0.05, 'graphics-card': 0.38 },
    required: ['processor', 'motherboard', 'ram-desktop', 'ssd-nvme', 'power-supply', 'cabinet'],
    optional: ['graphics-card', 'cpu-cooler'],
    minSpecs: {},
  },
];

export async function getBuildConfig(): Promise<BuildConfig> {
  const db = getAdminDb();
  if (!db) return DEFAULT_BUILD_CONFIG;
  const snapshot = await db.collection('settings').doc('buildConfig').get();
  return snapshot.exists
    ? { ...DEFAULT_BUILD_CONFIG, ...(snapshot.data() as Partial<BuildConfig>) }
    : DEFAULT_BUILD_CONFIG;
}

export async function getBuildProfiles(): Promise<BuildProfile[]> {
  const db = getAdminDb();
  if (!db) return DEFAULT_BUILD_PROFILES;
  const snapshot = await db.collection('buildProfiles').where('isActive', '==', true).get();
  if (snapshot.empty) return DEFAULT_BUILD_PROFILES;
  return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<BuildProfile, 'id'>) }));
}
