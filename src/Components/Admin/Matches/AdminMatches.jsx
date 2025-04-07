import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetmatchesQuery } from "../../../app/Services/Admin/AdminMatches";
import Loader from "../../Loader";
import CreateNewMatch from "./AddNewmatchPopup";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function AdminMatches() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const { data: matches, isLoading, isError } = useGetmatchesQuery();
    if (isLoading) return <Loader />

    return (
        <div className="">
            <div className="pt-12 px-6 lg:px-8">
                <div className="bg-gray-800 rounded-2xl inset-x-0 bottom-0 flex flex-col justify-between gap-x-8 gap-y-4 p-6 ring-1 ring-gray-900/10 md:flex-row md:items-center lg:px-8">
                    <div className="flex items-center">
                        <p className="max-w-4xl text-gray-100 text-xl font-semibold">
                            Matches
                        </p>
                    </div>
                    <div className="flex flex-none items-center gap-x-5">
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-white text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 flex items-center gap-2"
                        >
                            <PlusIcon className="size-5" />
                            Create match
                        </button>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="mt-16 lg:mt-20">
                            {matches?.matches.length === 0 ? (
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
                                    <h3 className="mt-4 text-xl font-semibold text-gray-100">No matches yet</h3>
                                    <p className="mt-2 text-gray-400">Get started by creating your first match.</p>
                                    <button
                                        type="button"
                                        onClick={() => setOpen(true)}
                                        className="mt-6 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Create Match
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-20">
                                {matches?.matches.map((match) => (
                                    <article key={match.id} className="relative flex flex-col items-start justify-between bg-gray-800 rounded-2xl p-6">
                                        <div className="w-full">
                                            <div className="flex justify-between items-center mb-6">
                                                <h3 className="text-xl font-semibold text-gray-100">
                                                    {match.match_title}
                                                </h3>
                                                {/* <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-900 border-2 border-gray-100 text-xs">
                                                    {match.bet_status}
                                                </span> */}
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex flex-col items-center flex-1">
                                                    <img
                                                        src={match.team_one_logo}
                                                        alt={match.team_one_name}
                                                        className="w-24 h-24 rounded-full object-cover mb-3"
                                                    />
                                                    <p className="text-gray-100 text-center font-medium text-sm">
                                                        {match.team_one_name}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col items-center">
                                                <div class="vs flex justify-center align-middle"><img src="/vs.png" alt="VS" class="vs-image w-16"/></div>
                                                    <span className="text-gray-100 text-sm">
                                                        {new Date(match.match_time).toLocaleDateString()}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col items-center flex-1">
                                                    <img
                                                        src={match.team_two_logo}
                                                        alt={match.team_two_name}
                                                        className="w-24 h-24 rounded-full object-cover mb-3"
                                                    />
                                                    <p className="text-gray-100 text-center font-medium text-sm">
                                                        {match.team_two_name}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex justify-end gap-2 mt-6">
                                                <button onClick={() => navigate(`/admin/matches/${match.id}`)} className="flex items-center text-sm text-gray-100 hover:text-gray-200 cursor-pointer bg-gray-900 px-3 py-1.5 rounded-md">
                                                    view
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                                </div>
                            )}
                    </div>
                </div>
            </div>
            {open && <CreateNewMatch open={open} setOpen={setOpen} />}
        </div>
    )
}
