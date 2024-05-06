import React from "react";
import { useGetMatchesQuery } from "../../../app/Services/matchesApi";
import Loader from "../../../Components/Loader";

function NewMatches() {
  const { data: matches, isLoading, isError } = useGetMatchesQuery();

  if (isLoading) {
    return <Loader />;
  }
  const formatDateTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);
    const formattedDate = dateTime.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const formattedTime = dateTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate} ${formattedTime}`;
  };
  const filteredMatches = matches.matches.filter(
    (match) => match.can_show === "1"
  );
  console.log(filteredMatches);
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMatches?.map((match) => (
                  <tr key={match.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 lg:pl-8">
                      <div className="font-medium capitalize">
                        {match.match_title}
                      </div>
                      <div>{formatDateTime(match.match_time)}</div>

                      <div className="font-medium capitalize">
                        <img
                          className="inline-block h-32 w-24 rounded-full"
                          src={match.team_one_logo}
                          alt=""
                        />
                        X
                        <img
                          className="inline-block h-32 w-24 rounded-full"
                          src={match.team_two_logo}
                          alt=""
                        />
                        <br />
                        {match.team_one_name} <br />
                        Vs
                        <br /> {match.team_two_name}
                      </div>

                      <div className="font-medium">
                        <br />
                        {/* {teams[match.team_two]?.name} */}
                      </div>
                      <br />
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8"></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* large */}
            <table className="hidden md:inline-block  divide-y divide-gray-300">
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
                {filteredMatches.map((match) => (
                    <tr key={match.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                      {match.match_title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {match.team_one_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {match.team_two_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {formatDateTime(match.match_start_time)}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                        
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

export default NewMatches;
