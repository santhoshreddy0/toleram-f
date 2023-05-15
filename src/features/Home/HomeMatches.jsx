import React from "react";
import { useGetMatchesQuery } from "../../app/Services/matchesApi";
import moment from "moment"
import { teams } from "../../Data/teams";

function HomeMatches() {
    const { data: matches, isLoading, isError } = useGetMatchesQuery();
    const getDate = (date) => {
        const d = moment(date).format("h:mm a , MMMM Do");
        return d;
      };
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center"></div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            {/* mobile */}
            <table className="md:hidden min-w-full divide-y divide-gray-300">
              <thead className="">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    Match
                  </th>
                  {/* <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    Match between
                  </th> */}
                  {/* <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    team2
                  </th> */}
                  {/* <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    Time
                  </th> */}
                  {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                    <span className="sr-only">Bet</span>
                  </th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {matches &&
                  matches.matches &&
                  matches?.matches?.map((match) => (
                    <tr key={match.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 lg:pl-8">
                        <div className="font-medium">{match.match_title}</div>
                        <div>{getDate(match.match_start_time)}</div>
                        <br />
                        <div className="font-medium">
                          {teams[match.team_one]?.name}
                        </div>
                        Vs
                        <div className="font-medium">
                          {teams[match.team_two]?.name}
                        </div>
                        <br />
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 line-clamp-2">{teams[match.team_one]?.name +" Vs "+teams[match.team_two]?.name}</td> */}
                      {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{teams[match.team_two]?.name}</td> */}
                      {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{getDate(match.match_start_time)}</td> */}
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8"></td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* large */}
            <table className="hidden md:inline-block max-w-none divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                  >
                    team1
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                  >
                    team2
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
                  >
                    <span className="sr-only">Bet</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {matches &&
                  matches.matches &&
                  matches?.matches?.map((match) => (
                    <tr key={match.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                        {match.match_title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {teams[match.team_one]?.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {teams[match.team_two]?.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {getDate(match.match_start_time)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeMatches;
