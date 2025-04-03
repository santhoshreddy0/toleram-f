import React, { useState } from "react";
import {
  useGetTeamPlayersListQuery,
  useGetTeamQuery,
} from "../../../app/Services/Admin/AdminTeams";
import { useParams } from "react-router-dom";
import AddTeamPlayerPopup from "./AddTeamPlayerPopup";
import CreateTeamPopup from "./CreateTeamPopup";
import Loader from "../../Loader";

export default function AdminTeamDetails() {
  const { teamId } = useParams();
  const {
    data: players,
    isLoading,
    isError,
  } = useGetTeamPlayersListQuery(teamId);
  const {
    data: team,
    isLoading: teamLoading,
    isError: teamError,
  } = useGetTeamQuery(teamId);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [player, setPlayer] = useState(null);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading players</div>;

  return (
    <>
      <div className="py-8 sm:py-16 px-6 lg:px-8">
        <div className="bg-gray-800/50 rounded-2xl flex flex-col justify-between gap-x-8 gap-y-4 p-6 md:flex-row md:items-center lg:px-8">
          <p className="max-w-4xl text-gray-100 text-2xl font-semibold">
            {team?.team?.team_name || "Team Details"}
          </p>
          <div className="flex flex-none items-center gap-x-4">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
                setPlayer(null);
              }}
              className="rounded-md bg-indigo-600 px-4 py-2 text-white text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add player
            </button>
            <button
              type="button"
              onClick={() => setOpenEdit(true)}
              className="rounded-md bg-gray-600 px-4 py-2 text-white text-sm font-semibold shadow-sm hover:bg-gray-500"
            >
              Edit team
            </button>
          </div>
        </div>
      </div>
      <div className="px-6 lg:px-8">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-100 sm:text-5xl text-center mb-12">
          Team Players
        </h2>
        {players?.teamPlayers?.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-xl text-gray-100">
              No players found in this team
            </p>
          </div>
        ) : (
          <ul
            role="list"
            className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 text-center sm:grid-cols-2 md:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-4 xl:grid-cols-5"
          >
            {players?.teamPlayers?.map((player) => (
              <li
                key={player.id}
                className="group relative bg-gray-800/30 rounded-lg p-6 hover:bg-gray-800/50 transition-all"
              >
                <img
                  alt={player.name}
                  src={player.player_logo}
                  className="mx-auto size-16 rounded-full"
                />
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-gray-100">
                  {player.name}
                </h3>
                <p className="text-sm text-gray-400">{player.player_role}</p>
                <button
                  onClick={() => {
                    setOpen(true);
                    setPlayer(player);
                  }}
                  className="mt-4 w-full rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-100 hover:bg-gray-600 transition-colors"
                >
                  Edit Player
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <AddTeamPlayerPopup
        open={open}
        setOpen={setOpen}
        teamId={teamId}
        player={player}
      />
      <CreateTeamPopup
        open={openEdit}
        setOpen={setOpenEdit}
        selectedTeam={team?.team}
      />
    </>
  );
}
