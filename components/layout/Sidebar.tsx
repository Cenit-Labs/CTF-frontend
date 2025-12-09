"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Trophy, Calendar, Users, Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() || '/';
  const current = pathname.split('/')[1] || 'dashboard';

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard', key: 'dashboard' },
    { icon: BookOpen, label: 'Learning Path', href: '/learning', key: 'learning' },
    { icon: Trophy, label: 'Challenges', href: '/challenges', key: 'challenges' },
    { icon: Calendar, label: 'Events', href: '/events', key: 'events' },
    { icon: Users, label: 'Rooms', href: '/rooms', key: 'rooms' }
  ];

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-black border border-gray-800 rounded-lg text-orange-500"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-black p-6 flex flex-col border-r border-gray-800 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="text-orange-500 text-2xl font-bold mb-12">logo</div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={closeSidebar}
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

        <Link
          href="/host"
          onClick={closeSidebar}
          className="w-full bg-orange-500 text-black font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors text-center"
        >
          Host a CTF
        </Link>
      </div>
    </>
  );
};

export default Sidebar;