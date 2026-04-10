import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGetTeamsQuery } from "../../app/Services/Admin/adminTeams";

function Index() {
  const { data: teams } = useGetTeamsQuery();
  const [showAllTeams, setShowAllTeams] = useState(false);
  const teamsList = teams?.teams || [];
  const visibleTeams = useMemo(
    () => (showAllTeams ? teamsList : teamsList.slice(0, 8)),
    [showAllTeams, teamsList]
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[#060a0f] text-[#f4efe3]">
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2830&q=80"
          alt="Cricket stadium"
          className="absolute inset-0 h-full w-full scale-110 object-cover saturate-125"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(3,9,16,0.92)_0%,rgba(5,16,28,0.8)_35%,rgba(5,18,32,0.68)_55%,rgba(2,8,14,0.85)_100%),linear-gradient(to_top,rgba(2,7,12,0.94)_2%,rgba(4,11,18,0.62)_35%,rgba(4,10,16,0.35)_100%)]" />
        <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(248,208,111,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(248,208,111,0.06)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute -left-24 top-24 h-64 w-64 animate-pulse rounded-full bg-[radial-gradient(circle,rgba(22,205,255,0.32)_0%,rgba(22,205,255,0)_70%)] blur-3xl" />
        <div className="absolute -right-20 bottom-16 h-72 w-72 animate-pulse rounded-full bg-[radial-gradient(circle,rgba(248,208,111,0.34)_0%,rgba(248,208,111,0)_72%)] blur-3xl" />
        <div className="relative z-30 mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 lg:px-12">
          <p className="inline-flex animate-fade-in-up items-center rounded-full border border-[#f8d06f]/60 bg-[#081726]/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[#f8d06f] opacity-0 [animation-delay:120ms]">
            Tolaram Premier League
          </p>
          <div className="relative mt-6 h-36 w-full max-w-4xl animate-fade-in-up overflow-visible rounded-2xl border border-[#8ec7ff]/25 bg-[#061322]/70 opacity-0 [animation-delay:220ms] sm:h-40">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_55%,rgba(76,149,255,0.24)_0%,rgba(6,19,34,0)_52%),radial-gradient(circle_at_18%_82%,rgba(248,208,111,0.12)_0%,rgba(6,19,34,0)_58%)]" />
            <div className="absolute inset-0 [background-image:linear-gradient(rgba(165,207,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(165,207,255,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="absolute left-[4%] top-[72%] h-[2px] w-[73%] rounded-full bg-[linear-gradient(90deg,rgba(248,208,111,0)_0%,rgba(248,208,111,0.52)_40%,rgba(248,208,111,0)_100%)]" />

            <svg
              viewBox="0 0 1000 220"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <path
                d="M90 78 C 170 110, 250 154, 360 174 C 450 160, 565 168, 720 152"
                fill="none"
                stroke="rgba(248,208,111,0.24)"
                strokeWidth="2"
                strokeDasharray="5 9"
              />
              <path
                d="M720 152 C 772 134, 862 102, 1000 54"
                fill="none"
                stroke="rgba(140,197,255,0.3)"
                strokeWidth="2"
                strokeDasharray="4 8"
                className="animate-wicket-flicker"
              />
            </svg>

            <div className="absolute left-[8%] top-[31%] h-3 w-3 rounded-full border border-[#ffd9b6]/70 bg-[#ffc48a]/60 shadow-[0_0_10px_rgba(255,196,138,0.45)] animate-wicket-flicker" />
            <div className="absolute left-[7.5%] top-[33%] h-[10px] w-6 rounded-[10px] border border-[#ffd9b6]/35 bg-[#ffc48a]/20 blur-[0.4px]" />

            <div className="absolute z-20 h-3.5 w-3.5 animate-delivery-to-screen rounded-full border border-white/80 bg-[#d4453d] shadow-[0_0_20px_rgba(212,69,61,0.95)] sm:h-4 sm:w-4" />
            <div className="absolute h-4 w-4 animate-impact-flash rounded-full border border-[#f8d06f]/80 bg-[#f8d06f]/20" />

            <div className="absolute left-[66.5%] top-[30%] z-10 origin-[20%_88%] animate-bat-swing">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20">
                <div className="absolute bottom-[2px] left-1 h-12 w-2 rounded-full bg-[linear-gradient(180deg,#d89a5b_0%,#905620_100%)] shadow-[0_0_10px_rgba(216,154,91,0.35)]" />
                <div className="absolute bottom-[10px] left-3 h-10 w-8 rotate-[16deg] rounded-[14px_14px_9px_9px] border border-[#f3d7ab]/70 bg-[linear-gradient(160deg,#f7dfb9_0%,#d2a069_100%)] shadow-[0_0_16px_rgba(241,210,155,0.34)] sm:h-12 sm:w-9" />
              </div>
            </div>

            <div className="absolute left-[74%] top-[36%] flex items-end gap-1.5 animate-wicket-drift">
              {[8, 11, 9].map((height, index) => (
                <div key={index} className="relative">
                  <span
                    className="absolute -left-[1px] top-0 block w-[2px] origin-bottom rounded-full border border-[#d3e6ff]/70 bg-[#9bc5ff]/70 animate-sketch-jitter"
                    style={{
                      height: `${height * 4}px`,
                      transform: `rotate(${index === 1 ? 0 : index === 0 ? -2 : 2}deg)`,
                      animationDelay: `${index * 120}ms`,
                    }}
                  />
                  <span
                    className="absolute left-[1px] top-[2px] block w-[1px] origin-bottom rounded-full bg-[#8ec7ff]/75 animate-sketch-jitter"
                    style={{
                      height: `${height * 4 - 3}px`,
                      transform: `rotate(${index === 1 ? 1 : index === 0 ? -4 : 4}deg)`,
                      animationDelay: `${index * 120 + 180}ms`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <h1 className="mt-6 max-w-4xl animate-fade-in-up text-[clamp(2.5rem,7.5vw,6.5rem)] font-black uppercase leading-[0.95] tracking-[0.02em] text-[#fff5d6] opacity-0 [animation-delay:320ms]">
            Back Your Team
            <span className="block text-[#f8d06f]">Own The Roar</span>
          </h1>
          <p className="mt-6 max-w-2xl animate-fade-in-up text-base leading-relaxed text-[#f8f1e2]/90 opacity-0 [animation-delay:460ms] sm:text-lg">
            Every over changes the story. Follow the tournament, track your
            favorite teams, and place your bets before the next clash ignites
            the stadium.
          </p>
          <div className="mt-10 flex animate-fade-in-up flex-wrap items-center gap-4 opacity-0 [animation-delay:600ms]">
            <Link
              to="/login"
              className="inline-flex items-center rounded-full bg-[#f8d06f] px-8 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#151104] transition-all duration-300 hover:translate-y-[-2px] hover:bg-[#ffe08b] hover:shadow-[0_0_40px_rgba(248,208,111,0.45)]"
            >
              Enter Matchday
            </Link>
            <a
              href="#teams"
              className="inline-flex items-center rounded-full border border-[#f8d06f]/50 bg-[#071523]/60 px-8 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#f8eccc] transition-all duration-300 hover:border-[#f8d06f] hover:bg-[#0d2237]/80"
            >
              See Teams
            </a>
          </div>
          <div className="mt-12 grid max-w-3xl animate-fade-in-up gap-5 opacity-0 [animation-delay:740ms] sm:grid-cols-3">
            {[
              {
                label: "Teams Battling",
                value: `${teamsList.length || "--"}`,
              },
              { label: "Betting Ready", value: "Live" },
              { label: "Atmosphere", value: "Electric" },
            ].map((item) => (
              <div
                key={item.label}
                className="border-l-2 border-[#f8d06f]/70 pl-4"
              >
                <p className="text-2xl font-black tracking-wide text-[#fff5d6]">
                  {item.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#f8eccc]/80">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="teams" className="relative px-6 pb-20 pt-20 sm:px-10 lg:px-12">
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-[linear-gradient(90deg,rgba(248,208,111,0)_0%,rgba(248,208,111,0.85)_50%,rgba(248,208,111,0)_100%)]" />
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f8d06f]">
                Tournament Teams
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-[#fff1cf] sm:text-5xl">
                Pick Your Side
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-[#d6d8df] sm:text-base">
              A league where every badge carries history. Explore each squad and
              make your picks before the scoreboard flips.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {visibleTeams.map((team) => (
              <article
                key={team.id}
                className="group text-center transition-all duration-300"
              >
                <Link
                  to={`/team/${team.id}`}
                  className="mx-auto flex w-full max-w-[180px] flex-col items-center"
                >
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-[#f8d06f]/40 bg-[radial-gradient(circle_at_35%_30%,#123656_0,#07101d_70%)] shadow-[0_20px_40px_rgba(0,0,0,0.45)] transition-all duration-300 group-hover:scale-105 group-hover:border-[#f8d06f] group-hover:shadow-[0_0_40px_rgba(248,208,111,0.35)]">
                    <img
                      src={team.team_logo}
                      alt={team.team_name}
                      className="h-20 w-20 object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.55)]"
                    />
                    <span className="pointer-events-none absolute -inset-2 rounded-full border border-dashed border-[#f8d06f]/30" />
                  </div>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.08em] text-[#f7efd9] sm:text-base">
                    {team.team_name}
                  </p>
                </Link>
              </article>
            ))}
          </div>

          {teamsList.length > 8 && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setShowAllTeams((current) => !current)}
                className="inline-flex rounded-full border border-[#f8d06f]/45 px-6 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#f8eccc] transition-all duration-300 hover:border-[#f8d06f] hover:bg-[#102840]"
              >
                {showAllTeams ? "Show Less" : "View All Teams"}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Index;
