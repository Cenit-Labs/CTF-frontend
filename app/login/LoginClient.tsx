'use client';
import React, { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import GoogleOAuthButton from '@/components/auth/GoogleOAuthButton';
import { authService } from '@/lib/auth';

export default function LoginClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/dashboard';

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('authToken', token);
      router.replace(redirectTo);
    }
  }, [searchParams, router, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(email, password);
      router.push(redirectTo);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
      <div className="max-w-sm mx-auto w-full">
        <h2 className="text-3xl font-bold text-orange-500 mb-8">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-2">
              Email or Username
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com or username"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-400 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-black font-semibold py-3 px-4 rounded-lg transition-colors shadow-lg"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="text-center">
            <button type="button" className="text-sm text-neutral-400 hover:text-orange-500 transition-colors">
              Forgot Password?
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-700"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-neutral-900 text-neutral-500">or continue with</span>
            </div>
          </div>

          <GoogleOAuthButton label="Google" />

          <p className="text-center text-sm text-neutral-400 mt-4">
            Don't have an account?{' '}
            <button type="button" onClick={handleRegister} className="text-orange-500 hover:text-orange-400 font-medium transition-colors">
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
