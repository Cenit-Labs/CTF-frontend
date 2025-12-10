'use client';
import React, { useState } from 'react';
import { User, CheckCircle, Lock, RefreshCw } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';

const Dashboard = () => {
  const [userData] = useState({
    name: "Mathew",
    globalRank: 1255,
    totalPoints: 1000,
    totalBadges: 18,
    streak: 8
  });

  const [dailyChallenges] = useState([
    { day: "YESTERDAY", title: "SQL Injection 101", difficulty: "100xp", status: "completed" },
    { day: "TODAY", title: "SQL Injection 101", difficulty: "300xp", status: "active" },
    { day: "TOMORROW", title: "SQL Injection 101", difficulty: "300xp", status: "locked" }
  ]);

  const [recommendedCourses] = useState([
    { title: "Simple Reversing", category: "Cryptography", difficulty: "Easy", points: "100xp" },
    { title: "Simple Reversing", category: "Cryptography", difficulty: "Easy", points: "100xp" },
    { title: "Simple Reversing", category: "Cryptography", difficulty: "Easy", points: "100xp" }
  ]);

  const [currentCourse] = useState({
    title: "Introduction to Cryptography",
    progress: 98,
    type: "Learning Path"
  });

  return (
    <div className="flex min-h-screen bg-black text-white font-sans">
      <Sidebar />
      <main className="flex-1 ml-64 p-4 md:p-6 lg:p-8 overflow-y-auto h-screen bg-black">
        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="text-orange-500 text-xl md:text-2xl font-bold">logo</div>
            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-500 flex items-center justify-center hover:bg-orange-600 transition-colors">
              <User size={20} className="text-black" />
            </button>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">Welcome Back, {userData.name}</h1>
          
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
            {/* Left Side - Stats Grid 2x2 */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 w-full lg:w-[45%] lg:flex-shrink-0">
              <div className="bg-[#1a1a1a] p-5 md:p-6 rounded-lg border border-gray-800">
                <div className="text-gray-400 text-sm mb-2">Global Rank</div>
                <div className="text-2xl md:text-3xl font-bold">#{userData.globalRank}</div>
              </div>
              <div className="bg-[#1a1a1a] p-5 md:p-6 rounded-lg border border-gray-800">
                <div className="text-gray-400 text-sm mb-2">Total Points</div>
                <div className="text-2xl md:text-3xl font-bold">{userData.totalPoints}xp</div>
              </div>
              <div className="bg-[#1a1a1a] p-5 md:p-6 rounded-lg border border-gray-800">
                <div className="text-gray-400 text-sm mb-2">Total Badges</div>
                <div className="text-2xl md:text-3xl font-bold">{userData.totalBadges}</div>
              </div>
              <div className="bg-[#1a1a1a] p-5 md:p-6 rounded-lg border border-gray-800">
                <div className="text-gray-400 text-sm mb-2">Streak</div>
                <div className="text-2xl md:text-3xl font-bold">{userData.streak} Days</div>
              </div>
            </div>

            {/* Right Side - Current Course Card */}
            <div className="bg-[#1a1a1a] p-5 md:p-6 rounded-lg flex-1 border border-gray-800">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="text-lg md:text-xl font-semibold mb-1">{currentCourse.title}</div>
                  <div className="text-gray-400 text-sm md:text-base">{currentCourse.type}</div>
                </div>
                <div className="relative w-24 h-24 md:w-32 md:h-32 ml-4">
                    <svg className="transform -rotate-90 w-24 h-24 md:w-32 md:h-32 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <circle
                      cx="48"
                      cy="48"
                      r="44"
                      stroke="#2a2a2a"
                      strokeWidth="6"
                      fill="none"
                      className="md:hidden"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="44"
                      stroke="#f97316"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 44}`}
                      strokeDashoffset={`${2 * Math.PI * 44 * (1 - currentCourse.progress / 100)}`}
                      strokeLinecap="round"
                      className="md:hidden"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#2a2a2a"
                      strokeWidth="8"
                      fill="none"
                      className="hidden md:block"
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
                      className="hidden md:block"
                    />
                    </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold">{currentCourse.progress}%</span>
                  </div>
                </div>
              </div>
              
              <button className=" bg-orange-500 text-black font-semibold px-4 py-2.5 md:py-3 rounded-lg hover:bg-orange-600 transition-colors text-sm md:text-base">
                Continue Learning
              </button>
            </div>
          </div>
        </div>

        {/* Daily Challenge Section */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Daily Challenge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {dailyChallenges.map((challenge, index) => (
              <div key={index} className="bg-[#1a1a1a] p-5 md:p-6 rounded-lg border border-gray-800">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <div className="text-xs md:text-sm text-gray-500 uppercase font-semibold tracking-wide">{challenge.day}</div>
                  {challenge.status === 'completed' && (
                    <CheckCircle className="text-green-500" size={22} />
                  )}
                  {challenge.status === 'active' && (
                    <RefreshCw className="text-white" size={22} />
                  )}
                  {challenge.status === 'locked' && (
                    <Lock className="text-gray-600" size={22} />
                  )}
                </div>
                <div className="text-base md:text-lg font-semibold mb-1 md:mb-2">{challenge.title}</div>
                <div className="text-sm md:text-base text-gray-400 mb-4 md:mb-5">{challenge.difficulty}</div>
                <button 
                  className={`w-full py-2.5 md:py-3 rounded-lg font-semibold text-sm md:text-base transition-all ${
                    challenge.status === 'completed' 
                      ? 'bg-green-600 text-white' 
                      : challenge.status === 'active'
                      ? 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-black'
                      : 'bg-transparent border-2 border-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={challenge.status === 'locked'}
                >
                  {challenge.status === 'completed' ? 'Completed' : challenge.status === 'active' ? 'Start' : 'Locked 🔒'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Section */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Recommended for you</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {recommendedCourses.map((course, index) => (
              <div key={index} className="bg-[#1a1a1a] p-5 md:p-6 rounded-lg border border-gray-800">
                <div className="inline-block px-3 py-1.5 bg-green-600 text-white text-xs md:text-sm font-semibold rounded mb-3 md:mb-4">
                  {course.difficulty}
                </div>
                <div className="text-base md:text-lg font-semibold mb-1 md:mb-2">{course.title}</div>
                <div className="text-sm md:text-base text-gray-400 mb-4 md:mb-5">{course.category}</div>
                <button className="w-full bg-orange-500 text-black font-semibold py-2.5 md:py-3 rounded-lg hover:bg-orange-600 transition-all text-sm md:text-base">
                  {course.points}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;