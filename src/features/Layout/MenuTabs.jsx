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
            current: location.pathname.includes("matches"),
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
    ];

    return (
        <div>
            <div className="text-white text-lg bg-gray-900">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex justify-evenly" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.name}
                                to={tab.href}
                                className={classNames(
                                    tab.current
                                        ? "border-red-600 text-red-600 bg-wh"
                                        : "border-transparent text-White hover:border-gray-300 hover:text-gray-700",
                                    "group inline-flex items-center border-b-4 py-4 px-1 font-medium flex-col"
                                )}
                                aria-current={tab.current ? "page" : undefined}
                            >
                                <tab.icon
                                    className={classNames(
                                        tab.current
                                            ? "text-red-600"
                                            : "text-white group-hover:text-gray-500",
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
