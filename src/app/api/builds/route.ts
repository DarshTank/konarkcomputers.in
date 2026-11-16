import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getBuildConfig, getBuildProfiles } from '@/lib/builds/config';
import { generateBuilds } from '@/lib/builds/generator';
import { getCatalogSnapshot } from '@/lib/db/catalog';
import { checkSharedRateLimit, rateLimitKey, PUBLIC_API_POLICY } from '@/lib/rate-limit';

const requestSchema = z.object({
  platform: z.enum(['intel', 'ryzen']),
  budgetPaise: z.number().int().positive().max(1000000000),
  customerStateCode: z.number().int().min(1).max(37).optional(),
});

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const limited = await checkSharedRateLimit(rateLimitKey(request, 'builds'), PUBLIC_API_POLICY);
  if (!limited.allowed) return NextResponse.json({ error: 'TOO_MANY_REQUESTS' }, { status: 429, headers: { 'Retry-After': String(Math.ceil((limited.resetAt - Date.now()) / 1000)) } });
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'INVALID_BUILD_REQUEST', details: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const [catalog, config, profiles] = await Promise.all([
      getCatalogSnapshot(),
      getBuildConfig(),
      getBuildProfiles(),
    ]);
    const result = generateBuilds(parsed.data, { ...catalog, profiles }, config);
    const productsById = new Map(catalog.products.map((product) => [product.id, product]));
    const builds = result.builds.map((build) => ({
      ...build,
      parts: build.items
        .map((item) => productsById.get(item.productId))
        .filter((product): product is (typeof catalog.products)[number] => Boolean(product))
        .map((product) => ({
          id: product.id,
          name: product.name,
          categoryId: product.categoryId,
          brandName: product.brandName,
          pricing: product.pricing,
          condition: product.condition,
          warrantyMonths: product.warrantyMonths,
        })),
    }));
    return NextResponse.json({ ...result, builds, catalogVersion: catalog.catalogVersion });
  } catch (error) {
    return NextResponse.json(
      { error: 'BUILD_GENERATION_FAILED', message: error instanceof Error ? error.message : 'Unable to generate builds' },
      { status: 503 }
    );
  }
}
