import React ,{ useState } from 'react';
import { useCreateDream11TeamMutation } from "../../app/Services/dream11Api";
import Dream11TeamSelector from "./Dream11TeamSelector";
import { toast } from 'react-toastify';

const CreateTeam = () => {
  const [createDream11Team, { isLoading: creatTeamLoading }] = useCreateDream11TeamMutation();
  const [showTeamSelector, setShowTeamSelector] = useState(false);

  const handleCreateTeam = async (selectedTeam) => {
    const teamData = {
      players: selectedTeam.team.map(player => {
        if (player.id === selectedTeam.captain) {
          return { playerId: player.id, roleType: 'captain' };
        }
        if (player.id === selectedTeam.viceCaptain) {
          return { playerId: player.id, roleType: 'vice-captain' };
        }
        return { playerId: player.id, roleType: 'player' };
      })
    };
    try {
      const response = await createDream11Team({ teamData }).unwrap();
      toast.success(response?.message);
    } catch (error) {
      toast.error(error?.data?.message || 'Error creating team');  
      console.error('Error creating team:', error);
    }
  }

  return (
    <>
      {!showTeamSelector ? (
       
             <div className="flex flex-col items-center justify-center h-screen text-center">
          <p className="text-xl text-white font-medium mb-4">You haven't created a team yet</p>
          <button
            onClick={() => setShowTeamSelector(true)}
            className="flex items-center justify-center bg-blue-500 text-white rounded-full px-6 py-2 shadow-lg hover:bg-blue-600 transition duration-300"
          >
            <span className="text-2xl">+</span>
            <span className="ml-2">Create Team</span>
          </button>
        </div>
    
       
      ) : (
        <Dream11TeamSelector players={null} onSubmit={handleCreateTeam} />
      )}
    </>
  );
}

export default CreateTeam;
