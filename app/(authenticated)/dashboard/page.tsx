'use client';
import React, { useState } from 'react';
import { User, CheckCircle, Lock, RefreshCw } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

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
      <main className="flex-1 ml-0 sm:ml-64 p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto h-screen bg-black">
        {/* Header Section */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <Header/>
        </div>
        <div className="mb-4 sm:mb-6 md:mb-8">          
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6">
            {/* Left Side - Stats Grid 2x2 */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 w-full lg:w-[45%] lg:flex-shrink-0">
              <div className="bg-[#1a1a1a] p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg border border-gray-800">
                <div className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">Global Rank</div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">#{userData.globalRank}</div>
              </div>
              <div className="bg-[#1a1a1a] p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg border border-gray-800">
                <div className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">Total Points</div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">{userData.totalPoints}xp</div>
              </div>
              <div className="bg-[#1a1a1a] p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg border border-gray-800">
                <div className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">Total Badges</div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">{userData.totalBadges}</div>
              </div>
              <div className="bg-[#1a1a1a] p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg border border-gray-800">
                <div className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">Streak</div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">{userData.streak} Days</div>
              </div>
            </div>

            {/* Right Side - Current Course Card */}
            <div className="bg-[#1a1a1a] p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg flex-1 border border-gray-800">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="text-base sm:text-lg md:text-xl font-semibold mb-1">{currentCourse.title}</div>
                  <div className="text-gray-400 text-xs sm:text-sm md:text-base">{currentCourse.type}</div>
                </div>
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 ml-4">
                    <svg className="transform -rotate-90 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    {/* Small screens */}
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="#2a2a2a"
                      strokeWidth="6"
                      fill="none"
                      className="sm:hidden"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="#f97316"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 36}`}
                      strokeDashoffset={`${2 * Math.PI * 36 * (1 - currentCourse.progress / 100)}`}
                      strokeLinecap="round"
                      className="sm:hidden"
                    />
                    {/* Medium screens */}
                    <circle
                      cx="48"
                      cy="48"
                      r="44"
                      stroke="#2a2a2a"
                      strokeWidth="6"
                      fill="none"
                      className="hidden sm:block md:hidden"
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
                      className="hidden sm:block md:hidden"
                    />
                    {/* Large screens */}
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
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold">{currentCourse.progress}%</span>
                  </div>
                </div>
              </div>
              
              <button className="bg-orange-500 text-black font-semibold px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg hover:bg-orange-600 transition-colors text-xs sm:text-sm md:text-base">
                Continue Learning
              </button>
            </div>
          </div>
        </div>

        {/* Daily Challenge Section */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6">Daily Challenge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            {dailyChallenges.map((challenge, index) => (
              <div key={index} className="bg-[#1a1a1a] p-4 sm:p-5 md:p-6 rounded-lg border border-gray-800">
                <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
                  <div className="text-xs md:text-sm text-gray-500 uppercase font-semibold tracking-wide">{challenge.day}</div>
                  {challenge.status === 'completed' && (
                    <CheckCircle className="text-green-500" size={20} />
                  )}
                  {challenge.status === 'active' && (
                    <RefreshCw className="text-white" size={20} />
                  )}
                  {challenge.status === 'locked' && (
                    <Lock className="text-gray-600" size={20} />
                  )}
                </div>
                <div className="text-sm sm:text-base md:text-lg font-semibold mb-1 md:mb-2">{challenge.title}</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400 mb-3 sm:mb-4 md:mb-5">{challenge.difficulty}</div>
                <button 
                  className={`w-full py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold text-xs sm:text-sm md:text-base transition-all ${
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
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6">Recommended for you</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            {recommendedCourses.map((course, index) => (
              <div key={index} className="bg-[#1a1a1a] p-4 sm:p-5 md:p-6 rounded-lg border border-gray-800">
                <div className="inline-block px-2 sm:px-3 py-1 sm:py-1.5 bg-green-600 text-white text-xs md:text-sm font-semibold rounded mb-2 sm:mb-3 md:mb-4">
                  {course.difficulty}
                </div>
                <div className="text-sm sm:text-base md:text-lg font-semibold mb-1 md:mb-2">{course.title}</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400 mb-3 sm:mb-4 md:mb-5">{course.category}</div>
                <button className="w-full bg-orange-500 text-black font-semibold py-2 sm:py-2.5 md:py-3 rounded-lg hover:bg-orange-600 transition-all text-xs sm:text-sm md:text-base">
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