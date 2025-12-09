"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Trophy, Calendar, Users } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname() || '/';
  const current = pathname.split('/')[1] || 'dashboard';

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard', key: 'dashboard' },
    { icon: BookOpen, label: 'Learning Path', href: '/learning', key: 'learning' },
    { icon: Trophy, label: 'Challenges', href: '/challenges', key: 'challenges' },
    { icon: Calendar, label: 'Events', href: '/events', key: 'events' },
    { icon: Users, label: 'Rooms', href: '/rooms', key: 'rooms' }
  ];

  return (
    <div className="w-64 bg-black p-6 flex flex-col border-r border-gray-800">
      <div className="text-orange-500 text-2xl font-bold mb-12">logo</div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              item.key === current
                ? 'bg-orange-500/10 text-orange-500'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <Link href="/host" className="w-full bg-orange-500 text-black font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors text-center">
        Host a CTF
      </Link>
    </div>
  );
};

export default Sidebar;