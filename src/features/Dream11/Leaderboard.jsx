import React, { useState } from "react";
import { useGetDream11LeaderboardQuery } from "../../app/Services/dream11Api";
import {
  TrophyIcon,
  StarIcon,
  FireIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { getUsernameFromEmail } from "../../Utils/Helpers";

function Dream11Leaderboard() {
  const userDetails = useSelector((state) => state.auth.user);
  const { data: leaderboard, isLoading } = useGetDream11LeaderboardQuery();

  const getMedalDisplay = (rank) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return rank;
    }
  };

  const getInitialBgColor = (index) => {
    const colors = [
      "bg-green-600",
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

  const getUserRank = () => {
    if (!leaderboard || !leaderboard.leaderboard) return null;

    const userEntry = leaderboard.leaderboard.find(
      (user) => user.userId === userDetails.id
    );
    return userEntry ? userEntry.rank : null;
  };

  const userRank = getUserRank();

  const getDisplayLeaderboard = () => {
    if (
      !leaderboard ||
      !leaderboard.leaderboard ||
      leaderboard.leaderboard.length === 0
    ) {
      return [];
    }

    const originalLeaderboard = [...leaderboard.leaderboard];

    if (leaderboard.isInTop || (userRank && userRank <= 10)) {
      return originalLeaderboard;
    }

    const topTenPlayers = originalLeaderboard.filter((user) => user.rank <= 10);

    const userIndex = originalLeaderboard.findIndex(
      (user) => user.userId === userDetails.id
    );

    if (userIndex === -1) {
      return originalLeaderboard;
    }

    const endIndex = Math.min(originalLeaderboard.length - 1, userIndex + 1);
    const userContext = originalLeaderboard.slice(userIndex, endIndex + 1);

    const result = [
      ...topTenPlayers,
      ...(userRank > 12 ? [{ isSeparator: true, id: "separator-1" }] : []),
      ...userContext,
    ];

    return result;
  };

  const displayLeaderboard = getDisplayLeaderboard();

  const renderEmptyState = () => (
    <div className="mx-auto max-w-2xl">
      <div className="divide-y divide-[#f8d06f]/10 rounded-2xl border border-[#f8d06f]/22 bg-[linear-gradient(120deg,rgba(9,22,36,0.92)_0%,rgba(11,29,46,0.9)_55%,rgba(9,20,34,0.92)_100%)]">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div key={i} className="flex animate-pulse items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-[#1a2a3e]" />
              <div className="h-10 w-10 rounded-full bg-[#1a2a3e]" />
              <div className="h-4 w-24 rounded bg-[#1a2a3e]" />
            </div>
            <div className="h-4 w-16 rounded bg-[#1a2a3e]" />
          </div>
        ))}
      </div>
    </div>
  );

  if (isLoading) {
    return renderEmptyState();
  }

  return (
    <div className="pb-6">
      <div className="mx-auto max-w-2xl">
        {leaderboard && leaderboard?.leaderboard.length === 0 ? (
          <div className="p-4 text-2xl font-bold text-gray-500">
            <p>🏆 No players yet. </p>
          </div>
        ) : (
          <>
            {leaderboard?.isInTop && (
              <div className="mb-4 rounded-2xl border border-[#f8d06f]/45 bg-[linear-gradient(120deg,rgba(248,208,111,0.28)_0%,rgba(227,170,57,0.2)_60%,rgba(81,205,255,0.18)_100%)] p-4 shadow-[0_12px_28px_rgba(248,208,111,0.25)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrophyIcon className="mr-3 h-8 w-8 text-[#ffe39a]" />
                    <div>
                      <h3 className="text-lg font-black text-[#fff3d1]">Congratulations!</h3>
                      <p className="text-sm text-[#fde6b4]">You're in the top 10!</p>
                    </div>
                  </div>
                  <div className="flex">
                    <StarIcon className="h-6 w-6 text-[#ffe39a]" />
                    <FireIcon className="ml-1 h-6 w-6 text-[#ff9a4d]" />
                  </div>
                </div>
              </div>
            )}

            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xl font-black uppercase tracking-[0.12em] text-[#fff3d1] sm:text-2xl">
                Leaderboard
              </h2>
              {userRank && (
                <div className="flex items-center gap-2 rounded-full border border-[#f8d06f]/40 bg-[rgba(248,208,111,0.1)] px-3 py-1 shadow-md">
                  <span className="text-xs text-[#c8d6ea]">Your Rank:</span>
                  <span className="flex items-center font-black">
                    {userRank < 4 ? (
                      <span className="text-2xl">{getMedalDisplay(userRank)}</span>
                    ) : (
                      <span className="text-[#ffe39a]">{userRank}</span>
                    )}
                  </span>
                </div>
              )}
            </div>
            <div className="mb-3 flex items-center gap-2 text-xs text-[#c8d6ea]">
              <span>updated at:</span>
              <span className="text-[#fff3d1]">
                {leaderboard?.lastUpdated
                  ? `${new Date(
                      leaderboard.lastUpdated
                    ).toLocaleDateString()} | ${new Date(
                      leaderboard.lastUpdated
                    ).toLocaleTimeString()}`
                  : "--/--/---- | --:--:-- --"}
              </span>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#f8d06f]/22 bg-[linear-gradient(120deg,rgba(9,22,36,0.92)_0%,rgba(11,29,46,0.9)_55%,rgba(9,20,34,0.92)_100%)] shadow-[0_12px_26px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between border-b border-[#f8d06f]/20 bg-[rgba(248,208,111,0.08)] px-4 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-[#ffe39a]">
                <div className="flex items-center gap-3">
                  <div className="w-10 text-left">Rank</div>
                  <div>Team</div>
                </div>
                <div>Points</div>
              </div>
              <div className="divide-y divide-[#f8d06f]/10">
              {displayLeaderboard.map((item, index) => {
                if (item.isSeparator) {
                  return (
                    <div key={item.id} className="flex items-center justify-center py-3 text-[#6b7e95]">
                      <div className="flex items-center">
                        <div className="h-px w-16 bg-[#f8d06f]/20" />
                        <EllipsisHorizontalIcon className="mx-2 h-6 w-6" />
                        <div className="h-px w-16 bg-[#f8d06f]/20" />
                      </div>
                    </div>
                  );
                }

                const isMe = item.userId === userDetails.id;
                return (
                  <div
                    key={item.userId}
                    className={`transition-all duration-200 hover:bg-[rgba(248,208,111,0.06)] ${
                      isMe
                        ? "bg-[linear-gradient(120deg,rgba(248,208,111,0.18)_0%,rgba(227,170,57,0.12)_60%,rgba(81,205,255,0.1)_100%)]"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex w-10 items-center justify-start">
                          <span className={`${item.rank < 4 ? "text-2xl" : "text-sm"} font-black text-[#ffe39a]`}>
                            {getMedalDisplay(item.rank)}
                          </span>
                        </div>
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-black text-white shadow-md ${getInitialBgColor(index)}`}
                        >
                          {(item.teamName || item.name || item.email)?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="flex flex-col text-left">
                          <span
                            className={`text-sm font-bold ${
                              isMe
                                ? "bg-gradient-to-r from-[#f8d06f] via-[#ffe39a] to-[#f8d06f] bg-clip-text text-transparent"
                                : "text-[#fff3d1]"
                            }`}
                          >
                            {item.teamName}
                          </span>
                          <span className="text-[11px] text-[#8ba0b9]">
                            {isMe ? "by You" : item.email}
                          </span>
                        </div>
                      </div>
                      <div className="font-black text-[#ffe39a]">
                        {item.totalPoints.toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dream11Leaderboard;
