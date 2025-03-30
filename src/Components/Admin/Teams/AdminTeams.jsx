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
    if (isLoading) return <Loader />

    return (
        <div className="">
            <div className="py-12 sm:py-24 px-6 lg:px-8">
                <div className="border-2 border-gray-100 rounded-2xl inset-x-0 bottom-0 flex flex-col justify-between gap-x-8 gap-y-4 p-6 ring-1 ring-gray-900/10 md:flex-row md:items-center lg:px-8">
                    <p className="max-w-4xl text-gray-100 text-2xl">
                        Create a new team
                    </p>
                    <div className="flex flex-none items-center gap-x-5">
                        <button
                            type="button"
                            onClick={(e) => {
                                setOpen(true);
                            }}
                            className="rounded-md bg-gray-100 px-3 py-2 text-gray-700 text-sm font-semibold shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                        >
                            Create team
                        </button>
                        {/* <button 
                            type="button" 
                            onClick={() => setOpen(false)}
                            className="text-sm/6 font-semibold text-gray-100"
                        >
                            Edit team
                        </button> */}
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-100 sm:text-5xl">Teams</h2>
                    <div className="mt-16 lg:mt-20">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-20">
                            {teams?.teams.map((team) => (
                                <article key={team.id} onClick={() => navigate(`/admin/teams/${team?.id}`)} className="cursor-pointer relative flex flex-col items-start justify-between border-2 border-gray-100 rounded-2xl p-4">
                                    <div className="relative w-full">
                                        <img
                                            alt={team.team_name}
                                            src={team.team_logo}
                                            className="aspect-1/2 w-full rounded-2xl object-cover"
                                        />
                                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                                    </div>
                                    <div className="w-full">
                                        <div className="mt-8 flex flex-col gap-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <span className="max-w-[5rem] relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-900 border-2 border-gray-100 text-xs flex justify-start">
                                                        status: {team.status}
                                                    </span>
                                                    <h3 className="mt-3 text-lg/6 font-semibold text-gray-100 group-hover:text-gray-200">
                                                        {team.team_name}
                                                    </h3>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button 
                                                        className="flex items-center text-sm text-gray-100 hover:text-gray-200 cursor-pointer bg-gray-700 px-3 py-1.5 rounded-md"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            setOpen(true);
                                                            setSelectedTeam(team);
                                                        }}
                                                    >
                                                        Edit
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            navigate(`/admin/teams/${team?.id}`)
                                                        }}
                                                        className="flex items-center text-sm text-gray-100 hover:text-gray-200 cursor-pointer bg-gray-700 px-2 py-2 rounded-md"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
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
            {open && <CreateTeamPopup open={open} setOpen={setOpen} selectedTeam={selectedTeam} />}
        </div>
    )
}
