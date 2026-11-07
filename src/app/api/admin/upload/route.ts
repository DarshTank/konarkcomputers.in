import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/firebase/auth';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const isEnabled = process.env.NEXT_PUBLIC_ENABLE_PRODUCT_IMAGES === 'true';

  if (!isEnabled) {
    return NextResponse.json(
      { error: 'Product image uploads are disabled via feature flag (NEXT_PUBLIC_ENABLE_PRODUCT_IMAGES=false)' },
      { status: 403 }
    );
  }

  // Ensure caller is authenticated admin
  const admin = await verifyAdminRequest(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
          maximumSizeInBytes: 5 * 1024 * 1024, // 5MB max
          tokenPayload: JSON.stringify({
            uploadedBy: admin.email,
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('Blob upload completed:', blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

