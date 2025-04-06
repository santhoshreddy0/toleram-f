import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetTeamsQuery } from "../../../app/Services/Admin/AdminTeams";
import CreateTeamPopup from "./CreateOrEditTeamPopup";
import Loader from "../../Loader";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import {
  ChevronRightIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import TeamCard from "./TeamCard";

export default function AdminTeams() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  if (isLoading) return <Loader />;

  return (
    <div className="py-8">
      <div className="flex justify-around items-center px-6 lg:px-8">
        <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-100 sm:text-5xl">
          Teams
        </h2>
        <button
          type="button"
          onClick={(e) => {
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-white text-sm font-medium shadow-sm hover:bg-indigo-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="size-5" />
          Create team
        </button>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="mt-16 lg:mt-20">
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {teams?.teams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </ul>
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
