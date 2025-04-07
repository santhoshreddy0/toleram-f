import React from 'react';
import { Edit, Trophy, Star } from 'lucide-react';

const TeamDetails = ({teamData, handleEdit}) => {

  const calculatedTotalPoints = teamData.team.reduce((sum, player) => sum + player.points, 0);
  const totalPoints = calculatedTotalPoints || teamData.totalPoints;

  const captain = teamData.team.find(player => player.player_role === "captain");
  const viceCaptain = teamData.team.find(player => player.player_role === "vice-captain");
  const players = teamData.team.filter(player => player.player_role === "player");

  return (
    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 min-h-screen text-white">
      {/* Header with glassmorphism effect - Mobile optimized */}
      <div className="backdrop-blur-md bg-white/10 p-3 sticky top-0 border-b border-white/20 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 max-w-6xl mx-auto">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Trophy className="text-yellow-400" size={24} />
            <div>
              <h1 className="text-xl font-bold">My Dream11 Team</h1>
              <div className="flex items-center">
                <span className="text-gray-200 text-sm">Total Points:</span>
                <span className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold rounded-full px-3 py-0.5 ml-2">
                  {totalPoints}
                </span>
              </div>
            </div>
          </div>
          <button onClick={handleEdit} className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-2 px-4 rounded-full flex items-center shadow-lg transition-all duration-300 w-full sm:w-auto justify-center">
            <Edit size={16} className="mr-1" />
            Edit Team
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-3">

        <div className="mb-6 mt-4">
          <div className="flex flex-col gap-4">
            {captain && (
              <div className="relative bg-gradient-to-br from-red-600/40 to-red-900/40 backdrop-blur-sm rounded-xl overflow-hidden border border-red-500/50 shadow-2xl">
                <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 rounded-bl-lg font-bold flex items-center text-sm">
                  <Trophy size={14} className="mr-1 text-yellow-300" />
                  CAPTAIN
                </div>
                <div className="p-4 flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-red-500 shadow-lg flex-shrink-0">
                    <img 
                      src={captain.player_logo} 
                      alt={captain.player_name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/100/100";
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{captain.player_name}</h3>
                    <div className="mt-1 bg-red-800/50 rounded-full px-3 py-1 inline-block">
                      <span className="text-yellow-300 font-bold text-sm sm:text-base">{captain.points}</span>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            )}

            {/* Vice Captain Card - Mobile optimized */}
            {viceCaptain && (
              <div className="relative bg-gradient-to-br from-blue-600/40 to-blue-900/40 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/50 shadow-2xl">
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-bl-lg font-bold flex items-center text-sm">
                  <Star size={14} className="mr-1 text-yellow-300" />
                  VICE CAPTAIN
                </div>
                <div className="p-4 flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg flex-shrink-0">
                    <img 
                      src={viceCaptain.player_logo} 
                      alt={viceCaptain.player_name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/100/100";
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-start">
  <div className="flex-1">
    <h3 className="font-bold text-lg">{viceCaptain.player_name}</h3>
    <div className="mt-1 bg-blue-800/50 rounded-full px-3 py-1 inline-block">
      <span className="text-yellow-300 font-bold text-sm sm:text-base">{viceCaptain.points}</span>
    </div>
  </div>
</div>

                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 px-4 py-1 rounded-full inline-block">
              TEAM PLAYERS
            </span>
          </h2>

          <div className="relative bg-gradient-to-b from-green-800/30 to-green-600/30 rounded-xl px-2 py-6 backdrop-blur-sm border border-green-500/30">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-2 gap-y-6">
              {players.map(player => (
                <PlayerBubble key={player.player_id} player={player} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlayerBubble = ({ player }) => {
  return (
    <div className="flex flex-col items-center transform transition-transform hover:scale-105 group">
      <div className="relative">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border-2 border-white/50 shadow-lg group-hover:border-yellow-400 transition-all duration-300">
          <img 
            src={player.player_logo} 
            alt={player.player_name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "/api/placeholder/100/100";
            }}
          />
        </div>
        <div className="absolute -top-2 -right-2 bg-purple-600 text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold border border-white/50">
          {player.points}
        </div>
      </div>
      <h3 className="font-medium text-xs mt-1 text-center w-16">
        {player.player_name}
      </h3>
    </div>
  );
};

export default TeamDetails;