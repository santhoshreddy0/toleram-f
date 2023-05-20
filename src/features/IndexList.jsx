const people = [
  {
    name: "Matches",
    email: "leslie.alexander@example.com",
    link: "/matches",
  },
  {
    name: "Winners",
    email: "michael.foster@example.com",
    link: "/winners",
  },
  // {
  //   name: "Top Players",
  //   email: "dries.vincent@example.com",
  //   link: "/players",
  // },
];

import React from "react";
import { Link } from "react-router-dom";
import Matches from "./Matches";
export default function IndexList() {
  return (
    <>
    <ul role="list" className="md:hidden divide-y divide-gray-100 mt-16">
      {people.map((person) => (
        <Link to={`${person?.link}`}>
          <li
            key={person.email}
            className="justify-between gap-x-6 py-5 mx-auto"
          >
            <div className="gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900 text-center">
                  {person.name}
                </p>
                {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p> */}
              </div>
            </div>
          </li>
        </Link>
      ))}
      
    </ul>
    <div className="hidden md:block">
        <Matches/>
      </div>
    </>
  );
}
