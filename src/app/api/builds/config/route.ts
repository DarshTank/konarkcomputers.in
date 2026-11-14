import { NextResponse } from 'next/server';
import { getBuildConfig } from '@/lib/builds/config';
import { getCatalogSnapshot } from '@/lib/db/catalog';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [config, catalog] = await Promise.all([getBuildConfig(), getCatalogSnapshot()]);
    return NextResponse.json({ config: config.platforms, catalogVersion: catalog.catalogVersion });
  } catch (error) {
    return NextResponse.json(
      { error: 'BUILD_CONFIG_UNAVAILABLE', message: error instanceof Error ? error.message : 'Unable to load build settings' },
      { status: 503 }
    );
  }
}
