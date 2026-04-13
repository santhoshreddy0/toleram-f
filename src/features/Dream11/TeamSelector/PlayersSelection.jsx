import React, { useState, useRef, useEffect } from "react";
import { PLAYER_IMAGE } from "../../../constants/teamLimits";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

const ROLE_TABS = [
  {
    key: "all-female",
    label: "WMN",
    filter: "All",
    gender: "female",
    hint: "Pick exactly 2",
  },
  {
    key: "batsman",
    label: "BAT",
    filter: "batsman",
    gender: "male",
    hint: "Select 3–5 Batsmen",
  },
  {
    key: "bowler",
    label: "BWL",
    filter: "bowler",
    gender: "male",
    hint: "Select 3–5 Bowlers",
  },
  {
    key: "all-rounder",
    label: "AR",
    filter: "all-rounder",
    gender: "male",
    hint: "Select 2–4 All-Rounders",
  },
];

// Deterministic hash → one of Tailwind color names, for consistent team accents.
const TEAM_COLORS = [
  "red",
  "blue",
  "yellow",
  "green",
  "purple",
  "pink",
  "orange",
  "cyan",
  "indigo",
  "rose",
];
const teamColorFor = (name = "") => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  return TEAM_COLORS[Math.abs(h) % TEAM_COLORS.length];
};
const TEAM_ACCENT_BG = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  orange: "bg-orange-500",
  cyan: "bg-cyan-500",
  indigo: "bg-indigo-500",
  rose: "bg-rose-500",
};
const TEAM_ACCENT_TEXT = {
  red: "text-red-400",
  blue: "text-blue-400",
  yellow: "text-yellow-400",
  green: "text-green-400",
  purple: "text-purple-400",
  pink: "text-pink-400",
  orange: "text-orange-400",
  cyan: "text-cyan-400",
  indigo: "text-indigo-400",
  rose: "text-rose-400",
};
const teamAbbrev = (name = "") =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .join("")
    .slice(0, 3)
    .toUpperCase();

