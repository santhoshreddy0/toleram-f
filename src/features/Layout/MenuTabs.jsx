import React, { useEffect, useState } from "react";
import {
  BuildingOfficeIcon,
  CreditCardIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import { Link, matchPath } from "react-router-dom";

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
        location.pathname.includes("matches") || location.pathname == "/",
    },
    {
      name: "Rounds",
      href: "/rounds",
      icon: BuildingOfficeIcon,
      current: location.pathname.includes("rounds"),
    },
    {
      name: "Best Players",
      href: "/players",
      icon: UsersIcon,
      current: location.pathname.includes("players"),
    },
    {
      name: "Bet History",
      href: "/history",
      icon: UsersIcon,
      current: location.pathname.includes("history"),
    },
  ];

  return (
    <div>
      <div className=" text-white text-lg">
        <div className=" ">
          <nav
            className=" grid grid-cols-3 bg-gray-800 gap-0"
            aria-label="Tabs"
          >
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={classNames(
                  tab.current
                    ? "bg-wh bg-gray-400 font-bold"
                    : "border-transparent text-White hover:border-gray-300 hover:text-gray-700",
                  "group inline-flex items-center border-b-0 py-4 px-1 font-medium flex-col",
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                <tab.icon
                  className={classNames(
                    tab.current ? "" : "text-white group-hover:text-gray-500",
                    "-ml-0.5 mr-2 h-5 w-5",
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
