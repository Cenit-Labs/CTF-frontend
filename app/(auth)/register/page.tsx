'use client';
import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import GoogleOAuthButton from '@/components/auth/GoogleOAuthButton';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('');

  const handleSignUp = () => {
    console.log('Sign up submitted:', { fullName, username, email, password, college });
  };

  const handleGoogleSignUp = () => {
    console.log('Google sign up');
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500"></div>

      {/* Logo */}
      <div className="absolute top-8 left-8">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-orange-500" />
          <span className="text-2xl font-bold text-orange-500">logo</span>
        </div>
      </div>

      <div className="w-full max-w-5xl flex gap-0 bg-neutral-900 rounded-lg overflow-hidden shadow-2xl">
        {/* Left Side - Form */}
        <div className="flex-1 p-12">
          <h1 className="text-3xl font-bold text-orange-500 mb-8">Create Account</h1>

          <div className="space-y-4">
            {/* Full Name */}
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name*"
              className="w-full bg-neutral-800 border border-neutral-700 rounded px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />

            {/* Username */}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username*"
              className="w-full bg-neutral-800 border border-neutral-700 rounded px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />

            {/* Email */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email*"
              className="w-full bg-neutral-800 border border-neutral-700 rounded px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />

            {/* Password */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password*"
              className="w-full bg-neutral-800 border border-neutral-700 rounded px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />

            {/* College */}
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="College"
              className="w-full bg-neutral-800 border border-neutral-700 rounded px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />

            {/* Sign Up Button */}
            <button
              onClick={handleSignUp}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded transition-colors shadow-lg shadow-orange-500/20"
            >
              Sign up
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-neutral-900 text-neutral-500">or continue with</span>
              </div>
            </div>

            {/* Google Sign Up */}
            <GoogleOAuthButton label='Google'/>

            {/* Login Link */}
            <div className="text-center mt-6">
              <span className="text-neutral-400 text-sm">Already have an account? </span>
              <button
                onClick={handleLoginRedirect}
                className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Decorative */}
        <div className="hidden md:block w-96 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 relative overflow-hidden">
          {/* Abstract Shapes */}
          <div className="absolute top-1/4 -right-20 w-64 h-64 bg-orange-400 rounded-full opacity-50"></div>
          <div className="absolute top-1/2 -right-10 w-48 h-48 bg-orange-300 rounded-full opacity-40"></div>
          <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-orange-600 rounded-full opacity-30"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-orange-500 transform rotate-45 opacity-60"></div>
        </div>
      </div>
    </div>
  );
}