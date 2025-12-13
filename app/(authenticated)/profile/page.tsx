import React from 'react';
import { Target, BookOpen, Trophy, Calendar, Users } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';

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
  <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
    <p className="text-zinc-400 text-sm mb-2">{title}</p>
    <p className="text-white text-3xl font-bold">{value}</p>
  </div>
);

const ActivityItem: React.FC<ActivityProps> = ({ icon, title, timeAgo }) => (
  <div className="flex items-start gap-3 mb-4 last:mb-0">
    <div className="text-orange-500 mt-1">{icon}</div>
    <div className="flex-1">
      <p className="text-white text-sm">{title}</p>
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

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
        <Sidebar/>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-64 overflow-y-auto ">
        <h1 className="text-4xl font-bold mb-6">Profile</h1>
        
        {/* Profile Header */}
        <div className="relative mb-8">
          {/* Banner with waves */}
          <div className="relative h-44 bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 rounded-t-2xl overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="waves" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                  <path d="M0,100 Q50,80 100,100 T200,100" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="60"/>
                  <path d="M0,120 Q50,100 100,120 T200,120" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="60"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#waves)"/>
            </svg>
          </div>
          
          {/* Profile Info */}
          <div className="flex items-end justify-between -mx-8 px-8 -mt-16 relative z-10">
            <div className="flex items-end gap-6">
              <img 
                src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=200&h=200&fit=crop" 
                alt="Profile" 
                className="w-32 h-32 rounded-full border-4 border-black object-cover"
              />
              <div className="mb-2">
                <h2 className="text-3xl font-bold">Mathew Joseph T A</h2>
                <p className="text-zinc-400">@mathewjosephta</p>
                <p className="text-zinc-500 text-sm mt-1">🗓️ Joined Dec 2025</p>
              </div>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-black font-semibold py-3 px-8 rounded-lg transition mb-2">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Contributions Section */}
        <div className="bg-zinc-900 rounded-2xl p-6 mb-8 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold">Contributions</h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-zinc-400">Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-3 h-3 ${getContributionColor(i)} rounded-sm`}></div>
                ))}
              </div>
              <span className="text-zinc-400">More</span>
            </div>
          </div>
          <div className="grid grid-cols-20 gap-1">
            {contributions.map((intensity, idx) => (
              <div 
                key={idx} 
                className={`w-4 h-4 ${getContributionColor(intensity)} rounded-sm`}
                title={`${intensity} contributions`}
              ></div>
            ))}
          </div>
        </div>

        {/* Stats, Badges, and Recent Activities */}
        <div className="grid grid-cols-3 gap-6">
          {/* Stats */}
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <h3 className="text-2xl font-bold text-orange-500 mb-6">Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <StatCard title="Global Rank" value="#1255" />
              <StatCard title="Total Points" value="1000xp" />
              <StatCard title="Largest Streak" value="8 Days" />
              <StatCard title="Total Badges" value="2" />
            </div>
          </div>

          {/* Badges */}
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <h3 className="text-2xl font-bold text-orange-500 mb-6">Badges</h3>
            <div className="grid grid-cols-3 gap-4">
              {/* Earned badges */}
              <div className="flex justify-center">
                <Trophy className="w-16 h-16 text-orange-500" />
              </div>
              <div className="flex justify-center items-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-orange-600 rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="w-16 h-16 border-2 border-zinc-700 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-zinc-800 rounded-full"></div>
                </div>
              </div>
              
              {/* Locked badges */}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex justify-center items-center">
                  <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center opacity-50">
                    <Trophy className="w-8 h-8 text-zinc-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <h3 className="text-2xl font-bold text-orange-500 mb-6">Recent Activities</h3>
            <ActivityItem 
              icon={<Target size={20} />}
              title="Solved one web exploitation challenge"
              timeAgo="2 hours ago"
            />
            <ActivityItem 
              icon={<BookOpen size={20} />}
              title="Completed a learning path"
              timeAgo="18 hours ago"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;