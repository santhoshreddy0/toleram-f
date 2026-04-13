import React from "react";
import { PLAYER_IMAGE } from "../../../constants/teamLimits";
import { TrophyIcon } from "@heroicons/react/24/solid";

const ROLE_ORDER = [
  { key: "batsman", label: "Batsmen" },
  { key: "all-rounder", label: "All-Rounders" },
  { key: "bowler", label: "Bowlers" },
  { key: "wicket-keeper", label: "Wicket-Keepers" },
  { key: "impact-player", label: "Female Players" },
];

const PlayerRow = ({ player, isCaptain, isVC }) => (
  <div
    className={`mx-2 my-1.5 rounded-lg transition flex items-center gap-3 px-3 py-2.5 ${
      isCaptain
        ? "bg-orange-500/10"
        : isVC
        ? "bg-yellow-500/10"
        : "bg-[#0b1b2b]"
    }`}
  >
    <div className="relative flex-shrink-0">
      <img
        src={player.player_logo || PLAYER_IMAGE}
        alt={player.name}
        style={{ width: 44, height: 44 }}
        className="rounded-full object-cover bg-[#04090f]"
      />
      {isCaptain && (
        <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-[#04090f]">
          C
        </span>
      )}
      {isVC && (
        <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-yellow-400 text-gray-900 text-[10px] font-bold flex items-center justify-center ring-2 ring-[#04090f]">
          V
        </span>
      )}
    </div>
    <div className="min-w-0 flex-1">
      <div className="text-sm font-semibold text-gray-100 truncate">
        {player.name}
      </div>
      <div className="text-[11px] text-gray-400 truncate">
        {player.team_name} · {player.player_role}
      </div>
    </div>
    <div className="text-right flex-shrink-0">
      <div className="text-[10px] text-gray-500 uppercase">Cr</div>
      <div className="text-sm font-bold text-[#f9d274] tabular-nums">
        {player.credits}
      </div>
    </div>
  </div>
);

const TeamPreview = ({ selectedPlayers, captain, viceCaptain, teamName }) => {
  const totalCredits = selectedPlayers.reduce(
    (s, p) => s + (p.credits || 0),
    0
  );

  return (
    <div className="max-w-3xl mx-auto">
      {/* Summary */}
      <div className="bg-[linear-gradient(110deg,#0a1522_0%,#122c45_60%,#0f1f31_100%)] rounded-xl p-4 mb-4 shadow-lg text-center border border-[#f9d274]/25">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#f9d274]/15 ring-2 ring-[#f9d274]/50 mb-2">
          <TrophyIcon className="h-6 w-6 text-[#f9d274]" />
        </div>
        <h2 className="text-[#f9d274] font-bold text-base">
          {teamName || "Your Team"}
        </h2>
        <p className="text-gray-300 text-[11px] mt-1">
          Review before submitting
        </p>
        <div className="flex items-center justify-center gap-4 mt-3 text-[11px]">
          <div>
            <span className="text-gray-400">Players</span>{" "}
            <span className="font-bold text-white">
              {selectedPlayers.length}
            </span>
          </div>
          <span className="text-white/20">|</span>
          <div>
            <span className="text-gray-400">Credits</span>{" "}
            <span className="font-bold text-[#f9d274]">
              {totalCredits}/100
            </span>
          </div>
        </div>
      </div>

      {/* Flat list grouped by role */}
      {ROLE_ORDER.map(({ key, label }) => {
        const players = selectedPlayers.filter((p) => p.player_role === key);
        if (players.length === 0) return null;
        return (
          <div key={key} className="mb-4">
            <div className="flex items-center gap-2 px-2 mb-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#f9d274]">
                {label}
              </h3>
              <span className="text-[10px] text-gray-500">
                ({players.length})
              </span>
            </div>
            {players.map((p) => (
              <PlayerRow
                key={p.id}
                player={p}
                isCaptain={captain === p.id}
                isVC={viceCaptain === p.id}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default TeamPreview;
