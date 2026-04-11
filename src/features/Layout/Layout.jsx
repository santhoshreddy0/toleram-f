import React from "react";
import Header from "./Header";

export default function Layout(props) {
  return (
    <div className="relative min-h-screen bg-[#04090f]">
      <div className="pointer-events-none absolute left-0 top-0 -z-0 h-[360px] w-[360px] animate-pulse rounded-full bg-[radial-gradient(circle,rgba(255,208,107,0.28)_0%,rgba(255,208,107,0.02)_72%)] blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-16 -z-0 h-[420px] w-[420px] animate-pulse rounded-full bg-[radial-gradient(circle,rgba(81,205,255,0.25)_0%,rgba(81,205,255,0.02)_72%)] blur-3xl" />

      <div className="top-banner relative z-30 border-b border-[#f9d274]/25 bg-[linear-gradient(110deg,#0a1522_0%,#122c45_40%,#0f1f31_100%)]">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-hidden px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#f9e4a8] sm:gap-3 sm:px-4 sm:text-xs sm:tracking-[0.2em]">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#ffca4f] shadow-[0_0_12px_rgba(255,202,79,0.9)]" />
          <div className="min-w-0 overflow-hidden">
            <div className="inline-flex min-w-max animate-banner-marquee whitespace-nowrap">
              <span className="pr-10">
                Live Tournament Action • Smart Bets • Real-Time Leaderboard •
                Back Your Team • Feel The Pressure •
              </span>
              <span className="pr-10">
                Live Tournament Action • Smart Bets • Real-Time Leaderboard •
                Back Your Team • Feel The Pressure •
              </span>
            </div>
          </div>
        </div>
      </div>

      <Header />
      <main className="isolate relative z-10">{props.children}</main>
    </div>
  );
}
