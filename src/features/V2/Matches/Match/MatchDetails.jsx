import React from "react";
import { useGetMatchQuery } from "../../../../app/Services/matchesApi";
import Loader from "../../../../Components/Loader";
import { useNavigate } from "react-router-dom";

export default function MatchDetails({ matchId }) {
  const { data, isLoading, isError } = useGetMatchQuery(matchId);
  const navigate = useNavigate();

  const handleShowPlayers = (teamId) => {
    navigate(`/team/${teamId}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  const match = data.match;
  const formattedDate = `${new Date(match.match_time).toLocaleDateString(
    "en-IN"
  )} starts at ${new Date(match.match_time).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })}`;

  return (
    <div className="rounded-2xl border border-[#f8d06f]/20 bg-[linear-gradient(160deg,#071522_0%,#0b2338_60%,#091927_100%)] p-5 text-white shadow-[0_18px_36px_rgba(0,0,0,0.3)]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f8d06f]">
        Match Details
      </p>
      <h2 className="mt-2 text-left text-2xl font-black uppercase tracking-[0.02em] text-[#fff2cf] sm:text-3xl">
        {match.match_title}
      </h2>

      <div className="mt-4 max-w-xl rounded-xl border border-[#f8d06f]/20 bg-[#07111c]/80 px-4 py-3">
        <div className="flex items-center justify-center space-x-3">
          <span className="text-lg">⏰</span>
          <p className="text-sm font-medium text-[#d7dfed] sm:text-base">
            {formattedDate}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-[#f8d06f]/20 bg-[#07111c]/85 p-4">
          <div className="text-center">
            <img
              src={match.team_one_logo}
              alt={match.team_one_name}
              className="mx-auto mb-2 h-24 w-24 rounded-lg bg-[#0d1f31] p-2 object-contain"
            />
            <h3 className="mb-3 text-lg font-semibold text-[#f6ead0]">
              {match.team_one_name}
            </h3>
            <button
              onClick={() => handleShowPlayers(match.team_one)}
              className="w-full rounded-lg border border-[#f8d06f]/30 bg-[#0d2942] px-4 py-2 text-sm font-semibold text-[#f3db9e] transition hover:border-[#f8d06f] hover:bg-[#143757]"
            >
              Show Players
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center text-2xl font-bold text-white">
          <img src="/vs.png" alt="VS" className="w-16 opacity-95" />
        </div>

        <div className="rounded-xl border border-[#f8d06f]/20 bg-[#07111c]/85 p-4">
          <div className="text-center">
            <img
              src={match.team_two_logo}
              alt={match.team_two_name}
              className="mx-auto mb-2 h-24 w-24 rounded-lg bg-[#0d1f31] p-2 object-contain"
            />
            <h3 className="mb-3 text-lg font-semibold text-[#f6ead0]">
              {match.team_two_name}
            </h3>
            <button
              onClick={() => handleShowPlayers(match.team_two)}
              className="w-full rounded-lg border border-[#f8d06f]/30 bg-[#0d2942] px-4 py-2 text-sm font-semibold text-[#f3db9e] transition hover:border-[#f8d06f] hover:bg-[#143757]"
            >
              Show Players
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
