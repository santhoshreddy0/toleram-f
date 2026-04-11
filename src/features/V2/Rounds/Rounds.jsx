import React from "react";
import { useGetRoundsQuery } from "../../../app/Services/roundsApi";
import Loader from "../../../Components/Loader";
import MenuTabs from "../../Layout/MenuTabs";
import { FireIcon, ShieldExclamationIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Rounds() {
  const { data: rounds, isLoading, isError } = useGetRoundsQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <MenuTabs>
      <section className="mx-auto w-full max-w-7xl px-4 pb-24 pt-5 sm:px-6">
        <div className="rounded-2xl border border-[#f8d06f]/18 bg-[linear-gradient(120deg,rgba(8,20,34,0.9)_0%,rgba(9,27,43,0.82)_55%,rgba(6,16,28,0.92)_100%)] px-5 py-4 text-left shadow-[0_16px_34px_rgba(0,0,0,0.28)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f8d06f]">
            Round Center
          </p>
          <h1 className="mt-1 text-2xl font-black uppercase tracking-[0.02em] text-[#fff1cf]">
            Tournament Rounds
          </h1>
          <p className="mt-1 text-sm text-[#cad6e7]">
            Step into active rounds and place your picks before the window
            closes.
          </p>
        </div>

      {rounds?.rounds.length == 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-[#f8d06f]/20 bg-[#071523]/80 p-10 text-center">
            <h1 className="text-xl font-black uppercase tracking-[0.03em] text-[#e8d7ad] sm:text-2xl">
              Tournament Rounds Coming Soon
            </h1>
            <p className="mt-2 text-sm text-[#aebdd0]">
              The next set of rounds will appear here once they go live.
            </p>
          </div>
      ) : (
      <ul
        role="list"
          className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2"
      >
        {rounds?.rounds?.map((round) => (
          <li
            key={round.id}
              className="group overflow-hidden rounded-3xl border border-[#f8d06f]/25 bg-[linear-gradient(145deg,#06101a_0%,#0b2135_52%,#08192b_100%)] shadow-[0_22px_44px_rgba(0,0,0,0.38)] transition-all duration-300 hover:-translate-y-1 hover:border-[#f8d06f]/55 hover:shadow-[0_26px_52px_rgba(0,0,0,0.5)]"
          >
            <Link
              to={round.can_bet == "1" ? `/rounds/${round.id}` : "/rounds"}
                className="relative flex justify-start gap-x-6 px-5 py-5"
            >
                <div className="pointer-events-none absolute -left-16 top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(248,208,111,0.2)_0%,rgba(248,208,111,0)_72%)] blur-2xl" />
                <div className="pointer-events-none absolute -right-14 bottom-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(81,205,255,0.2)_0%,rgba(81,205,255,0)_72%)] blur-2xl" />
              <div className="flex min-w-0 gap-x-4 md:text-center md:mx-auto">
                {round.can_bet == "0" ? (
                    <ShieldExclamationIcon className="h-10 w-10 text-rose-400" />
                ) : (
                    <FireIcon className="h-10 w-10 text-[#f8d06f]" />
                )}
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-black uppercase tracking-[0.05em] leading-6 text-[#fff2cf] sm:text-base">
                    {round.round_name}
                  </p>
                    <div className="shrink-0 text-left sm:flex sm:flex-col sm:items-start">
                    {round.can_bet == "0" ? (
                        <p className="mt-1 inline-flex items-center rounded-full border border-zinc-400/40 bg-zinc-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] leading-5 text-zinc-300">
                          Not Active
                      </p>
                    ) : (
                        <div className="mt-1 inline-flex items-center gap-x-1.5 rounded-full border border-emerald-400/45 bg-emerald-500/12 px-2 py-0.5">
                          <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        </div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.1em] leading-5 text-emerald-300">
                          Active
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      )}
      </section>
    </MenuTabs>
  );
}

export default Rounds;
