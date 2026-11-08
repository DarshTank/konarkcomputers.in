"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getClientAuth } from '@/lib/firebase/client';
import { isAllowedAdminEmail } from '@/lib/constants/auth';
import { Loader2, ArrowRight } from 'lucide-react';
import styles from './login.module.css';

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
      <path fill="none" d="M0 0h48v48H0z" />
    </svg>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/admin';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoginSuccess = async (idToken: string) => {
    const res = await fetch('/api/admin/auth/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const auth = getClientAuth();
      try {
        await auth.signOut();
      } catch {}
      throw new Error(data.error || 'Server rejected admin session authorization.');
    }

    router.push(redirectPath);
  };

  const handleGoogleSignIn = async () => {
    setError(null);

    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey) {
      setError(
        'Missing NEXT_PUBLIC_FIREBASE_API_KEY in your deployment environment variables. Please add your Firebase credentials to your hosting dashboard (e.g., Vercel Project Settings > Environment Variables) and trigger a redeploy.'
      );
      return;
    }

    setLoading(true);

    try {
      const auth = getClientAuth();
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      const userCred = await signInWithPopup(auth, provider);
      const email = userCred.user.email?.toLowerCase();

      // Check strict admin whitelist
      if (!isAllowedAdminEmail(email)) {
        await auth.signOut();
        setError(
          `Access denied: "${userCred.user.email || 'This account'}" is not an authorized administrator.`
        );
        return;
      }

      const idToken = await userCred.user.getIdToken();
      await handleLoginSuccess(idToken);
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      if (err?.code === 'auth/invalid-api-key') {
        setError(
          'Firebase Error (auth/invalid-api-key): The Firebase API key is missing or invalid on your deployed site. Please ensure NEXT_PUBLIC_FIREBASE_API_KEY is configured in your hosting platform (Vercel) and redeploy.'
        );
      } else if (err?.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled.');
      } else if (err?.code === 'auth/unauthorized-domain') {
        setError(
          'Firebase Error (auth/unauthorized-domain): "konarkcomputers.in" is not authorized. Please go to Firebase Console > Authentication > Settings > Authorized Domains and add "konarkcomputers.in".'
        );
      } else {
        setError(err?.message || 'Google sign-in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.logoBadge}>
            <img
              src="/kon.webp"
              alt="Konark Computers Emblem"
              style={{ width: '130px', height: '130px', objectFit: 'contain' }}
            />
          </div>
          <h1>Konark Computers</h1>
          <p>Admin Operations &amp; Backoffice Console</p>
        </div>

        {error && <div className={styles.errorAlert}>{error}</div>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* <p style={{ fontSize: '0.82rem', color: '#64748b', textAlign: 'center', margin: '0 0 0.5rem' }}>
            Restricted access: Sign in with authorized account (<strong>darshtank05@gmail.com</strong> or <strong>omni1715@gmail.com</strong>).
          </p> */}

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={styles.googleBtn}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Signing in with Google...</span>
              </>
            ) : (
              <>
                <GoogleIcon />
                <span>Sign in with Google</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <React.Suspense fallback={<div className={styles.loginPage} />}>
      <LoginForm />
    </React.Suspense>
  );
}
