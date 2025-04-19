import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetmatchesQuery, useUpdateMatchStatusMutation, useUpdateBetStatusMutation } from "../../../app/Services/Admin/adminMatches";
import Loader from "../../Loader";
import CreateNewMatch from "./AddNewmatchPopup";
import { ArrowRightIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Switch } from '@headlessui/react'
import { betProcessStateCtaText, betStatus } from "../../../Utils/constants";

export default function AdminMatches() {
    const [open, setOpen] = useState(false);
    const [matchId, setMatchId] = useState(null);
    const { data: matches, isLoading, isError } = useGetmatchesQuery();
    const [updateMatchStatus, { isLoading: isUpdating }] = useUpdateMatchStatusMutation();
    const [updateBetStatus, { isLoading: isUpdatingBet }] = useUpdateBetStatusMutation();
    const formatDateTime = (dateTimeStr) => {
        return `${moment(dateTimeStr).utc().format("h:mm a")} | ${moment(dateTimeStr).utc().format("Do MMM")}`;
    };
    if (isLoading) return <Loader />

    return (
        <div className="py-8">
            {!matches || matches?.matches.length === 0 ? (
                <div className="text-center py-12 flex flex-col items-center justify-center col-span-2 bg-gray-800 rounded-2xl px-8 mx-8">
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
                <div className="bg-gray-900">
                    <div className="mx-auto max-w-7xl">
                        <div className="bg-gray-900 py-10">
                            <div className="px-4 sm:px-6 lg:px-8">
                                <div className="sm:flex sm:items-center text-left">
                                    <div className="sm:flex-auto">
                                        <h1 className="text-base font-semibold text-white">Matches</h1>
                                        <p className="mt-2 text-sm text-gray-300">
                                            A list of all the matches in your account.
                                        </p>
                                    </div>
                                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                        <button
                                            type="button"
                                            onClick={() => setOpen(true)}
                                            className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                        >
                                            Create Match
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-8 flow-root mb-12">
                                    <div className="-mx-4 -my-2 overflow-x-auto md:overflow-visible sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 text-left sm:px-6 lg:px-8">
                                            <table className="min-w-full divide-y divide-gray-700">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                                                            Match
                                                        </th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                            Bet Processing State
                                                        </th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                            Date & Time
                                                        </th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                            Can Bet
                                                        </th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                            Match Status
                                                        </th>
                                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                            More
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-800">
                                                    {matches?.matches.map((match) => (
                                                        <tr key={match.match_title}>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0 max-w-[8rem] truncate">
                                                                <Link to={`/admin/matches/${match.id}`}>{match.match_title}</Link>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                                                <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-300">
                                                                    <svg viewBox="0 0 6 6" aria-hidden="true"
                                                                        className={`size-1.5 fill-${match.bet_status === 'process' ? 'yellow' : match.bet_status === 'completed' ? 'green' : match.bet_status === 'dont_process' ? 'red' : 'gray'}-500`}>
                                                                        <circle r={3} cx={3} cy={3} />
                                                                    </svg>
                                                                    {betStatus[match.bet_status]}
                                                                </span>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{formatDateTime(match.match_time)}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">

                                                                <Switch
                                                                    checked={match.can_bet === "1"}
                                                                    onChange={(e) => {
                                                                        setMatchId(match.id);
                                                                        updateBetStatus({
                                                                            id: match.id,
                                                                            canBet: e ? "1" : "0",
                                                                        });
                                                                    }}
                                                                    className="group relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
                                                                >
                                                                    <span className="sr-only">Use setting</span>

                                                                    {/* Outer ring (track) */}
                                                                    <span
                                                                        aria-hidden="true"
                                                                        className="pointer-events-none absolute mx-auto h-4 w-9 rounded-full bg-gray-700 transition-colors duration-200 ease-in-out group-data-[checked]:bg-indigo-500"
                                                                    />

                                                                    {/* Inner dot (thumb) */}
                                                                    <span
                                                                        aria-hidden="true"
                                                                        className="pointer-events-none absolute left-0 inline-block size-5 transform rounded-full border border-gray-600 bg-gray-900 shadow ring-0 transition-transform duration-200 ease-in-out group-data-[checked]:translate-x-5"
                                                                    />
                                                                </Switch>



                                                            </td>
                                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-0">
                                                                <button onClick={() => {
                                                                    setMatchId(match.id);
                                                                    updateMatchStatus({
                                                                        id: match.id,
                                                                        betStatus: match.bet_status === "dont_process" ? "process" : "dont_process",
                                                                    });
                                                                }} className="bg-indigo-500 text-white px-2 py-1 rounded-md">

                                                                    {betProcessStateCtaText[match.bet_status]}
                                                                </button>
                                                            </td>
                                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-0">
                                                                <Menu as="div" className="relative inline-block text-left">
                                                                    <div>
                                                                        <MenuButton className="flex items-center rounded-full text-gray-400">
                                                                            <span className="sr-only">Open options</span>
                                                                            <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
                                                                        </MenuButton>
                                                                    </div>

                                                                    <MenuItems
                                                                        transition
                                                                        className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                                                    >
                                                                        <div className="py-1">
                                                                            <MenuItem>
                                                                                {({ active }) => (
                                                                                    <Link
                                                                                        to={`/admin/matches/${match.id}`}
                                                                                        className={`group flex items-center px-4 py-2 text-sm text-gray-100 bg-gray-800 ${active ? 'bg-gray-900 text-gray-100' : ''
                                                                                            }`}
                                                                                    >
                                                                                        <ArrowRightIcon
                                                                                            className="mr-3 size-5 text-gray-400 group-hover:text-gray-500"
                                                                                            aria-hidden="true"
                                                                                        />
                                                                                        View
                                                                                    </Link>
                                                                                )}
                                                                            </MenuItem>
                                                                            <MenuItem>
                                                                                {({ active }) => (
                                                                                    <button
                                                                                        onClick={() => {
                                                                                            setOpen(true);
                                                                                            setMatchId(match.id);
                                                                                        }}
                                                                                        className={`group flex w-full items-center px-4 py-2 text-sm text-left text-gray-100 bg-gray-800 ${active ? 'bg-gray-900 text-gray-100' : ''
                                                                                            }`}
                                                                                    >
                                                                                        <PencilSquareIcon
                                                                                            className="mr-3 size-5 text-gray-400 group-hover:text-gray-500"
                                                                                            aria-hidden="true"
                                                                                        />
                                                                                        Edit
                                                                                    </button>
                                                                                )}
                                                                            </MenuItem>

                                                                        </div>
                                                                    </MenuItems>
                                                                </Menu>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {open && <CreateNewMatch open={open} setOpen={(value) => {
                setOpen(value);
                if (!value) {
                    setMatchId(null);
                }
            }} matchId={matchId} />}
        </div>

    )
}