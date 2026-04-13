import React from "react";
import { PLAYER_IMAGE } from "../../../constants/teamLimits";

const CaptainViceCaptainSelection = ({
  selectedPlayers,
  captain,
  viceCaptain,
  selectCaptain,
  selectViceCaptain,
}) => {
  const captainName =
    selectedPlayers.find((p) => p.id === captain)?.name || "Not selected";
  const vcName =
    selectedPlayers.find((p) => p.id === viceCaptain)?.name || "Not selected";

  return (
    <div className="max-w-3xl mx-auto">
      {/* Summary banner */}
      <div className="bg-[linear-gradient(110deg,#0a1522_0%,#122c45_60%,#0f1f31_100%)] rounded-xl p-4 mb-4 shadow-lg border border-[#f9d274]/25">
        <div className="text-center mb-3">
          <h2 className="text-[#f9d274] font-bold text-base">
            Choose Captain & Vice-Captain
          </h2>
          <p className="text-gray-300 text-[11px] mt-0.5">
            Captain <b className="text-[#f9d274]">2×</b> points · Vice-Captain{" "}
            <b className="text-[#f9d274]">1.5×</b> points
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 bg-black/30 rounded-lg px-3 py-2 border border-orange-500/30 min-w-0">
            <div className="text-[10px] uppercase tracking-wider text-orange-300 flex items-center gap-1">
              <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-orange-500 text-white text-[9px] font-bold">
                C
              </span>
              Captain
            </div>
            <div className="text-white text-sm font-semibold truncate mt-0.5">
              {captainName}
            </div>
          </div>
          <div className="flex-1 bg-black/30 rounded-lg px-3 py-2 border border-yellow-400/30 min-w-0">
            <div className="text-[10px] uppercase tracking-wider text-yellow-300 flex items-center gap-1">
              <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-yellow-400 text-gray-900 text-[9px] font-bold">
                V
              </span>
              Vice-Captain
            </div>
            <div className="text-white text-sm font-semibold truncate mt-0.5">
              {vcName}
            </div>
          </div>
        </div>
      </div>

      {/* Player rows (flat list, matches selection page style) */}
      <div className="space-y-2">
        {selectedPlayers.map((player) => {
          const isCaptain = captain === player.id;
          const isVC = viceCaptain === player.id;
          return (
            <div
              key={player.id}
              className={`rounded-lg p-3 flex items-center gap-3 transition ${
                isCaptain
                  ? "bg-orange-500/10"
                  : isVC
                  ? "bg-yellow-500/10"
                  : "bg-[#0b1b2b]"
              }`}
            >
              <img
                src={player.player_logo || PLAYER_IMAGE}
                alt={player.name}
                style={{ width: 44, height: 44 }}
                className="rounded-full object-cover bg-[#04090f] flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-gray-100 truncate">
                  {player.name}
                </div>
                <div className="text-[11px] text-gray-400 truncate">
                  {player.team_name} · {player.player_role}
                </div>
              </div>
              <div className="flex gap-1.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => selectCaptain(player.id)}
                  className={`h-9 w-9 rounded-full text-xs font-bold transition ${
                    isCaptain
                      ? "bg-orange-500 text-white shadow-[0_0_14px_rgba(249,115,22,0.5)]"
                      : "bg-[#04090f] text-gray-300 hover:bg-[#122c45]"
                  }`}
                >
                  C
                </button>
                <button
                  type="button"
                  onClick={() => selectViceCaptain(player.id)}
                  className={`h-9 w-9 rounded-full text-xs font-bold transition ${
                    isVC
                      ? "bg-yellow-400 text-gray-900 shadow-[0_0_14px_rgba(250,204,21,0.5)]"
                      : "bg-[#04090f] text-gray-300 hover:bg-[#122c45]"
                  }`}
                >
                  VC
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CaptainViceCaptainSelection;
