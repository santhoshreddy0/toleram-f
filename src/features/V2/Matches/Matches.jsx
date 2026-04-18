import React from "react";
import { Link } from "react-router-dom";
import { useGetMatchesQuery } from "../../../app/Services/matchesApi";
import Loader from "../../../Components/Loader";
import MenuTabs from "../../Layout/MenuTabs";
import {
  ArrowTrendingUpIcon,
  FireIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";
import moment from "moment";
import AddPopup from "../../../Components/PopUp/AddPopup";
import Discussions from "../../Discussions";

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
      <div className="group relative overflow-hidden rounded-3xl border border-[#f8d06f]/25 bg-[linear-gradient(145deg,#06101a_0%,#0b2135_52%,#08192b_100%)] shadow-[0_22px_44px_rgba(0,0,0,0.38)] transition-all duration-300 hover:-translate-y-1 hover:border-[#f8d06f]/55 hover:shadow-[0_26px_52px_rgba(0,0,0,0.5)]">
        <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(248,208,111,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(248,208,111,0.05)_1px,transparent_1px)] [background-size:30px_30px]" />
        <div className="pointer-events-none absolute -left-16 top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(248,208,111,0.2)_0%,rgba(248,208,111,0)_72%)] blur-2xl" />
        <div className="pointer-events-none absolute -right-14 bottom-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(81,205,255,0.2)_0%,rgba(81,205,255,0)_72%)] blur-2xl" />

        {isOpen ? (
          <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-emerald-400/45 bg-emerald-500/12 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-emerald-300">
            <FireIcon className="h-3.5 w-3.5 animate-pulse" />
            Live
          </div>
        ) : (
          <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-zinc-400/45 bg-zinc-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-zinc-300">
            <LockClosedIcon className="h-3.5 w-3.5" />
            Closed
          </div>
        )}

        <div className="relative px-5 pb-4 pt-6">
          <h3 className="line-clamp-2 text-left text-lg font-black tracking-[0.02em] text-[#fff2cf]">
            {match.match_title}
          </h3>

          <div className="mt-5 grid grid-cols-3 items-center gap-2 rounded-2xl border border-[#f8d06f]/20 bg-[#06111d]/80 px-3 py-4">
            <div className="flex flex-col items-center">
              <img
                className="h-20 w-16 rounded-lg object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]"
                src={match.team_one_logo}
                alt={match.team_one_name}
              />
              <p className="mt-2 line-clamp-2 text-center text-xs font-semibold uppercase tracking-[0.05em] text-[#e6edf8]">
                {match.team_one_name}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <img src="/vs.png" alt="VS" className="w-12 opacity-95 drop-shadow-[0_0_10px_rgba(248,208,111,0.24)]" />
              <p className="mt-2 text-center text-xs font-semibold text-[#7adfbf]">
                {formatDateTime(match.match_time)}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <img
                className="h-20 w-16 rounded-lg object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]"
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
          className={`relative flex w-full items-center justify-center gap-2 rounded-b-3xl px-4 py-3 text-center text-sm font-black uppercase tracking-[0.14em] transition-all duration-300 ${
            isOpen
              ? "bg-gradient-to-r from-[#f8d06f] via-[#efbb58] to-[#e2ad45] text-[#221601] group-hover:brightness-105"
              : "bg-zinc-700/80 text-zinc-200"
          }`}
        >
          {isOpen ? (
            <>
              <span>Enter Match</span>
              <ArrowTrendingUpIcon className="h-4 w-4" />
            </>
          ) : (
            "Betting Closed"
          )}
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
        <section className="mx-auto w-full max-w-7xl px-4  pt-5 sm:px-6">
          <div className="rounded-2xl border border-[#f8d06f]/18 bg-[linear-gradient(120deg,rgba(8,20,34,0.9)_0%,rgba(9,27,43,0.82)_55%,rgba(6,16,28,0.92)_100%)] px-5 py-4 text-left shadow-[0_16px_34px_rgba(0,0,0,0.28)]">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f8d06f]">
              Match Center
            </p>
            <h1 className="mt-1 text-2xl font-black uppercase tracking-[0.02em] text-[#fff1cf]">
              Pick Your Battle
            </h1>
            <p className="mt-1 text-sm text-[#cad6e7]">
              Enter live fixtures to place predictions with momentum on your
              side.
            </p>
          </div>

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
      <Discussions/>
      <AddPopup />
    </>
  );
}

export default Matches;
