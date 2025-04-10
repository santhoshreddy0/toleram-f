import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader";
import AddNewTournament from "./AddNewTournament";
import {ChevronRightIcon, PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useGetRoundsQuery } from "../../../app/Services/roundsApi";

export default function Tournamet() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [round, setRound] = useState(null);
    const { data: rounds, isLoading, isError } = useGetRoundsQuery();
    if (isLoading) return <Loader />
console.log(rounds?.rounds);
    return (
        <div className="py-8">
            <div className="px-6 lg:px-8">
                <div className="bg-gray-800 rounded-lg inset-x-0 bottom-0 flex flex-col justify-between gap-x-8 gap-y-4 p-6 ring-1 ring-gray-900/10 md:flex-row md:items-center lg:px-8">
                    <div className="flex items-center">
                        <p className="max-w-4xl text-gray-100 text-xl font-semibold">
                            Rounds
                        </p>
                    </div>
                    <div className="flex flex-none items-center gap-x-5">
                        <button
                            type="button"
                            onClick={() => {setOpen(true); setRound(null)}}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-white text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 flex items-center gap-2"
                        >
                            <PlusIcon className="size-5" />
                            Create Round
                        </button>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="mt-4 sm:mt-6">
                            {!rounds || rounds?.rounds.length === 0 ? (
                                <div className="text-center py-12 flex flex-col items-center justify-center col-span-2 bg-gray-800 rounded-2xl">
                                    <svg
                                        className="mx-auto h-24 w-24 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                                        />
                                    </svg>
                                    <h3 className="mt-4 text-xl font-semibold text-gray-100">No rounds yet</h3>
                                    <p className="mt-2 text-gray-400">Get started by creating your first round.</p>
                                    <button
                                        type="button"
                                        onClick={() => setOpen(true)}
                                        className="mt-6 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Create Round
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-6">
                                {rounds?.rounds.map((round) => (
                                    <article key={round.id} className="relative flex flex-col items-start justify-between bg-gray-800 rounded-lg">
                                        <div className="w-full">
                                            <div className="p-6">
                                            <div className="flex justify-between items-center mb-6">
                                                <h3 className="text-lg font-semibold text-gray-200">
                                                    {round.round_name}
                                                </h3>
                                            </div>
                                            
                                            </div>
                                          
                                            <div className="">
                                                <div className="-mt-px flex divide-x divide-gray-700">
                                                    <div className="flex w-0 flex-1">
                                                        <button
                                                            onClick={() => {setOpen(true); setRound(round)}}
                                                            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-gray-700 py-4 text-sm font-semibold border-r-gray-700"
                                                        >
                                                            Edit 
                                                            <PencilSquareIcon className="size-5" />
                                                        </button>
                                                    </div>
                                                    <div className="-ml-px flex w-0 flex-1">
                                                        <button
                                                            onClick={() => navigate(`/admin/tournament/rounds/${round.id}`)}
                                                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-gray-700 py-4 text-sm font-semibold border-l-gray-700"
                                                        >
                                                            View
                                                            <ChevronRightIcon className="size-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                                </div>
                            )}
                    </div>
                </div>
            </div>
            {open && <AddNewTournament open={open} setOpen={setOpen} round={round}/>}
        </div>
    )
}
