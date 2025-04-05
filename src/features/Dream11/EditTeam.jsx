import React, { useState } from "react";
import { useUpdateDream11TeamMutation } from "../../app/Services/dream11Api";
import Dream11TeamSelector from "./Dream11TeamSelector";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";

const EditTeam = ({ teamData, handleEdit }) => {
  const [updateDream11Team, { isLoading: creatTeamLoading }] =
    useUpdateDream11TeamMutation();

  const handleUpdateTeam = async (selectedTeam) => {
    const teamData = {
      players: selectedTeam.team.map((player) => {
        if (player.id === selectedTeam.captain) {
          return { playerId: player.id, roleType: "captain" };
        }
        if (player.id === selectedTeam.viceCaptain) {
          return { playerId: player.id, roleType: "vice-captain" };
        }
        return { playerId: player.id, roleType: "player" };
      }),
    };
    try {
      const response = await updateDream11Team({ teamData }).unwrap();
      toast.success(response?.message || "Team updated successfully");
      handleEdit();
    } catch (error) {
      toast.error(error?.data?.message || "Error creating team");
      console.error("Error creating team:", error);
    }
  };

  if (!teamData || !teamData.team || teamData.team.length === 0) {
    return <Loader />;
  }

  return (
    <>
      <Dream11TeamSelector
        players={teamData.team} 
        onSubmit={handleUpdateTeam}
        isLoading={creatTeamLoading}
      />
    </>
  );
};

export default EditTeam;
