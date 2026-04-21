import React from "react";
import {
  BuildingOfficeIcon,
  UserIcon,
  UsersIcon,
  TrophyIcon,
} from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MenuTabs(props) {
  const location = useLocation();
  const contentClassName = props.contentClassName
    || "mx-auto mb-24 max-w-7xl px-4 py-6";

  const tabs = [
    {
      name: "Matches",
      mobileName: "Matches",
      href: "/matches",
      icon: UserIcon,
      current:
        location.pathname.includes("matches") || location.pathname === "/",
    },
    {
      name: "Tournament",
      mobileName: "Rounds",
      href: "/rounds",
      icon: BuildingOfficeIcon,
      current: location.pathname.includes("rounds"),
    },
    {
      name: "Bet History",
      mobileName: "History",
      href: "/history",
      icon: UsersIcon,
      current: location.pathname.includes("history"),
    },
    {
      name: "Super 12",
      mobileName: "Super12",
      href: "/super12",
      icon: TrophyIcon,
      current: location.pathname.includes("/super12"),
    },
    {
      name: "Leaderboard",
      mobileName: "Board",
      href: "/leaderboard",
      icon: TrophyIcon,
      current: location.pathname.includes("/leaderboard"),
    }
  ];

  return (
    <div className="min-h-screen bg-[#060a0f]">
      <div className="mx-auto max-w-7xl">
        <nav
          className="mx-4 mt-4 hidden rounded-2xl border border-[#f9d274]/20 bg-[linear-gradient(120deg,rgba(7,18,30,0.95)_0%,rgba(8,23,38,0.92)_48%,rgba(7,16,28,0.96)_100%)] p-2 shadow-[0_16px_36px_rgba(0,0,0,0.35)] backdrop-blur-md sm:block"
          aria-label="Tabs"
        >
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={classNames(
                  tab.current
                    ? "border border-[#f9d274]/65 bg-[linear-gradient(120deg,rgba(249,210,116,0.32)_0%,rgba(227,170,57,0.22)_50%,rgba(81,205,255,0.2)_100%)] text-[#fff4d2] shadow-[0_10px_26px_rgba(248,208,111,0.23)]"
                    : "border border-transparent text-[#cfdcf1] hover:border-[#f9d274]/35 hover:bg-[rgba(249,210,116,0.08)] hover:text-[#fff4d2]",
                  "group relative flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 sm:gap-2.5"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                <tab.icon
                  className={classNames(
                    tab.current
                      ? "text-[#ffe39a]"
                      : "text-[#8cb4e3] group-hover:text-[#f9d274]",
                    "h-5 w-5 shrink-0 transition-colors duration-300"
                  )}
                  aria-hidden="true"
                />
                <span className="whitespace-nowrap text-[11px] sm:text-xs">
                  {tab.name}
                </span>
                {tab.current && (
                  <span className="absolute bottom-1 left-1/2 h-[2px] w-10 -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,rgba(249,210,116,0)_0%,rgba(249,210,116,1)_50%,rgba(249,210,116,0)_100%)]" />
                )}
              </Link>
            ))}
          </div>
        </nav>

        <nav
          className="fixed inset-x-3 bottom-3 z-40 rounded-[1.75rem] border border-[#f9d274]/18 bg-[linear-gradient(135deg,rgba(7,18,30,0.96)_0%,rgba(9,22,36,0.94)_50%,rgba(7,16,28,0.97)_100%)] px-2 py-2 shadow-[0_20px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:hidden"
          aria-label="Mobile Tabs"
        >
          <div className="grid grid-cols-5 gap-1">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={classNames(
                  tab.current
                    ? "bg-[linear-gradient(180deg,rgba(249,210,116,0.24)_0%,rgba(227,170,57,0.14)_100%)] text-[#fff4d2]"
                    : "text-[#8ba0b9]",
                  "relative flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2.5 transition-all duration-300"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.current && (
                  <span className="absolute inset-x-4 top-0 h-px rounded-full bg-[linear-gradient(90deg,rgba(249,210,116,0)_0%,rgba(249,210,116,0.95)_50%,rgba(249,210,116,0)_100%)]" />
                )}
                <tab.icon
                  className={classNames(
                    tab.current ? "text-[#ffe39a]" : "text-[#6fa8dd]",
                    "h-[18px] w-[18px] shrink-0 transition-colors duration-300"
                  )}
                  aria-hidden="true"
                />
                <span className="truncate text-[9px] font-black uppercase tracking-[0.08em]">
                  {tab.mobileName}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
      <div className={contentClassName}>
        {props.children}
      </div>
    </div>
  );
}
