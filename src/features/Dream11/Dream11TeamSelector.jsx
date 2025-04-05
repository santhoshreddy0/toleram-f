import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Award, Check, AlertCircle, Search, Filter } from 'lucide-react';
import { useGetPlayersQuery } from '../../app/Services/playersApi';
import { toast } from 'react-toastify';

const Dream11TeamSelector = ({players, onSubmit}) => {
  // Use the provided player data
  const [allPlayers, setAllPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State management
  const [step, setStep] = useState(1);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [captain, setCaptain] = useState(null);
  const [viceCaptain, setViceCaptain] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [teamFilter, setTeamFilter] = useState('All');
  const {
    data: playerData,
    isLoading: playersLoading,
    isError,  
    error: errorMesssage, 
  } = useGetPlayersQuery();

  
  useEffect(() => {
    if (playersLoading) {
      setLoading(true);
    } else if (isError) {
      setError(errorMesssage);
      console.error(errorMesssage);
      setLoading(false);
    } else if (playerData && playerData.players) {
      setAllPlayers(playerData.players);
      if(players && players.length > 0) {
        const selectedPlayersData = playerData.players.filter(player => players.some(p => p.player_id === player.id));
        setSelectedPlayers(selectedPlayersData);}
      setLoading(false);
    } else {
      setLoading(false); 
    }
  }, [playersLoading, isError, playerData, error]);  
  

  // Constants
  const MAX_PLAYERS = 11;
  const roleLimits = {
    'batsman': { min: 0, max: 11 },
    'bowler': { min: 0, max:11 },
    'all-rounder': { min: 0, max:11 },
    'wicket-keeper': { min: 0, max: 11 }
  };

  // Helper functions
  const countByRole = (role) => selectedPlayers.filter(player => player.player_role === role).length;
  
  const isRoleFull = (role) => countByRole(role) >= roleLimits[role].max;
  
  const getFilteredPlayers = () => {
    return allPlayers.filter(player => {
      // Apply role filter
      const roleMatches = filter === 'All' || player.player_role === filter;
      
      // Apply team filter
      const teamMatches = teamFilter === 'All' || player.team_name === teamFilter;
      
      // Apply search filter
      const searchMatches = player.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      return roleMatches && teamMatches && searchMatches;
    });
  };
  
  const isPlayerSelected = (playerId) => selectedPlayers.some(player => player.id === playerId);
  
  const isTeamValid = () => {
    return Object.entries(roleLimits).every(([role, limits]) => {
      const count = countByRole(role);
      return count >= limits.min && count <= limits.max;
    }) && selectedPlayers.length === MAX_PLAYERS;
  };

  // Get unique team names for filtering
  const getUniqueTeams = () => {
    const teams = allPlayers.map(player => player.team_name);
    return ['All', ...new Set(teams)];
  };

  // Handle player selection/deselection
  const togglePlayerSelection = (player) => {
    if (isPlayerSelected(player.id)) {
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
    } else {
      if (selectedPlayers.length < MAX_PLAYERS && !isRoleFull(player.player_role)) {
        setSelectedPlayers([...selectedPlayers, player]);
      }
    }
  };

  // Handle captain/vice-captain selection
  const selectCaptain = (playerId) => {
    setCaptain(playerId);
    // If this player was vice-captain, clear that selection
    if (viceCaptain === playerId) {
      setViceCaptain(null);
    }
  };

  const selectViceCaptain = (playerId) => {
    setViceCaptain(playerId);
    // If this player was captain, clear that selection
    if (captain === playerId) {
      setCaptain(null);
    }
  };

  const goToNextStep = () => {
    if (step === 1 && isTeamValid()) {
      setStep(2);
    } else if (step === 2 && captain && viceCaptain) {
      setStep(3);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetSelection = () => {
    setSelectedPlayers([]);
    setCaptain(null);
    setViceCaptain(null);
    setStep(1);
  };

  const getRoleColorClass = (role) => {
    switch (role) {
      case 'batsman': return 'bg-red-600';
      case 'bowler': return 'bg-green-600';
      case 'all-rounder': return 'bg-yellow-600';
      case 'wicket-keeper': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const handleSubmit = async () => {

    if (isTeamValid() && captain && viceCaptain) {
        await onSubmit({
          team: selectedPlayers,
          captain,
          viceCaptain,
        });
     
    } else {
      console.error('Invalid team selection');
    }
  };       

  const SearchAndFilterBar = () => (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search players..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex gap-2">
          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {getUniqueTeams().map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  // Role filter buttons
  const RoleFilterButtons = () => (
    <div className="flex flex-wrap gap-2 mb-4 justify-evenly">
      {['All', 'batsman', 'bowler', 'all-rounder', 'wicket-keeper'].map(role => (
        <button
          key={role}
          onClick={() => setFilter(role)}
          className={`px-1 py-1 rounded-full text-sm font-medium ${
            filter === role 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {role}
        </button>
      ))}
    </div>
  );
  

  // Player selection screen
  const PlayerSelectionScreen = () => {
    if (loading) {
      return <div className="text-center py-8">Loading players...</div>;
    }
    
    if (error) {
      return <div className="text-center py-8 text-red-600">Error loading players: {error}</div>;
    }
    
    const filteredPlayers = getFilteredPlayers();
    
    return (
      <div className="flex flex-col h-full">
        <div className="flex-shrink-0">
          <div className="bg-gradient-to-r from-purple-800 to-indigo-800 p-2 rounded-lg mb-2">
            <h2 className="text-sm font-bold text-white mb-2">Select 11 Players</h2>
          </div>
          <SearchAndFilterBar />
          <RoleFilterButtons />
        </div>

        <div className="flex-grow overflow-y-auto h-96">
          {filteredPlayers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No players found matching your filters</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {filteredPlayers.map((player) => {
              const isSelected = isPlayerSelected(player.id);
              const roleColor = getRoleColorClass(player.player_role);
      
              return (
                <div
                  key={player.id}
                  onClick={() => togglePlayerSelection(player)}
                  className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                    isSelected ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center p-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <img
                        src={player.player_logo}
                        alt={player.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{player.name}</h3>
                        {isSelected && (
                          <Check className="w-5 h-5 text-purple-600" />
                        )}
                      </div>
                      <div className="flex items-center text-xs mt-1">
                        <span
                          className={`${roleColor} text-white px-2 py-0.5 rounded-full mr-2`}
                        >
                          {player.player_role}
                        </span>
                        <span className="text-gray-500">{player.team_name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      </div>
    );
  };

  // Captain selection screen
  const CaptainSelectionScreen = () => (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0">
        <div className="bg-gradient-to-r from-purple-800 to-indigo-800 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-bold text-white mb-2">Choose Captain & Vice Captain</h2>
          <p className="text-white text-sm mb-2">
            Captain gets 2x points & Vice Captain gets 1.5x points
          </p>
          <div className="bg-white bg-opacity-20 p-2 rounded-lg">
            <div className="flex justify-between text-xs text-white">
              <span>Captain: {captain ? selectedPlayers.find(p => p.id === captain)?.name : 'Not Selected'}</span>
              <span>Vice Captain: {viceCaptain ? selectedPlayers.find(p => p.id === viceCaptain)?.name : 'Not Selected'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto h-96">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {selectedPlayers.map(player => {
            const roleColor = getRoleColorClass(player.player_role);
            const isCaptain = captain === player.id;
            const isViceCaptain = viceCaptain === player.id;
            
            return (
              <div key={player.id} className="border rounded-lg overflow-hidden">
                <div className="flex items-center p-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3 relative">
                    <img 
                      src={player.player_logo}
                      alt={player.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{player.name}</h3>
                    <div className="flex items-center text-xs mt-1">
                      <span className={`${roleColor} text-white px-2 py-0.5 rounded-full mr-2`}>
                        {player.player_role}
                      </span>
                      <span className="text-gray-500">{player.team_name}</span>
                      {/* <span className="ml-auto font-medium">{player.points} pts</span> */}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => selectCaptain(player.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                        isCaptain 
                          ? 'bg-orange-600 text-white border-orange-600' 
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <Star className="w-5 h-5" fill={isCaptain ? 'white' : 'none'} />
                    </button>
                    <button
                      onClick={() => selectViceCaptain(player.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                        isViceCaptain 
                          ? 'bg-yellow-500 text-white border-yellow-500' 
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <Award className="w-5 h-5" fill={isViceCaptain ? 'white' : 'none'} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const ConfirmationScreen = () => {
    const captainPlayer = selectedPlayers.find(p => p.id === captain);
    const viceCaptainPlayer = selectedPlayers.find(p => p.id === viceCaptain);
    
    return (
      <div className="flex flex-col h-full">
        <div className="flex-shrink-0">
          <div className="bg-gradient-to-r from-purple-800 to-indigo-800 p-4 rounded-lg mb-4">
            <h2 className="text-lg font-bold text-white mb-2">Your Dream 11 Team</h2>
            <p className="text-white text-sm">Review your team before submitting</p>
          </div>
          
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex justify-between mb-3">
              <div>
                <span className="block text-sm font-bold">Captain</span>
                <span className="text-lg font-medium flex items-center gap-1">
                  <Star className="w-5 h-5 text-orange-600" fill="currentColor" />
                  {captainPlayer?.name}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-sm font-bold">Vice Captain</span>
                <span className="text-lg font-medium flex items-center gap-1 justify-end">
                  <Award className="w-5 h-5 text-yellow-500" fill="currentColor" />
                  {viceCaptainPlayer?.name}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-grow overflow-y-auto h-96">
          <div className="mb-4">
            {['wicket-keeper', 'batsman', 'all-rounder', 'bowler'].map(role => {
              const playersInRole = selectedPlayers.filter(p => p.player_role === role);
              if (playersInRole.length === 0) return null;
              
              return (
                <div key={role} className="mb-4">
                  <h3 className="font-medium mb-2">{role}s ({playersInRole.length})</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {playersInRole.map(player => {
                      const isCaptain = captain === player.id;
                      const isViceCaptain = viceCaptain === player.id;
                      const roleColor = getRoleColorClass(player.player_role);
                      
                      return (
                        <div key={player.id} className="border rounded-lg overflow-hidden">
                          <div className="flex items-center p-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3 relative">
                              <img 
                                src={player.player_logo}
                                alt={player.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              {isCaptain && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                  C
                                </div>
                              )}
                              {isViceCaptain && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                  VC
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-sm">{player.name}</h3>
                              <div className="flex items-center text-xs mt-1">
                                <span className="text-gray-500">{player.team_name}</span>
                                {/* <span className="ml-auto font-medium">
                                  {isCaptain ? `${player.points}×2` : isViceCaptain ? `${player.points}×1.5` : player.points} pts
                                </span> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const NavigationBar = () => (
    <div className="flex justify-between items-center py-3 px-4 border-t bg-white">
      {step > 1 ? (
        <button 
          onClick={goBack}
          className="px-4 py-2 text-purple-600 font-medium rounded-lg hover:bg-purple-50"
        >
          Back
        </button>
      ) : (
        <div></div>
      )}
      
      {step < 3 ? (
        <button 
          onClick={goToNextStep}
          disabled={
            (step === 1 && !isTeamValid()) || 
            (step === 2 && (!captain || !viceCaptain))
          }
          className={`px-4 py-2 rounded-lg flex items-center ${
            ((step === 1 && !isTeamValid()) || (step === 2 && (!captain || !viceCaptain)))
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {step === 1 ? 'Next' : 'Preview Team'}
          <ChevronRight className="w-5 h-5 ml-1" />
        </button>
      ) : (
        <button 
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          Submit Team
        </button>
      )}
    </div>
  );

  const ProgressIndicator = () => (
    <div className="flex items-center justify-between mb-4">
      {[1, 2, 3].map((stepNumber) => (
        <React.Fragment key={stepNumber}>
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
              step >= stepNumber 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {stepNumber}
          </div>
          {stepNumber < 3 && (
            <div className={`flex-1 h-1 ${step > stepNumber ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto pb-2 text-black max-h-screen">
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-2 rounded-t-lg">
        <h1 className="text-xl font-bold text-center">Dream 11 Team Selection</h1>
      </div>
      
      <div className="bg-white rounded-b-lg shadow-lg flex flex-col h-screen max-h-screen">
        <div className="p-2 flex-shrink-0">
          <ProgressIndicator />
        </div>
        
        <div className="px-4 flex-grow overflow-hidden flex flex-col">
          {step === 1 && <PlayerSelectionScreen />}
          {step === 2 && <CaptainSelectionScreen />}
          {step === 3 && <ConfirmationScreen />}
        </div>
        
      </div>
      <NavigationBar />
    </div>
  );
}
export default Dream11TeamSelector;