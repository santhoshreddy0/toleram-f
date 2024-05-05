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
    return (
        <MenuTabs>
            <ul role="list" className="divide-y divide-gray-100 mx-5">
                {rounds?.rounds?.map((round) => (
                    <li key={round.id} className="">
                        <Link
                            to={`/rounds/${round.id}`}
                            className="flex justify-start gap-x-6 py-5"
                        >
                            <div className="flex min-w-0 gap-x-4">
                                {round.can_bet == "0" ? (
                                    <ShieldExclamationIcon className="h-10 w-10 text-red-500" />
                                ) : (
                                    <FireIcon className="h-10 w-10 text-yellow-500" />
                                )}
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                        {round.round_name}
                                    </p>
                                </div>
                            </div>
                            <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
                                {round.can_bet == "0" ? (
                                    <p className="mt-1 text-xs leading-5 text-gray-500">
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
                        </Link>
                    </li>
                ))}
            </ul>
        </MenuTabs>
    );
}

export default Rounds;
