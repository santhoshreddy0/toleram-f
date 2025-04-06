import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  PencilSquareIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import CreateOrEditTeamPopup from "./CreateOrEditTeamPopup";
const TeamCard = ({ team }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <li
        key={team.id}
        className="col-span-1 divide-y divide-gray-200 rounded-lg bg-gray-800 shadow text-white"
      >
        <div className="flex w-full items-center justify-between space-x-6 p-6">
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <h3 className="truncate text-sm font-medium ">
                {team.team_name}
              </h3>
            </div>
            <p className="mt-1 truncate text-md ">{team.title}</p>
          </div>
          <img
            alt=""
            src={team.team_logo}
            className="size-20 shrink-0 rounded-full "
          />
        </div>
        <div>
          <div className="-mt-px flex divide-x ">
            <div className="flex w-0 flex-1">
              <div
                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold "
                onClick={() => setOpen(true)}
              >
                Edit
                <PencilSquareIcon aria-hidden="true" className="size-5 " />
              </div>
            </div>
            <div className="-ml-px flex w-0 flex-1">
              <Link
                to={`/admin/teams/${team?.id}`}
                className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold "
              >
                View
                <ChevronRightIcon aria-hidden="true" className="size-5 " />
              </Link>
            </div>
          </div>
        </div>
      </li>
      <CreateOrEditTeamPopup
        open={open}
        setOpen={setOpen}
        selectedTeam={team}
      />
    </>
  );
};

export default TeamCard;
