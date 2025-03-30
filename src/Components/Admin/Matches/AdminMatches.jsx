import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetmatchQuery } from "../../../app/Services/Admin/AdminMatches";
import Loader from "../../Loader";
import CreateNewMatch from "./AddNewmatchPopup";

export default function AdminMatches() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const { data: matches, isLoading, isError } = useGetmatchQuery();
    if (isLoading) return <Loader />

    return (
        <div className="">
            <div className="py-12 sm:py-24 px-6 lg:px-8">
                <div className="border-2 border-gray-100 rounded-2xl inset-x-0 bottom-0 flex flex-col justify-between gap-x-8 gap-y-4 p-6 ring-1 ring-gray-900/10 md:flex-row md:items-center lg:px-8">
                    <p className="max-w-4xl text-gray-100 text-2xl">
                        Create a new match
                    </p>
                    <div className="flex flex-none items-center gap-x-5">
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="rounded-md bg-gray-100 px-3 py-2 text-gray-700 text-sm font-semibold shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                        >
                            Create match
                        </button>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-100 sm:text-5xl">Matches</h2>
                    <div className="mt-16 lg:mt-20">
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
                                                <p className="text-gray-100 text-center font-medium">
                                                    {match.team_one_name}
                                                </p>
                                            </div>
                                            
                                            <div className="flex flex-col items-center">
                                                <span className="text-gray-100 text-lg font-bold mb-2">VS</span>
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
                                                <p className="text-gray-100 text-center font-medium">
                                                    {match.team_two_name}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-2 mt-6">
                                            {/* <button 
                                                className="flex items-center text-sm text-gray-100 hover:text-gray-200 cursor-pointer bg-gray-700 px-3 py-1.5 rounded-md"
                                                onClick={() => {
                                                    setSelectedMatch(match);
                                                    setOpen(true);
                                                }}
                                            >
                                                Edit
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                            </button> */}
                                            <button className="flex items-center text-sm text-gray-100 hover:text-gray-200 cursor-pointer bg-gray-900 px-3 py-1.5 rounded-md">
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
                    </div>
                </div>
            </div>
            {open && <CreateNewMatch open={open} setOpen={setOpen}/>}
        </div>
    )
}
