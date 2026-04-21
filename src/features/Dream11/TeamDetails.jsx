import React from "react";
import { PLAYER_IMAGE } from "../../constants/teamLimits";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const TeamDetails = ({ teamData, handleEdit }) => {
  const captain = teamData.team.find((p) => p.player_role === "captain");
  const viceCaptain = teamData.team.find((p) => p.player_role === "vice-captain");
  const regulars = teamData.team.filter((p) => p.player_role === "player");

  const totalPoints =
    teamData.team.reduce((s, p) => s + p.points, 0) || teamData.totalPoints;

  // 12 players, 4 rows: 3 / 2(C+VC) / 3 / 4
  const rows = [
    regulars.slice(0, 3),
    [captain, viceCaptain].filter(Boolean),
    regulars.slice(3, 6),
    regulars.slice(6, 10),
  ];

  return (
    <div
      className="relative h-full min-h-[520px] w-full overflow-hidden rounded-[1.75rem] sm:min-h-[720px]"
      style={{
        background:
          "radial-gradient(ellipse at center, #2a8c3c 0%, #1b6c2a 40%, #0e4018 75%, #08280e 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 56px, transparent 56px 112px)",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[85%] w-[92%] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/25" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30%] w-[18%] -translate-x-1/2 -translate-y-1/2 rounded-[10%] border-2 border-amber-200/55 bg-amber-100/15" />

      <div className="absolute left-3 top-3 z-20 flex items-center gap-2 rounded-full border border-[#f8d06f]/45 bg-[rgba(6,14,24,0.72)] px-3 py-1 shadow-[0_6px_18px_rgba(0,0,0,0.5)] backdrop-blur">
        <span className="text-[10px] font-black uppercase tracking-[0.12em] text-[#fff3d1]">
          {teamData?.teamName}
        </span>
        <span className="rounded-full bg-gradient-to-r from-[#f8d06f] via-[#efbb58] to-[#e2ad45] px-2 py-0.5 text-[10px] font-black text-[#1f1402]">
          {totalPoints}
        </span>
        {teamData?.canEdit && (
          <button
            onClick={handleEdit}
            className="inline-flex items-center gap-1 rounded-full border border-[#f8d06f]/50 bg-[rgba(248,208,111,0.18)] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.1em] text-[#ffe39a] hover:bg-[rgba(248,208,111,0.3)]"
          >
            <PencilSquareIcon className="size-3" />
            Edit
          </button>
        )}
      </div>

      <div className="relative z-10 flex h-full flex-col justify-around px-2 py-6 sm:px-6">
        {rows.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-around">
            {row.map((p) => (
              <GroundPlayer key={p.player_id} player={p} tooltipBelow={rIdx === 0} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const GroundPlayer = ({ player, tooltipBelow = false }) => {
  const isCaptain = player.player_role === "captain";
  const isVC = player.player_role === "vice-captain";
  const badge = isCaptain ? "C" : isVC ? "VC" : null;
  const ringColor = isCaptain
    ? "border-[#f8d06f]"
    : isVC
    ? "border-[#51cdff]"
    : "border-white/80";
  const firstName = (player.player_name || "").split(" ")[0];

  return (
    <div className="group relative z-10 flex flex-col items-center hover:z-[50]">
      <div className="relative">
        <div
          className={`h-14 w-14 overflow-hidden rounded-full border-2 bg-gradient-to-b from-[#0a1522] to-[#0a1f2e] shadow-[0_8px_18px_rgba(0,0,0,0.55)] sm:h-16 sm:w-16 ${ringColor}`}
        >
          <img
            src={player.player_logo || PLAYER_IMAGE}
            alt={player.player_name}
            className="h-full w-full object-cover"
          />
        </div>
        {badge && (
          <span
            className={`absolute -left-1 -top-1 flex h-5 min-w-[22px] items-center justify-center rounded-full border border-[#0a1522] px-1 text-[10px] font-black text-[#1f1402] shadow ${
              isCaptain
                ? "bg-gradient-to-r from-[#f8d06f] to-[#e2ad45]"
                : "bg-gradient-to-r from-[#7ad9ff] to-[#51cdff]"
            }`}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="mt-1 flex flex-col items-center overflow-hidden rounded-md border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
        <span className="max-w-[96px] truncate bg-white px-2 py-[1px] text-[10px] font-bold text-[#0a1522]">
          {firstName}
        </span>
        <span className="w-full bg-[#0a1522] px-2 py-[1px] text-center text-[10px] font-black text-[#ffe39a]">
          {player.points} pts
        </span>
      </div>
      <div
        className={`pointer-events-none absolute left-1/2 z-[9999] -translate-x-1/2 whitespace-nowrap rounded-md border border-[#f8d06f]/50 bg-[#0a1522] px-2 py-1 text-[10px] font-bold text-[#fff3d1] opacity-0 shadow-[0_10px_24px_rgba(0,0,0,0.6)] transition-opacity duration-150 group-hover:opacity-100 ${
          tooltipBelow ? "-bottom-7" : "-top-7"
        }`}
      >
        {player.player_name}
      </div>
    </div>
  );
};

export default TeamDetails;
