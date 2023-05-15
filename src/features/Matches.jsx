import React from 'react'
import { matches } from '../Data/matches.js'
// console.log(matches);
const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
]
function Matches() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    team1
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    team2
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    Time
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                    <span className="sr-only">Bet</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {matches.map((match) => (
                  <tr key={match.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                      {match.title}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{match.team1}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{match.team2}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{match.start_time}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                      <a href="/bets" className="text-indigo-600 hover:text-indigo-900">
                        Bet<span className="sr-only">, {match.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Matches;