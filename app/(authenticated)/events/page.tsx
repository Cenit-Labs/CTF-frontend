'use client';
import React, { useState } from 'react';
import { Calendar, Users, Search, User, MapPin, Clock, Send } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);

  const featuredEvent = {
    title: "ASIET CTF",
    date: "SAT, 16 NOV 2025",
    time: "3:00 PM to 8:00 PM",
    location: "Adi Shankara Institute of Engineering and Technology",
    registered: "120+ Registered",
    featured: true
  };

  const upcomingEvents = [
    {
      id: 1,
      title: "ASIET CTF",
      category: "Cenfi Labs",
      registered: "120+ Registered"
    },
    {
      id: 2,
      title: "ASIET CTF",
      category: "Cenfi Labs",
      registered: "120+ Registered"
    },
    {
      id: 3,
      title: "ASIET CTF",
      category: "Cenfi Labs",
      registered: "120+ Registered"
    }
  ];

  

  return (
    <div className="flex h-screen bg-black text-white font-sans">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Events</h1>
          <button className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center hover:bg-orange-600 transition-colors">
            <User size={20} className="text-black" />
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search Events"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a1a] text-white pl-12 pr-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-orange-500"
            />
          </div>
          <button className="bg-orange-500 text-black font-semibold px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors">
            Your Competitions
          </button>
        </div>

        <div className="mb-8">
          <div className="relative bg-gradient-to-br from-orange-700 via-orange-600 to-orange-500 rounded-2xl overflow-hidden">
            <div className="absolute top-4 left-4 bg-white text-black text-xs font-bold px-3 py-1 rounded">
              Featured
            </div>
            <div className="flex items-center">
              <div className="w-1/2 p-8">
                <div className="w-full h-64 bg-gradient-to-br from-orange-800/50 to-orange-600/30 rounded-xl flex items-center justify-center">
                  <div className="text-6xl">🎯</div>
                </div>
              </div>
              <div className="w-1/2 p-8 pr-12">
                <h2 className="text-3xl font-bold mb-4">{featuredEvent.title}</h2>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} />
                    <span>{featuredEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} />
                    <span>{featuredEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={16} />
                    <span>{featuredEvent.location}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span className="text-sm">{featuredEvent.registered}</span>
                  </div>
                  <button className="bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2">
                    Register Now
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-2 mt-4">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  activeSlide === index ? 'bg-orange-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="relative bg-gradient-to-br from-orange-900 via-orange-800 to-orange-700 rounded-xl overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Send size={20} />
              </div>
              <div className="h-40 flex items-center justify-center text-4xl">
                🎯
              </div>
              <div className="p-4 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                <p className="text-sm text-gray-300 mb-3">{event.category}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <Users size={14} />
                    <span>{event.registered}</span>
                  </div>
                  <button className="bg-orange-500 text-black text-sm font-semibold px-4 py-1 rounded hover:bg-orange-600 transition-colors">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;