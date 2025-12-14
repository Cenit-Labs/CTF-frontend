"use client";

import React, { useState } from 'react';
import { Target, BookOpen, Trophy } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import EditProfileModal, { ProfileData } from '@/components/profile/EditProfileModal';

interface StatCardProps {
  title: string;
  value: string | number;
}

interface ActivityProps {
  icon: React.ReactNode;
  title: string;
  timeAgo: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <div className="bg-zinc-900 rounded-lg p-4 sm:p-5 md:p-6 border border-zinc-800">
    <p className="text-zinc-400 text-xs sm:text-sm mb-1 sm:mb-2">{title}</p>
    <p className="text-white text-xl sm:text-2xl md:text-3xl font-bold">{value}</p>
  </div>
);

const ActivityItem: React.FC<ActivityProps> = ({ icon, title, timeAgo }) => (
  <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4 last:mb-0">
    <div className="text-orange-500 mt-1">{icon}</div>
    <div className="flex-1">
      <p className="text-white text-xs sm:text-sm">{title}</p>
      <p className="text-zinc-500 text-xs mt-1">{timeAgo}</p>
    </div>
  </div>
);

const ProfilePage: React.FC = () => {
  // Generate contribution grid
  const generateContributions = () => {
    const grid = [];
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 20; j++) {
        const random = Math.random();
        let intensity = 0;
        if (random > 0.7) intensity = 1;
        if (random > 0.8) intensity = 2;
        if (random > 0.9) intensity = 3;
        if (random > 0.95) intensity = 4;
        grid.push(intensity);
      }
    }
    return grid;
  };

  const contributions = generateContributions();

  const getContributionColor = (intensity: number) => {
    const colors = ['bg-zinc-800', 'bg-orange-900', 'bg-orange-700', 'bg-orange-600', 'bg-orange-500'];
    return colors[intensity];
  };

  // Profile state
  const [showModal, setShowModal] = useState(false);
  const [displayName, setDisplayName] = useState('Mathew Joseph T A');
  const [displayAvatar, setDisplayAvatar] = useState<string | null>(
    'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=200&h=200&fit=crop'
  );
  const [displayCollege, setDisplayCollege] = useState<string | null>(null);
  const [email] = useState('mathew.joseph@example.com');
  const [emailVerified, setEmailVerified] = useState(false);
  const [discordConnected, setDiscordConnected] = useState(false);

  const handleSaveProfile = (data: ProfileData) => {
    setDisplayName(data.name);
    setDisplayAvatar(data.avatar);
    setDisplayCollege(data.college);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 ml-0 sm:ml-64 overflow-y-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 ml-14 mt-2 md:mb-6">Profile</h1>

        {/* Profile Header */}
        <div className="relative mb-4 sm:mb-6 md:mb-8">
          {/* Banner with waves */}
          <div className="relative h-32 sm:h-36 md:h-44 bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 rounded-t-xl sm:rounded-t-2xl overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="waves" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                  <path
                    d="M0,100 Q50,80 100,100 T200,100"
                    fill="none"
                    stroke="rgba(0,0,0,0.1)"
                    strokeWidth="60"
                  />
                  <path
                    d="M0,120 Q50,100 100,120 T200,120"
                    fill="none"
                    stroke="rgba(0,0,0,0.15)"
                    strokeWidth="60"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#waves)" />
            </svg>
          </div>

          {/* Profile Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between -mx-3 sm:-mx-4 md:-mx-8 px-3 sm:px-4 md:px-8 -mt-12 sm:-mt-14 md:-mt-16 relative z-10 gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto">
              <img
                src={
                  displayAvatar ??
                  'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=200&h=200&fit=crop'
                }
                alt="Profile"
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-black object-cover"
              />
              <div className="mb-0 sm:mb-2">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{displayName}</h2>
                <p className="text-zinc-400 text-sm sm:text-base">@mathewjosephta</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mt-1">
                  <p className="text-zinc-500 text-xs sm:text-sm">
                    {displayCollege ? `🏫 ${displayCollege}` : '🗓️ Joined Dec 2025'}
                  </p>
                  {emailVerified && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded border border-green-500/30">
                      ✓ Verified
                    </span>
                  )}
                  {discordConnected && (
                    <span className="text-xs bg-[#5865F2]/20 text-[#5865F2] px-2 py-1 rounded border border-[#5865F2]/30">
                      Discord Connected
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-black font-semibold py-2 sm:py-2.5 md:py-3 px-6 sm:px-7 md:px-8 rounded-lg transition mb-0 sm:mb-2 text-sm sm:text-base whitespace-nowrap"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Contributions Section */}
        <div className="bg-zinc-900 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 md:mb-8 border border-zinc-800 overflow-x-auto">
          <div className="flex items-center justify-between mb-3 sm:mb-4 min-w-max">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Contributions</h3>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="text-zinc-400">Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-2 h-2 sm:w-3 sm:h-3 ${getContributionColor(i)} rounded-sm`}></div>
                ))}
              </div>
              <span className="text-zinc-400">More</span>
            </div>
          </div>
          <div className="grid grid-cols-20 gap-0.5 sm:gap-1 min-w-max">
            {contributions.map((intensity, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${getContributionColor(intensity)} rounded-sm`}
                title={`${intensity} contributions`}
              ></div>
            ))}
          </div>
        </div>

        {/* Stats, Badges, and Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {/* Stats */}
          <div className="bg-zinc-900 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-zinc-800">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-500 mb-4 sm:mb-5 md:mb-6">Stats</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <StatCard title="Global Rank" value="#1255" />
              <StatCard title="Total Points" value="1000xp" />
              <StatCard title="Largest Streak" value="8 Days" />
              <StatCard title="Total Badges" value="2" />
            </div>
          </div>

          {/* Badges */}
          <div className="bg-zinc-900 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-zinc-800">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-500 mb-4 sm:mb-5 md:mb-6">Badges</h3>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {/* Earned badges */}
              <div className="flex justify-center">
                <Trophy className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-orange-500" />
              </div>
              <div className="flex justify-center items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-orange-600 rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-2 border-zinc-700 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-zinc-800 rounded-full"></div>
                </div>
              </div>

              {/* Locked badges */}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex justify-center items-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-zinc-800 rounded-full flex items-center justify-center opacity-50">
                    <Trophy className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-zinc-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-zinc-900 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-zinc-800">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-500 mb-4 sm:mb-5 md:mb-6">Recent Activities</h3>
            <ActivityItem
              icon={<Target size={18} />}
              title="Solved one web exploitation challenge"
              timeAgo="2 hours ago"
            />
            <ActivityItem
              icon={<BookOpen size={18} />}
              title="Completed a learning path"
              timeAgo="18 hours ago"
            />
          </div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveProfile}
        initialData={{
          name: displayName,
          avatar: displayAvatar,
          college: displayCollege,
          email: email,
          emailVerified: emailVerified,
          discordConnected: discordConnected
        }}
      />
    </div>
  );
};

export default ProfilePage;