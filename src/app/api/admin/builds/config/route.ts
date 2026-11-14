import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { verifyAdminRequest } from '@/lib/firebase/auth';
import { DEFAULT_BUILD_CONFIG, getBuildConfig, getBuildProfiles } from '@/lib/builds/config';
import { getAdminDb } from '@/lib/firebase/admin';
import type { BuildConfig } from '@/lib/db/types';

export async function GET() {
  const [config, profiles] = await Promise.all([getBuildConfig(), getBuildProfiles()]);
  return NextResponse.json({ config, profiles });
}

export async function PUT(request: NextRequest) {
  try {
    const user = await verifyAdminRequest(request);
    const body = await request.json();
    const config = body.config as Partial<BuildConfig>;
    if (!config || typeof config !== 'object' ||
      typeof config.tolerancePct !== 'number' || typeof config.stretchPct !== 'number' ||
      typeof config.maxBuildsShown !== 'number' ||
      config.tolerancePct < 0 || config.tolerancePct > 100 ||
      config.stretchPct < 0 || config.stretchPct > 100 ||
      config.maxBuildsShown < 1 || config.maxBuildsShown > 20) {
      return NextResponse.json({ error: 'Invalid build configuration' }, { status: 400 });
    }
    const merged = { ...DEFAULT_BUILD_CONFIG, ...config };
    const db = getAdminDb();
    if (db) {
      await db.collection('settings').doc('buildConfig').set({ ...merged, updatedBy: user?.email || 'admin', updatedAt: new Date() }, { merge: true });
      await db.collection('adminAudit').add({ who: user?.email || 'admin', action: 'update_build_config', collection: 'settings', docId: 'buildConfig', after: merged, timestamp: new Date() });
    }
    try { revalidateTag('catalog'); } catch {}
    return NextResponse.json({ success: true, config: merged });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to save build configuration' }, { status: 500 });
  }
}
