'use client';
import { useState } from 'react';
import { User, Menu, Target, BookOpen, Calendar, Users, ChevronDown } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import ChallengePopup from '@/components/challengepopup';

const ChallengesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showDifficultyDropdown, setShowDifficultyDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);

  const allChallenges = [
    { id: 1, title: "SQL Injection", category: "Web Exploitation", difficulty: "Easy", xp: 100, status: "not-started" },
    { id: 2, title: "SQL Injection", category: "Web Exploitation", difficulty: "Medium", xp: 100, status: "completed" },
    { id: 3, title: "SQL Injection", category: "Web Exploitation", difficulty: "Hard", xp: 100, status: "not-started" },
    { id: 4, title: "XSS Attack", category: "Web Exploitation", difficulty: "Easy", xp: 100, status: "not-started" },
    { id: 5, title: "Buffer Overflow", category: "Binary Exploitation", difficulty: "Hard", xp: 150, status: "not-started" },
    { id: 6, title: "SQL Injection", category: "Web Exploitation", difficulty: "Medium", xp: 100, status: "completed" },
    { id: 7, title: "Caesar Cipher", category: "Cryptography", difficulty: "Easy", xp: 50, status: "completed" },
    { id: 8, title: "RSA Encryption", category: "Cryptography", difficulty: "Hard", xp: 200, status: "not-started" },
    { id: 9, title: "SQL Injection", category: "Web Exploitation", difficulty: "Easy", xp: 100, status: "not-started" },
    { id: 10, title: "Reverse Shell", category: "Binary Exploitation", difficulty: "Medium", xp: 150, status: "not-started" },
    { id: 11, title: "JWT Token", category: "Web Exploitation", difficulty: "Medium", xp: 120, status: "completed" },
    { id: 12, title: "Memory Forensics", category: "Forensics", difficulty: "Hard", xp: 180, status: "not-started" },
    { id: 13, title: "Path Traversal", category: "Web Exploitation", difficulty: "Easy", xp: 80, status: "not-started" },
    { id: 14, title: "File Upload", category: "Web Exploitation", difficulty: "Medium", xp: 100, status: "not-started" },
    { id: 15, title: "SQL Injection", category: "Web Exploitation", difficulty: "Easy", xp: 100, status: "not-started" },
  ];

  const challengesPerPage = 6;

  // Filter challenges
  const filteredChallenges = allChallenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || challenge.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'All' || challenge.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || challenge.status === selectedStatus;
    
    return matchesSearch && matchesDifficulty && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredChallenges.length / challengesPerPage);
  const startIndex = (currentPage - 1) * challengesPerPage;
  const currentChallenges = filteredChallenges.slice(startIndex, startIndex + challengesPerPage);

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "Easy") return "bg-green-600";
    if (difficulty === "Medium") return "bg-orange-600";
    if (difficulty === "Hard") return "bg-red-700";
    return "bg-gray-600";
  };

  const getButtonStyle = (status: string) => {
    if (status === "completed") {
      return "bg-green-600 text-white hover:bg-green-700";
    }
    return "border border-gray-600 text-white bg-transparent hover:bg-gray-800";
  };

  const getButtonText = (status: string) => {
    if (status === "completed") return "Completed";
    return "Start";
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-bold transition-all text-sm sm:text-base ${
              currentPage === i ? 'bg-orange-500 text-black' : 'text-gray-500 hover:text-white'
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      pages.push(
        <button
          key={1}
          onClick={() => goToPage(1)}
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-bold transition-all text-sm sm:text-base ${
            currentPage === 1 ? 'bg-orange-500 text-black' : 'text-gray-500 hover:text-white'
          }`}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        pages.push(<span key="dots1" className="text-gray-500 px-1 sm:px-2">..</span>);
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-bold transition-all text-sm sm:text-base ${
              currentPage === i ? 'bg-orange-500 text-black' : 'text-gray-500 hover:text-white'
            }`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(<span key="dots2" className="text-gray-500 px-1 sm:px-2">..</span>);
      }

      pages.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-bold transition-all text-sm sm:text-base ${
            currentPage === totalPages ? 'bg-orange-500 text-black' : 'text-gray-500 hover:text-white'
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-0 sm:ml-64 flex flex-col overflow-hidden">
        {/* Header Section */}
        <div className="border-b border-gray-800 p-3 sm:p-4 md:p-6 lg:p-8 flex-shrink-0">
          <div className="mb-3 sm:mb-4 ml-14 mt-1 md:mb-6">
            <Header/>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search Challenges"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 text-gray-300 rounded-lg px-10 sm:px-12 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <svg className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
            
            {/* Difficulty Filter */}
            <div className="relative flex-1 sm:flex-initial">
              <button 
                onClick={() => {
                  setShowDifficultyDropdown(!showDifficultyDropdown);
                  setShowCategoryDropdown(false);
                  setShowStatusDropdown(false);
                }}
                className="w-full sm:w-auto bg-gray-800 text-gray-300 px-4 sm:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg hover:bg-gray-700 flex items-center justify-between gap-2 sm:min-w-[140px] text-sm sm:text-base"
              >
                {selectedDifficulty}
                <ChevronDown size={16} />
              </button>
              {showDifficultyDropdown && (
                <div className="absolute top-full mt-2 bg-gray-800 rounded-lg shadow-lg z-10 w-full sm:min-w-[140px] border border-gray-700">
                  {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
                    <button
                      key={diff}
                      onClick={() => {
                        setSelectedDifficulty(diff);
                        setShowDifficultyDropdown(false);
                        setCurrentPage(1);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm sm:text-base text-gray-300 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative flex-1 sm:flex-initial">
              <button 
                onClick={() => {
                  setShowCategoryDropdown(!showCategoryDropdown);
                  setShowDifficultyDropdown(false);
                  setShowStatusDropdown(false);
                }}
                className="w-full sm:w-auto bg-gray-800 text-gray-300 px-4 sm:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg hover:bg-gray-700 flex items-center justify-between gap-2 sm:min-w-[180px] text-sm sm:text-base"
              >
                <span className="truncate">{selectedCategory}</span>
                <ChevronDown size={16} className="flex-shrink-0" />
              </button>
              {showCategoryDropdown && (
                <div className="absolute top-full mt-2 bg-gray-800 rounded-lg shadow-lg z-10 w-full sm:min-w-[180px] border border-gray-700">
                  {['All', 'Web Exploitation', 'Binary Exploitation', 'Cryptography', 'Forensics'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowCategoryDropdown(false);
                        setCurrentPage(1);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm sm:text-base text-gray-300 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Status Filter */}
            <div className="relative flex-1 sm:flex-initial">
              <button 
                onClick={() => {
                  setShowStatusDropdown(!showStatusDropdown);
                  setShowDifficultyDropdown(false);
                  setShowCategoryDropdown(false);
                }}
                className="w-full sm:w-auto bg-gray-800 text-gray-300 px-4 sm:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg hover:bg-gray-700 flex items-center justify-between gap-2 sm:min-w-[140px] text-sm sm:text-base"
              >
                {selectedStatus === 'not-started' ? 'Not Started' : selectedStatus === 'completed' ? 'Completed' : 'All'}
                <ChevronDown size={16} />
              </button>
              {showStatusDropdown && (
                <div className="absolute top-full mt-2 bg-gray-800 rounded-lg shadow-lg z-10 w-full sm:min-w-[140px] border border-gray-700">
                  {[
                    { value: 'All', label: 'All' },
                    { value: 'not-started', label: 'Not Started' },
                    { value: 'completed', label: 'Completed' }
                  ].map(status => (
                    <button
                      key={status.value}
                      onClick={() => {
                        setSelectedStatus(status.value);
                        setShowStatusDropdown(false);
                        setCurrentPage(1);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm sm:text-base text-gray-300 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-4 sm:mb-6 md:mb-8 flex-1 overflow-y-auto">
            {currentChallenges.map((challenge) => (
              <div 
                key={challenge.id}
                className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 sm:p-5 md:p-6 relative flex flex-col"
              >
                {/* Status Icon */}
                <div className="absolute top-4 sm:top-5 md:top-6 right-4 sm:right-5 md:right-6">
                  {challenge.status === "completed" ? (
                    <div className="bg-green-600 rounded-full p-1">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth={2} strokeDasharray="4 4" />
                    </svg>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 pr-8 sm:pr-10">{challenge.title}</h3>
                <p className="text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base">{challenge.category}</p>
                
                <div className="flex items-center justify-between mb-3 sm:mb-4 mt-auto">
                  <span className={`${getDifficultyColor(challenge.difficulty)} text-white text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded`}>
                    {challenge.difficulty}
                  </span>
                  <span className="text-gray-400 font-bold text-sm sm:text-base">{challenge.xp}XP</span>
                </div>

                <button 
                  onClick={() => setSelectedChallenge(challenge)}
                  className={`w-full py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${getButtonStyle(challenge.status)}`}
                >
                  {getButtonText(challenge.status)}
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 mt-auto pb-2 sm:pb-4">
            <button 
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-gray-500 hover:text-white p-1 sm:p-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {renderPageNumbers()}
            
            <button 
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-gray-500 hover:text-white p-1 sm:p-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Challenge Popup */}
      {selectedChallenge && (
        <ChallengePopup 
          challenge={selectedChallenge} 
          onClose={() => setSelectedChallenge(null)} 
        />
      )}
    </div>
  );
};

export default ChallengesPage;