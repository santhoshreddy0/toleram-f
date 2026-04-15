import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";
import Dream11Leaderboard from "./Leaderboard";
import Dream11Team from "./Team";

function Dream11() {
  const navigate = useNavigate();
  const [active, setActive] = useState("Team");

  const handleExit = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/matches");
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex w-full flex-col overflow-hidden bg-[#060a0f] text-white">
      <div className="shrink-0 border-b border-[#f9d274]/30 bg-[linear-gradient(110deg,#0a1522_0%,#122c45_40%,#0f1f31_100%)] shadow-[0_10px_24px_rgba(0,0,0,0.4)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-3 py-2 sm:px-5">
          <button
            onClick={handleExit}
            className="inline-flex items-center gap-1 rounded-full border border-[#f8d06f]/50 bg-[rgba(248,208,111,0.08)] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-[#fff3d1] transition-all hover:border-[#f8d06f]/80 hover:bg-[rgba(248,208,111,0.2)]"
          >
            <ArrowLeftIcon className="h-3 w-3" />
            Exit
          </button>

          <div className="flex items-center gap-2">
            <TrophyIcon className="h-5 w-5 text-[#f8d06f]" />
            <h1 className="bg-gradient-to-r from-[#f8d06f] via-[#ffe39a] to-[#f8d06f] bg-clip-text text-sm font-black uppercase tracking-[0.2em] text-transparent sm:text-base">
              Super 12
            </h1>
          </div>

          <button
            onClick={() => setActive(active === "Team" ? "Leaderboard" : "Team")}
            className="rounded-full border border-[#f8d06f]/50 bg-[rgba(248,208,111,0.12)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-[#ffe39a] transition-all hover:border-[#f8d06f]/80 hover:bg-[rgba(248,208,111,0.22)]"
          >
            {active === "Team" ? "Leaderboard" : "Team"}
          </button>
        </div>
      </div>

      <div className={`flex-1 ${active === "Leaderboard" ? "overflow-y-auto" : "overflow-hidden"}`}>
        {active === "Team" ? (
          <Dream11Team />
        ) : (
          <div className="px-3 pb-4 pt-3 sm:px-5">
            <Dream11Leaderboard />
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default Dream11;
