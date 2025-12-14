import React, { Suspense } from 'react';
import { Shield } from 'lucide-react';
import LoginClient from './LoginClient';

export default function LoginPage() {
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
          <div className="hidden md:block w-1/2 bg-linear-to-br from-orange-600 via-orange-500 to-orange-600 relative overflow-hidden">
            <div className="absolute inset-0">
              {/* Geometric shapes */}
              <div className="absolute top-0 left-0 w-full h-full opacity-40">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-700 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-orange-800 rounded-full transform translate-x-1/2"></div>
                <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-orange-600 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
              </div>
              {/* Angular overlays */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-br from-orange-700 to-transparent transform skew-y-12"></div>
                <div className="absolute bottom-0 right-0 w-full h-1/2 bg-linear-to-tl from-orange-800 to-transparent transform -skew-y-12"></div>
              </div>
            </div>
          </div>

          {/* Right Panel - Login Form */}
          <Suspense
            fallback={
              <div className="w-full md:w-1/2 p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                  <p className="text-neutral-400">Loading...</p>
                </div>
              </div>
            }
          >
            <LoginClient />
          </Suspense>
        </div>
      </div>
    </div>
  );
}