"use client";
import React, { useState } from 'react';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import GoogleOAuthButton from '@/components/auth/GoogleOAuthButton';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/dashboard');
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      {/* Logo */}
      <div className="p-8">
        <h1 className="text-2xl font-bold text-orange-500">logo</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl flex">
          {/* Left Panel - Geometric Design */}
          <div className="hidden md:block w-1/2 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600 relative overflow-hidden">
            <div className="absolute inset-0">
              {/* Geometric shapes */}
              <div className="absolute top-0 left-0 w-full h-full opacity-40">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-700 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-orange-800 rounded-full transform translate-x-1/2"></div>
                <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-orange-600 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
              </div>
              {/* Angular overlays */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-orange-700 to-transparent transform skew-y-12"></div>
                <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-tl from-orange-800 to-transparent transform -skew-y-12"></div>
              </div>
            </div>
          </div>

          {/* Right Panel - Login Form */}
          <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full">
              <h2 className="text-3xl font-bold text-orange-500 mb-8">Welcome Back</h2>

              <div className="space-y-5">
                {/* Email Input */}
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

                {/* Password Input */}
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
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold py-3 px-4 rounded-lg transition-colors shadow-lg"
                >
                  Login
                </button>

                {/* Forgot Password */}
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-neutral-400 hover:text-orange-500 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-700"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-neutral-900 text-neutral-500">or continue with</span>
                  </div>
                </div>

                {/* Google Button */}
                <GoogleOAuthButton label="Google" />

                {/* Sign Up Link */}
                <p className="text-center text-sm text-neutral-400 mt-4">
                  Don't have an account?{' '}
                  <button
                    onClick={handleRegister}
                    className="text-orange-500 hover:text-orange-400 font-medium transition-colors"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}