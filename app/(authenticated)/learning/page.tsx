import React from 'react';
import { User, LayoutGrid, BookOpen, Target, Calendar, Users } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';

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
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <main className="flex-1 ml-64 overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">Learning</h2>
          <button className="bg-orange-500 hover:bg-orange-600 w-12 h-12 rounded-full flex items-center justify-center transition-colors">
            <User size={24} />
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div key={index} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">{course.title}</h3>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="h-2 flex-1 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${course.progress === 100 ? 'bg-orange-500' : course.progress > 0 ? 'bg-orange-500' : 'bg-white'}`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="ml-3 text-sm">{course.progress}%</span>
                </div>
              </div>

              {/* Course Info */}
              <p className="text-gray-400 text-sm mb-4">
                {course.modules} Modules | {course.hours} Hours
              </p>

              {/* Button */}
              <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${course.buttonStyle}`}>
                {course.buttonText}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}