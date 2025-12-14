'use client';
import React, { useState } from 'react';
import { Calendar, Users, Search, User, MapPin, Clock, Send } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';


const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);

  const featuredEvent = {
    title: "ASIET CTF",
    date: "SAT 12 NOV 2025",
    time: "3:00 PM to 6:00 PM",
    location: "Adi Shankara Institute of Engineering and Technology",
    registered: "120+ Registered",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=450&fit=crop"
  };

  const upcomingEvents = [
    {
      id: 1,
      title: "ASIET CTF",
      category: "Cenit Labs",
      registered: "120+ Registered",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "ASIET CTF",
      category: "Cenit Labs",
      registered: "120+ Registered",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "ASIET CTF",
      category: "Cenit Labs",
      registered: "120+ Registered",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="flex h-screen bg-black text-white font-sans">
      <Sidebar />

      <main className="flex-1 ml-0 sm:ml-64 p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto h-screen bg-black">
        <div className="mb-4 sm:mb-6 ml-14 mt-1 md:mb-8">
          <Header/>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search Events"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a1a] text-gray-400 pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 rounded-lg border border-gray-800 focus:outline-none focus:border-orange-500 text-sm sm:text-base"
            />
          </div>
          <button className="bg-orange-500 text-black font-semibold px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base whitespace-nowrap">
            Your Competitions
          </button>
        </div>

        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6">
            {/* Poster Container */}
            <div className="w-full lg:flex-shrink-0 lg:w-[400px] xl:w-[500px]">
              <div className="relative bg-[#0a0a0a] rounded-xl sm:rounded-2xl overflow-hidden border border-gray-900 aspect-[4/3]">
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white text-black text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded z-10">
                  Featured
                </div>
                <img 
                  src={featuredEvent.image} 
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
            </div>
            
            {/* Details Container */}
            <div className="flex-1 bg-[#0a0a0a] rounded-xl sm:rounded-2xl border border-gray-900 p-4 sm:p-6 md:p-8 flex flex-col justify-center relative">
              <Send size={20} className="absolute top-4 sm:top-6 right-4 sm:right-6 text-gray-500" />
              
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6 pr-8">{featuredEvent.title}</h2>
              
              <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-7 md:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400">
                  <Calendar size={16} className="text-orange-500 flex-shrink-0" />
                  <span>{featuredEvent.date}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400">
                  <Clock size={16} className="text-orange-500 flex-shrink-0" />
                  <span>{featuredEvent.time}</span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400">
                  <MapPin size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="break-words">{featuredEvent.location}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-600 border-2 border-[#0a0a0a]"></div>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-500 border-2 border-[#0a0a0a]"></div>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-700 border-2 border-[#0a0a0a]"></div>
                  </div>
                  <span className="text-xs sm:text-sm text-orange-500 font-semibold ml-1">{featuredEvent.registered}</span>
                </div>
                <button className="w-full sm:w-auto bg-orange-500 text-black font-bold px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base">
                  Register Now
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-2 mt-3 sm:mt-4">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors ${
                  activeSlide === index ? 'bg-orange-500' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="relative bg-[#0a0a0a] rounded-lg sm:rounded-xl overflow-hidden border border-gray-900 group cursor-pointer hover:border-gray-800 transition-all"
            >
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Send size={18} />
              </div>
              
              <div className="h-36 sm:h-40 md:h-44 relative overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
              </div>
              
              <div className="p-4 sm:p-5 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent -mt-12 sm:-mt-14 md:-mt-16 relative z-10">
                <h3 className="text-lg sm:text-xl font-bold mb-1">{event.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">{event.category}</p>
                
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gray-600 border-2 border-[#0a0a0a]"></div>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gray-500 border-2 border-[#0a0a0a]"></div>
                    </div>
                    <span className="text-xs text-orange-500 font-semibold ml-1">{event.registered}</span>
                  </div>
                  <button className="bg-orange-500 text-black text-xs sm:text-sm font-bold px-3 sm:px-4 md:px-5 py-1.5 rounded hover:bg-orange-600 transition-colors whitespace-nowrap">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EventsPage;