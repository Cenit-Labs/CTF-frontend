'use client';
import React, { useState } from 'react';
import { User } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

const ChallengesPage = () => {
  const [challenges] = useState([
    {
      id: 1,
      title: "Web Exploitation",
      progress: 12,
      status: "in-progress"
    },
    {
      id: 2,
      title: "Cryptography",
      progress: 0,
      status: "not-started"
    },
    {
      id: 3,
      title: "Reverse Engineering",
      progress: 100,
      status: "completed"
    },
    {
      id: 4,
      title: "Forensics",
      progress: 0,
      status: "not-started"
    },
    {
      id: 5,
      title: "Binary Exploitation",
      progress: 0,
      status: "not-started"
    },
    {
      id: 6,
      title: "OSINT",
      progress: 0,
      status: "not-started"
    },
    {
      id: 7,
      title: "Misc",
      progress: 0,
      status: "not-started"
    },
    {
      id: 8,
      title: "Cloud Security",
      progress: 0,
      status: "not-started"
    },
    {
      id: 9,
      title: "AI / ML Exploitation",
      progress: 0,
      status: "not-started"
    }
  ]);

  const getButtonStyle = (status: string) => {
    if (status === "completed") {
      return "bg-orange-500 text-black hover:bg-orange-600";
    } else if (status === "in-progress") {
      return "border-2 border-orange-500 text-orange-500 bg-transparent hover:bg-orange-500/10";
    }
    return "bg-gray-300 text-black hover:bg-gray-400";
  };

  const getButtonText = (status: string) => {
    if (status === "completed") return "Challenge Completed";
    if (status === "in-progress") return "Continue Challenge";
    return "Start Challenge";
  };

  return (
    <div className="flex h-screen bg-black text-white font-sans">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-4 md:p-6 lg:p-8 overflow-y-auto h-screen bg-black">
        {/* Header */}
        <div className="mb-8">
          <Header/>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <div 
              key={challenge.id}
              className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6 flex flex-col"
            >
              <h3 className="text-xl font-bold mb-4">{challenge.title}</h3>
              
              <div className="mb-4">
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${challenge.progress}%` }}
                  />
                </div>
                <div className="text-right text-sm text-gray-400 mt-1">{challenge.progress}%</div>
              </div>

              <button 
                className={`w-full py-3 rounded-lg font-semibold transition-all ${getButtonStyle(challenge.status)}`}
              >
                {getButtonText(challenge.status)}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengesPage;