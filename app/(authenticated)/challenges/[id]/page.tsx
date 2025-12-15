import { X, Trophy, Clock, User } from 'lucide-react';

interface Challenge {
  title: string;
  category: string;
  difficulty: string;
  xp: number;
  status: string;
}

interface ChallengePopupProps {
  challenge: Challenge | null;
  onClose: () => void;
}

const ChallengePopup = ({ challenge, onClose }: ChallengePopupProps) => {
  if (!challenge) return null;

  const getDifficultyColor = (difficulty: string): string => {
    if (difficulty === "Easy") return "bg-green-600";
    if (difficulty === "Medium") return "bg-orange-600";
    if (difficulty === "Hard") return "bg-red-700";
    return "bg-gray-600";
  };

  const getButtonStyle = (status: string): string => {
    if (status === "completed") {
      return "bg-green-600 text-white hover:bg-green-700";
    }
    return "bg-orange-500 text-black hover:bg-orange-600";
  };

  const getButtonText = (status: string): string => {
    if (status === "completed") return "Completed";
    return "Start Challenge";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-800">
          <div className="flex-1 pr-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {challenge.title}
            </h2>
            <p className="text-gray-400 text-sm md:text-base">{challenge.category}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Challenge Stats */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
              <Trophy size={18} className="text-orange-500" />
              <span className="text-white font-semibold">{challenge.xp} XP</span>
            </div>
            <div className={`${getDifficultyColor(challenge.difficulty)} px-4 py-2 rounded-lg`}>
              <span className="text-white font-semibold">{challenge.difficulty}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
              <Clock size={18} className="text-blue-500" />
              <span className="text-white font-semibold">30 mins</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
              <User size={18} className="text-purple-500" />
              <span className="text-white font-semibold">127 solves</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">Description</h3>
            <p className="text-gray-300 leading-relaxed">
              This is a {challenge.difficulty.toLowerCase()} level challenge focusing on {challenge.category}. 
              In this flag, the paths are examined and sometimes metadata, you'll be required to analyze the issue 
              and exploit the vulnerability to capture the flag.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">Resources</h3>
            <div className="space-y-2">
              <a 
                href="#" 
                className="block text-orange-500 hover:text-orange-400 transition-colors"
              >
                → Hint #1
              </a>
              <a 
                href="#" 
                className="block text-orange-500 hover:text-orange-400 transition-colors"
              >
                → Documentation
              </a>
            </div>
          </div>

          {/* Flag Submission */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">Submit Flag</h3>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter flag..."
                className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-semibold">
                Submit
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button 
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${getButtonStyle(challenge.status)}`}
            >
              {getButtonText(challenge.status)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengePopup;