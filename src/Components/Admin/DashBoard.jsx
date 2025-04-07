import {
  ArrowRightIcon,
  ArrowsRightLeftIcon,
  TrophyIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import React from "react";
const people = [
  {
    name: "Teams",
    icon: UserGroupIcon,
    lastSeen: "3h ago",
    href: "/admin/teams",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Matches",
    icon: ArrowsRightLeftIcon,
    lastSeen: "3h ago",
    href: "/admin/matches",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Tournament",
    icon: TrophyIcon,
    lastSeen: null,
    href: "/admin/tournament",
  },
];

export default function AdminDashboard() {
  return (
    <ul role="list" className="max-w-2xl mx-auto space-y-4 py-8 px-4">
      {people.map((person) => (
        <a
          href={person.href}
          key={person.email}
          className="flex items-center gap-x-6 p-4 rounded-xl transition-all duration-300 
              hover:bg-gray-800/50 hover:scale-102 hover:shadow-lg hover:shadow-gray-800/30
              bg-gray-900/50 bg-gray-800"
        >
          <div className="flex items-center gap-x-4">
            <div className="relative">
              <person.icon
                className="size-12 rounded-lg p-2.5 text-gray-100
                    bg-gradient-to-br from-gray-700 to-gray-800 
                    shadow-inner shadow-gray-950/50"
              />
              <div className="absolute inset-0 rounded-lg bg-gray-400/10 backdrop-blur-sm -z-10" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-100 tracking-wide">
                {person.name}
              </p>
              <p className="text-sm text-gray-400 mt-0.5">
                Manage {person.name.toLowerCase()}
              </p>
            </div>
            <div>
              <ArrowRightIcon className="size-4 text-gray-400" />
            </div>
          </div>
        </a>
      ))}
    </ul>
  );
}
