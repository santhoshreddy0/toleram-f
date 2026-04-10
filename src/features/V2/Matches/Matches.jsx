import React from "react";
import { Link } from "react-router-dom";
import { useGetMatchesQuery } from "../../../app/Services/matchesApi";
import Loader from "../../../Components/Loader";
import MenuTabs from "../../Layout/MenuTabs";
import { FireIcon } from "@heroicons/react/20/solid";
import moment from "moment";
import AddPopup from "../../../Components/PopUp/AddPopup";

function Matches() {
  const { data: matches, isLoading, isError } = useGetMatchesQuery();

  if (isLoading) {
    return <Loader />;
  }
  const formatDateTime = (dateTimeStr) => {
    const date = (
      <span>
        <span>{moment(dateTimeStr).utc().format("h:mm a")}</span>
        <br />
        <span>{moment(dateTimeStr).utc().format("Do MMM")}</span>
      </span>
    );
    return date;
  };
  const filteredMatches = matches?.matches.filter(
    (match) => match.can_show == "1"
  );
  const openMatches = filteredMatches?.filter((match) => match.can_bet == "1");
  const closedMatches = filteredMatches?.filter((match) => match.can_bet != "1");

  const MatchCard = ({ match, isOpen }) => {
    const cardContent = (
      <div className="group relative overflow-hidden rounded-2xl border border-[#f8d06f]/20 bg-[linear-gradient(150deg,#071521_0%,#0b2236_55%,#081826_100%)] shadow-[0_18px_36px_rgba(0,0,0,0.34)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#f8d06f]/40 hover:shadow-[0_22px_42px_rgba(0,0,0,0.45)]">
        <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(248,208,111,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(248,208,111,0.05)_1px,transparent_1px)] [background-size:30px_30px]" />

        {isOpen ? (
          <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-300">
            <FireIcon className="h-3.5 w-3.5 animate-pulse" />
            Live
          </div>
        ) : (
          <div className="absolute right-3 top-3 inline-flex rounded-full border border-zinc-400/40 bg-zinc-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-300">
            Closed
          </div>
        )}

        <div className="relative px-5 pb-4 pt-6">
          <h3 className="line-clamp-2 text-left text-lg font-black tracking-[0.02em] text-[#fff2cf]">
            {match.match_title}
          </h3>

          <div className="mt-5 grid grid-cols-3 items-center gap-2 rounded-xl border border-[#f8d06f]/15 bg-[#06111d]/75 px-3 py-4">
            <div className="flex flex-col items-center">
              <img
                className="h-20 w-16 rounded-lg object-contain"
                src={match.team_one_logo}
                alt={match.team_one_name}
              />
              <p className="mt-2 line-clamp-2 text-center text-xs font-semibold uppercase tracking-[0.05em] text-[#e6edf8]">
                {match.team_one_name}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <img src="/vs.png" alt="VS" className="w-12 opacity-95" />
              <p className="mt-2 text-center text-xs font-semibold text-[#5ed3b0]">
                {formatDateTime(match.match_time)}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <img
                className="h-20 w-16 rounded-lg object-contain"
                src={match.team_two_logo}
                alt={match.team_two_name}
              />
              <p className="mt-2 line-clamp-2 text-center text-xs font-semibold uppercase tracking-[0.05em] text-[#e6edf8]">
                {match.team_two_name}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`relative w-full rounded-b-2xl px-4 py-3 text-center text-sm font-black uppercase tracking-[0.14em] ${
            isOpen
              ? "bg-gradient-to-r from-[#f8d06f] to-[#e2ad45] text-[#221601]"
              : "bg-zinc-700/80 text-zinc-200"
          }`}
        >
          {isOpen ? "Bet Now" : "Betting Closed"}
        </div>
      </div>
    );

    return isOpen ? (
      <Link to={`/matches/${match.id}`}>{cardContent}</Link>
    ) : (
      <div>{cardContent}</div>
    );
  };

  return (
    <>
      <MenuTabs>
        <section className="mx-auto w-full max-w-7xl px-4 pb-24 pt-5 sm:px-6">

          {filteredMatches?.length == 0 ? (
            <div className="mt-8 rounded-2xl border border-[#f8d06f]/20 bg-[#071523]/80 p-10 text-center">
              <h2 className="text-xl font-bold text-[#e8d7ad]">
                No battles in progress right now.
              </h2>
              <p className="mt-2 text-sm text-[#aebdd0]">
                Fresh fixtures will appear here once the next tournament round
                opens.
              </p>
            </div>
          ) : (
            <>
              {openMatches?.length > 0 && (
                <div className="mt-8">
                  <h2 className="mb-4 text-left text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
                    Open For Betting
                  </h2>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {openMatches.map((match) => (
                      <MatchCard key={match.id} match={match} isOpen={true} />
                    ))}
                  </div>
                </div>
              )}

              {closedMatches?.length > 0 && (
                <div className="mt-10">
                  <h2 className="mb-4 text-left text-sm font-bold uppercase tracking-[0.2em] text-zinc-300">
                    Betting Closed
                  </h2>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {closedMatches.map((match) => (
                      <MatchCard key={match.id} match={match} isOpen={false} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </MenuTabs>
      <AddPopup />
    </>
  );
}

export default Matches;
