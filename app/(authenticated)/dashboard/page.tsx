'use client';
import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';

const Dashboard = () => {
  const [userData] = useState({
    name: "Mathew",
    globalRank: 1265,
    totalPoints: 1000,
    totalBadges: 18,
    streak: 8
  });

  const [dailyChallenge] = useState({
    title: "Web Exploitation",
    reward: 100,
    difficulty: "Easy",
    icon: "🔶"
  });

  const [currentCourse] = useState({
    title: "Introduction to Cryptography",
    progress: 98,
    type: "Learning Path"
  });

  return (
    <div className="flex h-screen bg-black text-white font-sans">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome Back, {userData.name}</h1>
          <button className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center hover:bg-orange-600 transition-colors">
            <Settings size={20} className="text-black" />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0f0f0f] p-5 rounded-xl border border-gray-800">
            <div className="text-gray-400 text-sm mb-1">Global Rank</div>
            <div className="text-2xl font-bold">#{userData.globalRank}</div>
          </div>
          <div className="bg-[#0f0f0f] p-5 rounded-xl border border-gray-800">
            <div className="text-gray-400 text-sm mb-1">Total Points</div>
            <div className="text-2xl font-bold">{userData.totalPoints}xp</div>
          </div>
          <div className="bg-[#0f0f0f] p-5 rounded-xl border border-gray-800">
            <div className="text-gray-400 text-sm mb-1">Total Badges</div>
            <div className="text-2xl font-bold">{userData.totalBadges}</div>
          </div>
          <div className="bg-[#0f0f0f] p-5 rounded-xl border border-gray-800">
            <div className="text-gray-400 text-sm mb-1">Streak</div>
            <div className="text-2xl font-bold">{userData.streak} Days</div>
          </div>
        </div>

        {/* Daily Challenge Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Daily Challenge</h2>
          <div className="bg-[#0f0f0f] p-6 rounded-xl border border-gray-800 flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-orange-400 rounded-xl flex items-center justify-center text-4xl">
              {dailyChallenge.icon}
            </div>
            <div className="flex-1">
              <div className="text-lg font-semibold mb-1">
                Today's Challenge: {dailyChallenge.title}
              </div>
              <div className="text-gray-400 text-sm">
                Reward: {dailyChallenge.reward}xp
              </div>
            </div>
            <button className="bg-orange-500 text-black font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Start Challenge
            </button>
            <div className="text-sm">
              Difficulty: <span className="text-green-400">{dailyChallenge.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Continue Learning Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Pick up where you left off</h2>
          <div className="bg-[#0f0f0f] p-6 rounded-xl border border-gray-800 flex items-center justify-between">
            <div>
              <div className="text-xl font-semibold mb-1">{currentCourse.title}</div>
              <div className="text-gray-400 text-sm">{currentCourse.type}</div>
              <button className="mt-4 bg-orange-500 text-black font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                Continue Learning
              </button>
            </div>
            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#2a2a2a"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#f97316"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - currentCourse.progress / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{currentCourse.progress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;