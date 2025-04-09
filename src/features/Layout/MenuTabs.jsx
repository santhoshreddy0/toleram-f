import React from "react";
import {
  BuildingOfficeIcon,
  UserIcon,
  UsersIcon,
  TrophyIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MenuTabs(props) {
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
      name: "Dream 11",
      href: "/dream11",
      icon: TrophyIcon,
      current: location.pathname.includes("dream11"),
    },
  ];

  return (
    <div>
      <div className="text-white text-lg">
        <div>
          <nav
            className="flex justify-evenly bg-gray-800 p-1 space-x-6"
            aria-label="Tabs"
          >
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={classNames(
                  tab.current
                    ? "bg-gray-400 font-bold"
                    : "border-transparent text-white hover:border-gray-300 hover:text-gray-700",
                  "group inline-flex items-center py-4 px-1 text-sm sm:text-lg font-medium flex-col"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                <tab.icon
                  className={classNames(
                    tab.current ? "" : "text-white group-hover:text-gray-500",
                    "-ml-0.5 mr-2 h-5 w-5"
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {props.children}
    </div>
  );
}
