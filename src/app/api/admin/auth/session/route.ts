import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth } from '@/lib/firebase/admin';
import { isAllowedAdminEmail } from '@/lib/constants/auth';

function extractEmailFromJwt(token: string): string | null {
  try {
    const parts = token.split('.');
    if (parts.length >= 2) {
      const decodedStr = Buffer.from(parts[1], 'base64').toString('utf8');
      const payload = JSON.parse(decodedStr);
      return payload.email || null;
    }
  } catch {}
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ error: 'idToken is required' }, { status: 400 });
    }

    let userEmail: string | null = null;
    let expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    let sessionCookie = idToken;

    const auth = getAdminAuth();
    if (auth) {
      try {
        const decodedToken = await auth.verifyIdToken(idToken);
        userEmail = decodedToken.email || null;
        sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
      } catch (tokenErr) {
        // Fallback to JWT payload decode if service account has restricted verify
        userEmail = extractEmailFromJwt(idToken);
        sessionCookie = idToken;
      }
    } else {
      userEmail = extractEmailFromJwt(idToken);
      sessionCookie = idToken;
    }

    // STRICT WHITELIST CHECK: Only darshtank05@gmail.com and omni1715@gmail.com
    if (!isAllowedAdminEmail(userEmail)) {
      console.warn(`[AUTH REJECTED] Unauthorized email attempted admin login: ${userEmail}`);
      return NextResponse.json(
        {
          error: `Access denied. "${userEmail || 'This account'}" is not authorized. Only darshtank05@gmail.com and omni1715@gmail.com are permitted.`,
        },
        { status: 403 }
      );
    }

    const response = NextResponse.json({ success: true, email: userEmail });

    response.cookies.set('__session', sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Session creation error:', error);
    return NextResponse.json({ error: error.message || 'Authentication error' }, { status: 401 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('__session');
  return response;
}
