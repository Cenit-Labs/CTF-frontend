"use client";

import React, { useEffect, useRef, useState } from 'react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProfileData) => void;
  initialData: {
    name: string;
    avatar: string | null;
    college: string | null;
    email: string;
    emailVerified: boolean;
    discordConnected: boolean;
  };
}

export interface ProfileData {
  name: string;
  avatar: string | null;
  college: string | null;
}

type ModalView = 'profile' | 'security';

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [modalView, setModalView] = useState<ModalView>('profile');
  const [formName, setFormName] = useState(initialData.name);
  const [formCollege, setFormCollege] = useState<string | null>(initialData.college);
  const [formAvatarPreview, setFormAvatarPreview] = useState<string | null>(initialData.avatar);
  const [emailVerified, setEmailVerified] = useState(initialData.emailVerified);
  const [discordConnected, setDiscordConnected] = useState(initialData.discordConnected);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  // Password modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const colleges = [
    'Select college',
    'Ravish Tech Univ',
    'Adi shankara',
  ];

  useEffect(() => {
    if (isOpen) {
      setFormName(initialData.name);
      setFormCollege(initialData.college);
      setFormAvatarPreview(initialData.avatar);
      setEmailVerified(initialData.emailVerified);
      setDiscordConnected(initialData.discordConnected);
      setModalView('profile');
    }
  }, [isOpen, initialData]);

  const handleFileClick = () => fileInputRef.current?.click();

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormAvatarPreview(url);
    }
  };

  const handleSave = () => {
    onSave({
      name: formName,
      avatar: formAvatarPreview,
      college: formCollege,
    });
  };

  const handleCancel = () => {
    if (formAvatarPreview && formAvatarPreview !== initialData.avatar) {
      try {
        URL.revokeObjectURL(formAvatarPreview);
      } catch (e) {}
    }
    onClose();
  };

  const handleVerifyEmail = () => {
    console.log('Sending verification email to:', initialData.email);
    alert('Verification email sent! Check your inbox.');
    // Simulate verification (replace with actual API call)
    // setEmailVerified(true);
  };

  const handleConnectDiscord = () => {
    console.log('Connecting to Discord...');
    // Simulate Discord OAuth (replace with actual OAuth flow)
    setTimeout(() => {
      setDiscordConnected(true);
      alert('Discord connected successfully!');
    }, 1000);
  };

  const handleDisconnectDiscord = () => {
    console.log('Disconnecting Discord...');
    setDiscordConnected(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Edit Profile Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60" onClick={handleCancel} />

        <div className="relative bg-zinc-900 rounded-2xl p-6 w-[min(720px,92%)] border border-zinc-800 z-10">
          <h3 className="text-2xl font-bold mb-4">
            {modalView === 'profile' ? 'Edit Profile' : 'Security Settings'}
          </h3>

          {modalView === 'profile' ? (
            <>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Avatar</label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border border-zinc-800 bg-zinc-800">
                      <img
                        src={formAvatarPreview ?? ''}
                        alt="Avatar preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={handleFileClick}
                        className="bg-zinc-800 text-white px-3 py-2 rounded"
                      >
                        Upload
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <p className="text-zinc-500 text-sm">PNG, JPG up to 2MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Name</label>
                  <input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-black/20 border border-zinc-800 rounded px-3 py-2 text-white"
                  />

                  <label className="block text-sm text-zinc-400 mb-2 mt-4">College</label>
                  <select
                    value={formCollege ?? 'Select college'}
                    onChange={(e) =>
                      setFormCollege(e.target.value === 'Select college' ? null : e.target.value)
                    }
                    className="w-full bg-black/20 border border-zinc-800 rounded px-3 py-2 text-white"
                  >
                    {colleges.map((c) => (
                      <option key={c} value={c} className="text-black">
                        {c}
                      </option>
                    ))}
                  </select>

                  <label className="block text-sm text-zinc-400 mb-2 mt-4">Email</label>
                  <div className="flex items-center gap-2">
                    <input
                      value={initialData.email}
                      disabled
                      className="flex-1 bg-black/20 border border-zinc-800 rounded px-3 py-2 text-zinc-500"
                    />
                    {emailVerified ? (
                      <span className="px-3 py-2 rounded bg-green-500/20 text-green-400 text-sm border border-green-500/30">
                        Verified
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleVerifyEmail}
                        className="px-3 py-2 rounded bg-orange-500 text-black font-semibold text-sm"
                      >
                        Verify
                      </button>
                    )}
                  </div>

                  <label className="block text-sm text-zinc-400 mb-2 mt-4">Discord Account</label>
                  {discordConnected ? (
                    <div className="flex items-center justify-between bg-black/20 border border-zinc-800 rounded px-3 py-2">
                      <span className="text-sm text-zinc-300">Connected</span>
                      <button
                        type="button"
                        onClick={handleDisconnectDiscord}
                        className="text-sm text-red-400 underline"
                      >
                        Disconnect
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleConnectDiscord}
                      className="w-full flex items-center justify-center gap-2 bg-[#5865F2] text-white px-3 py-2 rounded font-semibold"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                      Connect Discord
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            // Security view
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-400">Account password</p>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(true)}
                  className="px-3 py-1 rounded bg-orange-500 text-black font-semibold cursor-pointer"
                >
                  Change password
                </button>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-400">Active Sessions</p>
                <p className="text-sm text-zinc-300">1</p>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-6">
            <div>
              {modalView === 'profile' ? (
                <button
                  type="button"
                  onClick={() => setModalView('security')}
                  className="text-sm text-orange-500 underline cursor-pointer"
                >
                  Security Settings
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setModalView('profile')}
                  className="text-sm text-zinc-400 underline cursor-pointer"
                >
                  Back to Edit
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded bg-transparent border border-zinc-700 text-zinc-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-orange-500 text-black font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Password Setup Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowPasswordModal(false)}
          />

          <div className="relative bg-zinc-900 rounded-2xl p-6 w-[min(480px,92%)] border border-zinc-800 z-10">
            <h3 className="text-2xl font-bold mb-2">Setup Password</h3>
            <p className="text-zinc-400 text-sm mb-4">
              You can change your account password here. Choose a strong password and click Reset
              Password to apply.
            </p>

            <label className="block text-sm text-zinc-400 mb-2">New password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-black/20 border border-zinc-800 rounded px-3 py-2 text-white"
              placeholder="Enter new password"
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 rounded bg-transparent border border-zinc-700 text-zinc-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!newPassword) {
                    alert('Please enter a new password');
                    return;
                  }
                  console.log('Resetting password to:', newPassword);
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
    </>
  );
};

export default EditProfileModal;