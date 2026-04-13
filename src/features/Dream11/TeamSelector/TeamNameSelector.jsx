import React, { useState } from "react";
import { TrophyIcon, StarIcon } from "@heroicons/react/24/solid";

export default function TeamNameInput({ teamName, onChange }) {
  const [focused, setFocused] = useState(false);
  const count = teamName?.length || 0;

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-[linear-gradient(110deg,#0a1522_0%,#122c45_60%,#0f1f31_100%)] rounded-xl p-6 text-center shadow-lg mb-4 border border-[#f9d274]/25">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-[#f9d274]/15 ring-2 ring-[#f9d274]/50 mb-3">
          <TrophyIcon className="h-7 w-7 text-[#f9d274]" />
        </div>
        <h2 className="text-[#f9d274] font-bold text-lg">Name Your Team</h2>
        <p className="text-gray-300 text-xs mt-1">
          This is what others will see on the leaderboard
        </p>
      </div>

      <div className="bg-[#0b1b2b] rounded-xl p-4 ring-1 ring-[#f9d274]/20">
        <label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
          Team Name
        </label>
        <div className="relative mt-1.5">
          <input
            type="text"
            placeholder="e.g. Thunder Strikers"
            value={teamName}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            maxLength={30}
            className={`w-full bg-[#04090f] text-white text-base rounded-lg px-4 py-3 border transition ${
              focused
                ? "border-[#f9d274] ring-2 ring-[#f9d274]/30"
                : "border-[#f9d274]/20"
            } focus:outline-none placeholder-gray-500`}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-500 tabular-nums">
            {count}/30
          </span>
        </div>
        <div className="mt-4 pt-3 border-t border-[#f9d274]/15 flex items-center gap-2 text-xs text-gray-400">
          <StarIcon className="h-4 w-4 text-[#f9d274]" />
          Make it memorable — you can't change it later.
        </div>
      </div>
    </div>
  );
}
