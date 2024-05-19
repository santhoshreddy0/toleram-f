import React from "react";
import { useGetRoundsQuery } from "../../../app/Services/roundsApi";
import Loader from "../../../Components/Loader";
import MenuTabs from "../../Layout/MenuTabs";
import { FireIcon, ShieldExclamationIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Rounds() {
  const { data: rounds, isLoading, isError } = useGetRoundsQuery();

  if (isLoading) {
    return <Loader />;
  }
  const roundOne = rounds?.rounds[0] || {}
  return (
    <MenuTabs>
      <ul role="list" className=" mx-5 grid grid-cols-1 md:grid-cols-2">
        <li
          key={"round.id"}
          className="border md:max-w-lg m-5 rounded-lg border-white px-5 bg-gray-800"
        >
          <Link
            to={`/players`}
            className="flex justify-start gap-x-6 py-5"
          >
            <div className="flex min-w-0 gap-x-4 md:text-center md:mx-auto">
              {roundOne.can_bet == "0" ? (
                <ShieldExclamationIcon className="h-10 w-10 text-red-500" />
              ) : (
                <FireIcon className="h-10 w-10 text-yellow-500" />
              )}
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6">
                  Best Players
                </p>
                <div className=" shrink-0 sm:flex sm:flex-col sm:items-start text-left">
                  {roundOne.can_bet == "0" ? (
                    <p className="mt-1 text-xs leading-5 text-gray-300">
                      Not Active{" "}
                    </p>
                  ) : (
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-xs leading-5 text-gray-500">Active</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </li>
        {rounds?.rounds?.map((round) => (
          <li
            key={round.id}
            className="border md:max-w-lg m-5 rounded-lg border-white px-5 bg-gray-800"
          >
            <Link
              to={`/rounds/${round.id}`}
              className="flex justify-start gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4 md:text-center md:mx-auto">
                {round.can_bet == "0" ? (
                  <ShieldExclamationIcon className="h-10 w-10 text-red-500" />
                ) : (
                  <FireIcon className="h-10 w-10 text-yellow-500" />
                )}
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6">
                    {round.round_name}
                  </p>
                  <div className=" shrink-0 sm:flex sm:flex-col sm:items-start text-left">
                    {round.can_bet == "0" ? (
                      <p className="mt-1 text-xs leading-5 text-gray-300">
                        Not Active{" "}
                      </p>
                    ) : (
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs leading-5 text-gray-500">
                          Active
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </MenuTabs>
  );
}

export default Rounds;