const TeamDropdown = ({ teams, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div ref={ref} className="relative w-36 sm:w-48 flex-shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between bg-[#0b1b2b] text-white text-xs rounded-md px-3 py-2 border border-white/10 hover:border-[#f9d274]/40 focus:outline-none focus:border-[#f9d274]/60"
      >
        <span className="truncate">{value}</span>
        <ChevronDownIcon
          className={`h-4 w-4 text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-[#0b1b2b] border border-white/10 rounded-md shadow-2xl z-[110]" style={{ backgroundColor: "#0b1b2b" }}>
          {teams.map((team) => (
            <button
              key={team}
              type="button"
              onClick={() => {
                onChange(team);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-[#122c45] ${
                team === value
                  ? "bg-[#122c45] text-[#f9d274] font-semibold"
                  : "text-gray-200"
              }`}
            >
              {team}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const PlayerRow = ({ player, isSelected, onToggle }) => {
  const accent = teamColorFor(player.team_name);
  const accentText = TEAM_ACCENT_TEXT[accent];
  return (
    <div
      className={`mx-2 sm:mx-3 my-1.5 rounded-lg overflow-hidden transition-colors ${
        isSelected
          ? "bg-[#f9d274]/10"
          : "bg-[#0b1b2b]/60 hover:bg-[#0b1b2b]"
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle(player)}
        className="w-full flex items-center gap-3 px-3 py-2.5 text-left"
      >
        <img
          src={player.player_logo || PLAYER_IMAGE}
          alt={player.name}
          style={{ width: 44, height: 52 }}
          className="rounded-md object-cover bg-[#0b1b2b] flex-shrink-0"
        />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm text-gray-100 truncate leading-tight">
            {player.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={`text-[10px] font-bold tracking-wide ${accentText}`}
            >
              {teamAbbrev(player.team_name)}
            </span>
            <span className="text-[10px] text-gray-500">·</span>
            <span className="text-[10px] uppercase text-gray-400 font-semibold">
              {player.player_role}
            </span>
          </div>
        </div>
        <div className="text-center w-14 flex-shrink-0">
          <div className="text-sm font-bold text-gray-100 tabular-nums">
            {player.credits}
          </div>
        </div>
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center transition flex-shrink-0 ${
            isSelected
              ? "bg-red-500 text-white"
              : "bg-[#f9d274] text-[#1a1304] hover:bg-[#ffe39a]"
          }`}
        >
          {isSelected ? (
            <MinusIcon className="h-4 w-4" strokeWidth={3} />
          ) : (
            <PlusIcon className="h-4 w-4" strokeWidth={3} />
          )}
        </div>
      </button>
    </div>
  );
};

const PlayerSelection = ({
  playersLoading,
  error,
  searchQuery,
  setSearchQuery,
  teamFilter,
  setTeamFilter,
  filter,
  setFilter,
  genderFilter,
  setGenderFilter,
  getUniqueTeams,
  filteredPlayers,
  isPlayerSelected,
  togglePlayerSelection,
  getRoleColorClass,
  selectedPlayers = [],
  usedCredits = 0,
  totalCredits = 100,
  maxPlayers = 12,
}) => {
  const activeTab = genderFilter === "female" ? "all-female" : filter;
  const activeHint =
    ROLE_TABS.find((t) => t.key === activeTab)?.hint || "";

  const tabCount = (tab) => {
    if (tab.key === "all-female") {
      return selectedPlayers.filter((p) => p.gender === "female").length;
    }
    return selectedPlayers.filter(
      (p) => p.gender === "male" && p.player_role === tab.filter
    ).length;
  };

  if (playersLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-300">
        Loading players…
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center text-red-400">
        Error: {String(error)}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Search + Team filter — always one row */}
      <div className="flex-shrink-0 px-3 sm:px-5 py-2.5 bg-[#071321] border-b border-white/5 flex items-center gap-2">
        <div className="relative flex-1 min-w-0">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search players"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-[#0b1b2b] text-white text-xs rounded-md border border-white/10 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </div>
        <TeamDropdown
          teams={getUniqueTeams()}
          value={teamFilter}
          onChange={setTeamFilter}
        />
      </div>

      {/* Role tabs — Dream11 style with counts */}
      <div className="flex-shrink-0 bg-[#071321] border-b border-white/5 grid grid-cols-4">
        {ROLE_TABS.map((tab) => {
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setFilter(tab.filter);
                setGenderFilter(tab.gender);
              }}
              className={`relative py-3 text-center text-xs font-bold tracking-wider transition ${
                active ? "text-[#f9d274]" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab.label} ({tabCount(tab)})
              {active && (
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#f9d274] shadow-[0_0_10px_rgba(249,210,116,0.6)]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Sub-hint + inline Credits / Total */}
      <div className="flex-shrink-0 bg-[#04090f] border-b border-white/5 px-3 sm:px-5 py-2 flex items-center justify-between gap-3 text-[11px] uppercase tracking-wider">
        <span className="font-semibold text-gray-400 truncate">
          {activeHint}
        </span>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span
            className={`font-bold tabular-nums ${
              usedCredits > totalCredits ? "text-red-400" : "text-[#f9d274]"
            }`}
          >
            Cr {usedCredits}/{totalCredits}
          </span>
          <span
            className={`font-bold tabular-nums ${
              selectedPlayers.length === maxPlayers
                ? "text-[#f9d274]"
                : "text-gray-300"
            }`}
          >
            Total {selectedPlayers.length}/{maxPlayers}
          </span>
        </div>
      </div>

      {/* Scrollable list — only this scrolls */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar bg-[#071321] py-1">
        {filteredPlayers.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            No players match your filters
          </div>
        ) : (
          filteredPlayers.map((player) => (
            <PlayerRow
              key={player.id}
              player={player}
              isSelected={isPlayerSelected(player.id)}
              onToggle={togglePlayerSelection}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PlayerSelection;
