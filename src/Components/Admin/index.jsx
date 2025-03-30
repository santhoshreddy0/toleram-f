import { ArrowsRightLeftIcon, TrophyIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import React from "react";
const people = [
    {
      name: 'Teams',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      icon: UserGroupIcon,
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      href: '/admin/teams',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Matches',
      email: 'michael.foster@example.com',
      role: 'Co-Founder / CTO',
      icon: ArrowsRightLeftIcon,
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      href: '/admin/matches',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Tournament',
      email: 'dries.vincent@example.com',
      role: 'Business Relations',
      icon: TrophyIcon,
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
      href: '/admin/tournament',
    }
  ]
  
  export default function AdminDashboard() {
    return (
      <ul role="list" className="divide-y divide-gray-100">
        {people.map((person) => (
          <a href={person.href} key={person.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <person.icon className="size-12 flex-none rounded-full p-2 bg-gray-500" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-100">{person.name}</p>
                <p className="mt-1 truncate text-xs/5 text-gray-500">{person.email}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm/6 text-gray-900">{person.role}</p>
              {person.lastSeen ? (
                <p className="mt-1 text-xs/5 text-gray-500">
                  Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="size-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs/5 text-gray-500">Online</p>
                </div>
              )}
            </div>
          </a>
        ))}
      </ul>
    )
  }
  