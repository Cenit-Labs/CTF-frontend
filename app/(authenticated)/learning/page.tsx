import React from 'react';
import { User, LayoutGrid, BookOpen, Target, Calendar, Users } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default function LearningPlatform() {
  const courses = [
    {
      title: 'Web Exploitation',
      progress: 12,
      modules: 12,
      hours: 15,
      buttonText: 'Continue Learning',
      buttonStyle: 'border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white'
    },
    {
      title: 'Cryptography',
      progress: 0,
      modules: 12,
      hours: 15,
      buttonText: 'Start Learning',
      buttonStyle: 'bg-gray-300 text-black hover:bg-gray-400'
    },
    {
      title: 'Reverse Engineering',
      progress: 100,
      modules: 12,
      hours: 15,
      buttonText: 'Download Certificate',
      buttonStyle: 'bg-orange-500 text-white hover:bg-orange-600'
    },
    {
      title: 'Forensics',
      progress: 0,
      modules: 12,
      hours: 15,
      buttonText: 'Start Learning',
      buttonStyle: 'bg-gray-300 text-black hover:bg-gray-400'
    },
    {
      title: 'Binary Exploitation',
      progress: 0,
      modules: 12,
      hours: 15,
      buttonText: 'Start Learning',
      buttonStyle: 'bg-gray-300 text-black hover:bg-gray-400'
    },
    {
      title: 'OSINT',
      progress: 0,
      modules: 12,
      hours: 15,
      buttonText: 'Start Learning',
      buttonStyle: 'bg-gray-300 text-black hover:bg-gray-400'
    },
    {
      title: 'Misc',
      progress: 0,
      modules: 12,
      hours: 15,
      buttonText: 'Start Learning',
      buttonStyle: 'bg-gray-300 text-black hover:bg-gray-400'
    },
    {
      title: 'Cloud Security',
      progress: 0,
      modules: 12,
      hours: 15,
      buttonText: 'Start Learning',
      buttonStyle: 'bg-gray-300 text-black hover:bg-gray-400'
    },
    {
      title: 'AI / ML Exploitation',
      progress: 0,
      modules: 12,
      hours: 15,
      buttonText: 'Start Learning',
      buttonStyle: 'bg-gray-300 text-black hover:bg-gray-400'
    },
	{
      title: 'AI / ML Exploitation',
      progress: 0,
      modules: 12,
      hours: 15,
      buttonText: 'Start Learning',
      buttonStyle: 'bg-gray-300 text-black hover:bg-gray-400'
    },
	{
      title: 'Cloud Security',
      progress: 0,
      modules: 12,
      hours: 15,
      buttonText: 'Start Learning',
      buttonStyle: 'bg-gray-300 text-black hover:bg-gray-400'
    },
	{
      title: 'Cloud Security',
      progress: 0,
      modules: 12,
      hours: 15,
      buttonText: 'Start Learning',
      buttonStyle: 'bg-gray-300 text-black hover:bg-gray-400'
    }
	
  ];

  return (
    <div className="max-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <main className="flex-1 ml-0 sm:ml-64 overflow-hidden p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="relative">
          <div className="mb-4 sm:mb-6 md:mb-8">
            <Header/>
          </div>

          {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {courses.map((course, index) => (
            <div 
              key={index}
              className="bg-[#0f0f0f] border border-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 flex flex-col"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">{course.title}</h3>
              
              <div className="mb-3 sm:mb-4">
                <div className="w-full bg-gray-800 h-1.5 sm:h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="text-right text-xs sm:text-sm text-gray-400 mt-1">{course.progress}%</div>
              </div>

              <button 
                className={`w-full py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${course.buttonStyle}`}
              >
                {course.buttonText}
              </button>
            </div>
          ))}
        </div>
          {/* Blur overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
          <span className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold uppercase tracking-wider pointer-events-auto px-4 text-center">
            Coming Soon
          </span>
        </div>
        </div>
      </main>
    </div>
  );
}