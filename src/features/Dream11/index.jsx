import React, { useState } from "react";
import { TrophyIcon } from "@heroicons/react/24/solid";
import MenuTabs from "../Layout/MenuTabs";
import Dream11Leaderboard from "./Leaderboard";
import Dream11Team from "./Team";

function Dream11() {
  const [active, setActive] = useState("Team");

  return (
    <MenuTabs>
      <div className="flex w-full flex-col text-white">
        <div className="mb-2 flex items-center justify-between gap-3 sm:mb-3">
          <div className="flex items-center gap-2">
            <TrophyIcon className="h-6 w-6 text-[#f8d06f]" />
            <h1 className="bg-gradient-to-r from-[#f8d06f] via-[#ffe39a] to-[#f8d06f] bg-clip-text text-base font-black uppercase tracking-[0.22em] text-transparent sm:text-lg">
              Super 12
            </h1>
          </div>

          <button
            onClick={() => setActive(active === "Team" ? "Leaderboard" : "Team")}
            className="rounded-full border border-[#f8d06f]/50 bg-[rgba(248,208,111,0.12)] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#ffe39a] transition-all hover:border-[#f8d06f]/80 hover:bg-[rgba(248,208,111,0.22)]"
          >
            {active === "Team" ? "Leaderboard" : "Team"}
          </button>
        </div>

        {active === "Team" ? (
          <div className="h-[720px] min-h-[640px] sm:h-[780px]">
            <Dream11Team />
          </div>
        ) : (
          <Dream11Leaderboard />
        )}
      </div>
    </MenuTabs>
  );
}

export default Dream11;
