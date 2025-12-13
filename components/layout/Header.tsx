// components/Header.tsx
 'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { User } from 'lucide-react';
import { authService } from '@/lib/auth';

interface HeaderProps {
  className?: string;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '', title }) => {
  const pathname = usePathname();

  // Map routes to page titles - matching your sidebar routes
  const getPageTitle = (path: string): string => {
    const routes: Record<string, string> = {
      '/': 'Dashboard',
      '/dashboard': 'Dashboard',
      '/learning': 'Learning Path',
      '/challenges': 'Challenges',
      '/events': 'Events',
      '/rooms': 'Rooms',
      '/host': 'Host a CTF',
    };

    // Return the matching route or format the pathname
    if (routes[path]) {
      return routes[path];
    }

    // Handle dynamic routes or nested paths
    const segments = path.split('/').filter(Boolean);
    if (segments.length > 0) {
      const lastSegment = segments[segments.length - 1];
      return lastSegment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }

    return 'Dashboard';
  };

  const pageTitle = getPageTitle(pathname);

  // fetch username when on the client so we can show "Welcome Back, {username}" on Dashboard
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await authService.getCurrentUser();
        if (mounted && res?.user?.username) setUsername(res.user.username);
      } catch (err) {
        // ignore errors - we'll fall back to page title
      }
    })();

    return () => { mounted = false; };
  }, []);

  // If the page is Dashboard and there's no explicit title prop, show a personalized welcome
  const displayTitle = title ?? (pageTitle === 'Dashboard' ? `Welcome Back, ${username ?? 'User'}` : pageTitle);

  return (
    <div className={`mb-6 md:mb-8 ${className}`}>
      <div className="flex items-center justify-between -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 mb-6">
        <div className="text-white-500 text-xl md:text-4xl font-bold">
          {displayTitle}
        </div>
        <Link href="/profile" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-500 flex items-center justify-center hover:bg-orange-600 transition-colors" aria-label="Profile">
          <User size={20} className="text-black" />
        </Link>
      </div>
    </div>
  );
};

export default Header;