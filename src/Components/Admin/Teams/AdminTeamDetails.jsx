import React, { useState } from "react";
import { useGetTeamPlayersListQuery } from "../../../app/Services/Admin/AdminTeams";
import { useParams } from "react-router-dom";
import AddTeamPlayerPopup from "./AddTeamPlayerPopup";
import CreateTeamPopup from "./CreateTeamPopup";
import Loader from "../../Loader";

export default function AdminTeamDetails() {
  const { teamId } = useParams();
  const { data: players, isLoading, isError } = useGetTeamPlayersListQuery(teamId);
  const [open, setOpen] = useState(false);

  if (isLoading) return <Loader />
  if (isError) return <div>Error loading players</div>;

  return (
    <>
      <div className="py-12 sm:py-24 px-6 lg:px-8">
        <div className="border-2 border-gray-100 rounded-2xl inset-x-0 bottom-0 flex flex-col justify-between gap-x-8 gap-y-4 p-6 ring-1 ring-gray-900/10 md:flex-row md:items-center lg:px-8">
          <p className="max-w-4xl text-gray-100 text-2xl">
           Add new player to the team
          </p>
          <div className="flex flex-none items-center gap-x-5">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
              className="rounded-md bg-gray-100 px-3 py-2 text-gray-700 text-sm font-semibold shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              Add player
            </button>
            <button 
              type="button" 
              onClick={() => setOpen(false)}
              className="text-sm/6 font-semibold text-gray-100"
            >
              Edit team player
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-100 sm:text-5xl text-center">Team Players</h2>
          {players?.teamPlayers?.length === 0 ? (
            <div className="mt-20 text-center">
              <p className="text-xl text-gray-100">No players found in this team</p>
            </div>
          ) : (
            <ul
              role="list"
              className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-12 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
            >
              {players?.teamPlayers?.map((player) => (
                <li key={player.id}>
                  <img alt={player.name} src={player.player_logo} className="mx-auto size-18 rounded-full" />
                  <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-gray-100">{player.name}</h3>
                  <p className="text-sm/6 text-gray-600">{player.player_role}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <AddTeamPlayerPopup open={open} setOpen={setOpen} teamId={teamId} />
      {/* <CreateTeamPopup open={open} setOpen={setOpen} /> */}
    </>
  )
}
