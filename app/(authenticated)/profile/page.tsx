"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Target, BookOpen, Trophy } from 'lucide-react';
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

  // Profile state (editable)
  const [showModal, setShowModal] = useState(false);
  const [displayName, setDisplayName] = useState('Mathew Joseph T A');
  const [displayAvatar, setDisplayAvatar] = useState<string | null>('https://images.unsplash.com/photo-1574158622682-e40e69881006?w=200&h=200&fit=crop');
  const [displayCollege, setDisplayCollege] = useState<string | null>(null);

  // Form state inside modal
  const [formName, setFormName] = useState(displayName);
  const [formCollege, setFormCollege] = useState<string | null>(displayCollege);
  const [formAvatarPreview, setFormAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // Modal view: 'profile' for edit profile, 'security' for security settings
  const [modalView, setModalView] = useState<'profile' | 'security'>('profile');
  // Password modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    // Sync form defaults when opening modal
    if (showModal) {
      setFormName(displayName);
      setFormCollege(displayCollege);
      setFormAvatarPreview(displayAvatar);
      // reset modal view to profile when modal opens
      setModalView('profile');
    }
  }, [showModal]);

  const colleges = [
    'Select college',
    'Ravish Tech Univ',
    'Adi shankara',

  ];

  const handleFileClick = () => fileInputRef.current?.click();

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormAvatarPreview(url);
    }
  };

  const handleSave = () => {
    // For now, just update local display state and close modal
    setDisplayName(formName || displayName);
    setDisplayCollege(formCollege || displayCollege);
    setDisplayAvatar(formAvatarPreview || displayAvatar);
    setShowModal(false);
  };

  const handleCancel = () => {
    // Revoke created object URL when cancelling or closing to avoid leaks
    if (formAvatarPreview && formAvatarPreview !== displayAvatar) {
      try { URL.revokeObjectURL(formAvatarPreview); } catch (e) {}
    }
    setShowModal(false);
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
                src={displayAvatar ?? 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=200&h=200&fit=crop'}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-black object-cover"
              />
              <div className="mb-2">
                <h2 className="text-3xl font-bold">{displayName}</h2>
                <p className="text-zinc-400">@mathewjosephta</p>
                <p className="text-zinc-500 text-sm mt-1">{displayCollege ? `🏫 ${displayCollege}` : '🗓️ Joined Dec 2025'}</p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-black font-semibold py-3 px-8 rounded-lg transition mb-2"
            >
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={handleCancel} />

          <div className="relative bg-zinc-900 rounded-2xl p-6 w-[min(720px,92%)] border border-zinc-800 z-10">
            <h3 className="text-2xl font-bold mb-4">{modalView === 'profile' ? 'Edit Profile' : 'Security Settings'}</h3>

            {modalView === 'profile' ? (
              <>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Avatar</label>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-full overflow-hidden border border-zinc-800 bg-zinc-800">
                        <img src={formAvatarPreview ?? displayAvatar ?? ''} alt="Avatar preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <button type="button" onClick={handleFileClick} className="bg-zinc-800 text-white px-3 py-2 rounded">Upload</button>
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                        <p className="text-zinc-500 text-sm">PNG, JPG up to 2MB</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Name</label>
                    <input value={formName} onChange={(e) => setFormName(e.target.value)} className="w-full bg-black/20 border border-zinc-800 rounded px-3 py-2 text-white" />

                    <label className="block text-sm text-zinc-400 mb-2 mt-4">College</label>
                    <select value={formCollege ?? 'Select college'} onChange={(e) => setFormCollege(e.target.value === 'Select college' ? null : e.target.value)} className="w-full bg-black/20 border border-zinc-800 rounded px-3 py-2 text-white">
                      {colleges.map((c) => (
                        <option key={c} value={c} className="text-black">{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            ) : (
              // Security view
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-400">Account password</p>
                  <button type="button" onClick={() => setShowPasswordModal(true)} className="px-3 py-1 rounded bg-orange-500 text-black font-semibold cursor-pointer">Change password</button>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-400">Active Sessions</p>
                  <p className="text-sm text-zinc-300">1</p>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mt-6">
              {/* Left: Security Settings link (only show when in profile view) */}
              <div>
                {modalView === 'profile' ? (
                  <button type="button" onClick={() => setModalView('security')} className="text-sm text-orange-500 underline cursor-pointer">
                    Security Settings
                  </button>
                ) : (
                  <button type="button" onClick={() => setModalView('profile')} className="text-sm text-zinc-400 underline cursor-pointer">
                    Back to Edit
                  </button>
                )}
              </div>

              {/* Right: Cancel / Save */}
              <div className="flex gap-3">
                <button onClick={handleCancel} className="px-4 py-2 rounded bg-transparent border border-zinc-700 text-zinc-300">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 rounded bg-orange-500 text-black font-semibold">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Password setup modal (opened from Security Settings -> Change password) */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowPasswordModal(false)} />

          <div className="relative bg-zinc-900 rounded-2xl p-6 w-[min(480px,92%)] border border-zinc-800 z-10">
            <h3 className="text-2xl font-bold mb-2">Setup Password</h3>
            <p className="text-zinc-400 text-sm mb-4">You can change your account password here. Choose a strong password and click Reset Password to apply.</p>

            <label className="block text-sm text-zinc-400 mb-2">New password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-black/20 border border-zinc-800 rounded px-3 py-2 text-white"
              placeholder="Enter new password"
            />

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowPasswordModal(false)} className="px-4 py-2 rounded bg-transparent border border-zinc-700 text-zinc-300">Cancel</button>
              <button
                onClick={() => {
                  // UI-only action: perform basic validation and close modal
                  if (!newPassword) {
                    // minimal feedback — keep it simple for now
                    try { alert('Please enter a new password'); } catch (e) {}
                    return;
                  }
                  // In a real app, call API to reset password here
                  try { console.log('Resetting password to:', newPassword); } catch (e) {}
                  setNewPassword('');
                  setShowPasswordModal(false);
                }}
                className="px-4 py-2 rounded bg-orange-500 text-black font-semibold cursor-pointer"
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;