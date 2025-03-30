import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTeamsQuery } from "../../../app/Services/Admin/AdminTeams";
import CreateTeamPopup from "./CreateTeamPopup";
import Loader from "../../Loader";

export default function AdminTeams() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  if (isLoading) return <Loader />;

  return (
    <div className="">
      <div className="py-12 sm:py-24 px-6 lg:px-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col">
            <h3 className="text-gray-100 text-2xl font-semibold text-left">Create a new team</h3>
            <p className="text-gray-400 mt-1">Add a new team to manage players and schedules</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={(e) => {
                setOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-white text-sm font-medium shadow-sm hover:bg-indigo-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Create team
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-100 sm:text-5xl">
            Teams
          </h2>
          <div className="mt-16 lg:mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-20">
              {teams?.teams.map((team) => (
                <article
                  key={team.id}
                  onClick={() => navigate(`/admin/teams/${team?.id}`)}
                  className="cursor-pointer relative flex flex-col items-start justify-between bg-gray-800 rounded-2xl p-4"
                >
                  <div className="relative w-full">
                    <img
                      alt={team.team_name}
                      src={team.team_logo}
                      className="inline-block size-24 rounded-full"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="w-full">
                    <div className="mt-8 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          {/* <span className="max-w-[5rem] relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-900 border-2 border-gray-100 text-xs flex justify-start">
                            status: {team.status}
                          </span> */}
                          <h3 className="mt-3 text-lg/6 font-semibold text-gray-100 group-hover:text-gray-200">
                            {team.team_name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              navigate(`/admin/teams/${team?.id}`);
                            }}
                            className="flex items-center text-sm text-gray-100 hover:text-gray-200 cursor-pointer bg-gray-700 px-2 py-2 rounded-md"
                          > View
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 ml-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
      {open && (
        <CreateTeamPopup
          open={open}
          setOpen={setOpen}
          selectedTeam={selectedTeam}
        />
      )}
    </div>
  );
}
