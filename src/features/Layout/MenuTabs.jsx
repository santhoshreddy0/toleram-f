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

  const tabs = [
    {
      name: "Matches",
      href: "/matches",
      icon: UserIcon,
      current:
        location.pathname.includes("matches") || location.pathname === "/",
    },
    {
      name: "Tournament",
      href: "/rounds",
      icon: BuildingOfficeIcon,
      current: location.pathname.includes("rounds"),
    },
    {
      name: "Bet History",
      href: "/history",
      icon: UsersIcon,
      current: location.pathname.includes("history"),
    },
    {
      name: "Super 12",
      href: "/super12",
      icon: TrophyIcon,
      current: location.pathname.includes("super12"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#060a0f]">
      <div className="mx-auto max-w-7xl">
        <nav
          className="mx-4 mt-4 rounded-2xl border border-[#f9d274]/20 bg-[linear-gradient(120deg,rgba(7,18,30,0.95)_0%,rgba(8,23,38,0.92)_48%,rgba(7,16,28,0.96)_100%)] p-2 shadow-[0_16px_36px_rgba(0,0,0,0.35)] backdrop-blur-md"
          aria-label="Tabs"
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
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
      </div>
      <div className="mx-auto mb-24 max-w-7xl px-4 py-6">
        {props.children}
      </div>
    </div>
  );
}
