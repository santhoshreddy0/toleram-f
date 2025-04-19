import React, { useState } from "react";
import { useGetDream11LeaderboardQuery } from "../../app/Services/dream11Api";
import MenuTabs from "../Layout/MenuTabs";
import { useNavigate } from "react-router-dom";
import BackButtonWithRules from "../../Components/BackButtonWithRules";
import BackButton from "../../Components/BackButton";
import { TrophyIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader";

function Dream11Leaderboard() {
    const userDetails = useSelector(state => state.auth.user)
    const { data: leaderboard, isLoading } = useGetDream11LeaderboardQuery();
    const [selectedUser, setSelectedUser] = useState(null);

    const getMedalDisplay = (rank) => {
        switch (rank) {
            case 1: return "🥇";
            case 2: return "🥈";
            case 3: return "🥉";
            default: return rank;
        }
    };

    const getInitialBgColor = (index) => {
        const colors = [
            "bg-indigo-600",
            "bg-violet-600",
            "bg-fuchsia-600",
            "bg-purple-600",
            "bg-blue-600",
            "bg-sky-600",
            "bg-cyan-600",
            "bg-teal-600",
            "bg-emerald-600",
            "bg-green-600",
        ];
        return colors[index % colors.length];
    };


    const renderEmptyState = () => (
        <div className="divide-y divide-gray-700">
            {[1, 2, 3, 4, 5].map((_, index) => (
                <div
                    key={index}
                    className="animate-pulse"
                >
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full shadow-md bg-gray-700">
                            </div>
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-gray-700 mr-3">
                                </div>
                                <div className="h-4 w-24 bg-gray-700 rounded">
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="h-4 w-16 bg-gray-700 rounded">
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
    if (isLoading) {
        return <renderEmptyState />
    }

    return (
        <MenuTabs>
            <div className="bg-gray-900 min-h-screen p-3 md:p-6">
                <div className="max-w-lg mx-auto">
                    {leaderboard && leaderboard?.leaderboard.length === 0
                        ? <div className="p-4 text-2xl font-bold text-gray-500">
                            <p>🏆 No players yet. </p>
                        </div>
                        : <>
                            <div className="mb-6 flex items-center justify-between">
                                <h1 className="text-2xl md:text-3xl font-bold text-center text-white flex items-center justify-center">
                                    <TrophyIcon className="w-6 h-6 mr-2" /> Leaderboard
                                </h1>
                                <BackButton />
                            </div>
                            <div className="text-white text-sm flex items-center gap-2 mb-4">
                                <span className="text-gray-400">Last Updated:</span>
                                <span>
                                    {leaderboard?.lastUpdated
                                        ? `${new Date(leaderboard.lastUpdated).toLocaleDateString()} | ${new Date(leaderboard.lastUpdated).toLocaleTimeString()}`
                                        : "--/--/---- | --:--:-- --"
                                    }
                                </span>
                            </div>
                            <div className="divide-y divide-gray-700">
                                {leaderboard?.leaderboard.map((user, index) => (
                                    <div
                                        key={user.userId}
                                        className={`cursor-pointer transition-all duration-200 hover:bg-gray-700 ${selectedUser?.userId === user.userId ? "bg-gray-700" : ""
                                            }`}
                                        onClick={() => setSelectedUser(user)}
                                    >
                                        <div className="p-4 flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className={`flex items-center justify-center w-8 h-8 rounded-full shadow-md `}
                                                >
                                                    <span className="text-sm font-bold">
                                                        {getMedalDisplay(user.rank)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <div
                                                        className={`w-10 h-10 rounded-full ${getInitialBgColor(
                                                            index
                                                        )} text-white shadow-md flex items-center justify-center mr-3 text-sm font-medium`}
                                                    >
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="font-medium text-white">
                                                        {user.userId == userDetails.id ? (
                                                            <span className="inline-flex items-center gap-1">
                                                                <span className="bg-gradient-to-r from-yellow-500 to-amber-600 text-transparent bg-clip-text font-bold">You</span>
                                                            </span>
                                                        ) : (
                                                            user.name
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-200">
                                                    {user.totalPoints.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    }
                </div>
            </div>
        </MenuTabs>
    );
}

export default Dream11Leaderboard;
