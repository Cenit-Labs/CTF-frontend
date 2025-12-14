'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function AuthCallbackClient() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    console.log('Callback token:', token);

    if (token) {
      document.cookie = `authToken=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
      localStorage.setItem('authToken', token);
      console.log('Token stored, redirecting to dashboard');
      window.location.replace('/dashboard');
    } else {
      console.log('No token found, redirecting to login');
      window.location.replace('/login');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-neutral-400">Authenticating...</p>
      </div>
    </div>
  );
}
