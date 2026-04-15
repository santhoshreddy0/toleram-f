import React, { useState } from "react";
import { useCreateDream11TeamMutation } from "../../app/Services/dream11Api";

import { toast } from "react-toastify";
import { TrophyIcon } from "@heroicons/react/24/solid";
import Dream11TeamSelector from "./TeamSelector";

const CreateTeam = () => {
  const [createDream11Team, { isLoading: creatTeamLoading }] =
    useCreateDream11TeamMutation();
  const [showTeamSelector, setShowTeamSelector] = useState(false);

  const handleCreateTeam = async (selectedTeam) => {
    const teamData = {
      players: selectedTeam.team.map((player) => {
        if (player.id === selectedTeam.captain) {
          return { playerId: player.id, roleType: "captain" ,gender:player.gender, type: player.player_role, credits: player.credits};
        }
        if (player.id === selectedTeam.viceCaptain) {
          return { playerId: player.id, roleType: "vice-captain", gender:player.gender, type: player.player_role, credits: player.credits};
        }
        return { playerId: player.id, roleType: "player", gender:player.gender, type: player.player_role, credits: player.credits };
      }),
      teamName: selectedTeam.teamName
    };
    try {
      const response = await createDream11Team({ teamData }).unwrap();
      toast.success(response?.message);
    } catch (error) {
      toast.error(error?.data?.message || "Error creating team");
      console.error("Error creating team:", error);
    }
  };
  const handCreateTeam = () => {
    setShowTeamSelector(!showTeamSelector);
  };

  return (
    <>
      {!showTeamSelector ? (
        <div className="relative flex h-full flex-col items-center justify-center overflow-hidden px-4">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[radial-gradient(circle,rgba(248,208,111,0.18)_0%,rgba(248,208,111,0)_70%)] blur-2xl" />
          <div className="pointer-events-none absolute left-1/3 top-1/4 h-[240px] w-[240px] rounded-full bg-[radial-gradient(circle,rgba(81,205,255,0.12)_0%,rgba(81,205,255,0)_70%)] blur-2xl" />

          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-[#f8d06f]/30 bg-[linear-gradient(135deg,rgba(9,22,36,0.95)_0%,rgba(13,32,50,0.92)_50%,rgba(9,20,34,0.95)_100%)] px-7 py-9 text-center shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f8d06f]/70 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#f8d06f]/40 to-transparent" />

            <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#f8d06f]/45 bg-[radial-gradient(circle,rgba(248,208,111,0.22)_0%,rgba(248,208,111,0)_70%)] shadow-[0_0_28px_rgba(248,208,111,0.3)]">
              <TrophyIcon className="h-7 w-7 text-[#f8d06f]" />
            </div>

            <h2 className="bg-gradient-to-r from-[#f8d06f] via-[#ffe39a] to-[#f8d06f] bg-clip-text text-sm font-black uppercase tracking-[0.24em] text-transparent">
              Your Squad Awaits
            </h2>

            <div className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-transparent via-[#f8d06f]/60 to-transparent" />

            <blockquote className="mt-4 text-[15px] italic leading-relaxed text-[#e5eefb]">
              <span className="text-lg text-[#f8d06f]">&ldquo;</span>
              Your fantasy squad is still a fantasy&hellip; let&rsquo;s make it real.
              <span className="text-lg text-[#f8d06f]">&rdquo;</span>
            </blockquote>

            <button
              onClick={handCreateTeam}
              className="group mt-7 inline-flex items-center justify-center gap-2 rounded-full border border-[#f8d06f]/60 bg-gradient-to-r from-[#f8d06f] via-[#efbb58] to-[#e2ad45] px-7 py-2.5 text-xs font-black uppercase tracking-[0.18em] text-[#1f1402] shadow-[0_14px_34px_rgba(248,208,111,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
            >
              Create Team
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                &rarr;
              </span>
            </button>
          </div>
        </div>
      ) : (
        <Dream11TeamSelector
          players={null}
          onSubmit={handleCreateTeam}
          onClose={handCreateTeam}
        />
      )}
    </>
  );
};

export default CreateTeam;
