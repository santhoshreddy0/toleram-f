import React, { useEffect, useState } from "react";
// import { matches } from '../Data/matches.js'
import { useGetMatchesQuery } from "../app/Services/matchesApi.js";
import Loader from "../Components/Loader.jsx";
import { teams } from "../Data/teams.js";
import moment from "moment";
import { Link } from "react-router-dom";
import { useGetBetsQuery } from "../app/Services/betsApi.js";
import Betpopup from "./BetsPopup.jsx";
import BetForm from "./betform.jsx";
function Matches() {
  const { data: matches, isLoading, isError } = useGetMatchesQuery();
  const { data: bets, isLoading: isBetsLoading } = useGetBetsQuery();
  const [betsMap, setBetsMap] = useState(new Map());

  const [matchData, setMatchData] = useState({
    show: false,
    isEdit: false,
    team_one: "",
    match_id: "",
    team_two: "",
    match_title: "",
  });
  const resetState = () => {
    setMatchData({
      show: false,
      isEdit: false,
      team_one: "",
      match_id: "",
      team_two: "",
      match_title: "",
    });
  };
  useEffect(() => {
    if (bets && bets.userBets) {
      const map = new Map();
      bets.userBets.map((b) => {
        map.set(b["match_id"], b);
      });
      setBetsMap(map);
    }
  }, [isBetsLoading, bets]);

  const popUpHandler = (match) => {
    if (betsMap.has(match.id)) {
      setMatchData({
        show: true,
        isEdit: true,
        match_id: match.id,
        team_one: match.team_one,
        team_two: match.team_two,
        title: match.match_title,
        questions: JSON.parse(match.questions),
      });
    } else {
      setMatchData({
        show: true,
        isEdit: false,
        match_id: match.id,
        team_one: match.team_one,
        team_two: match.team_two,
        title: match.match_title,
        questions: JSON.parse(match.questions),
      });
    }
  };

  const getDate = (date) => {
    const d = moment(date).format("MMMM Do, h:mm a");
    return d;
  };

  if (isLoading) return <Loader />;
  else if (isError) return <div>Unable load matches</div>;
  else if (matchData.show) {
    return (
      <>
        <BetForm matchData={matchData} resetState={resetState} allBets={bets} />
      </>
    );
  }
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
                        <div className="font-medium capitalize">
                          {match.match_title}
                        </div>
                        <div>{getDate(match.match_start_time)}</div>

                        <div className="font-medium capitalize">
                          <img
                            className="inline-block h-32 w-24 rounded-full"
                            src={teams[match.team_one]?.image}
                            alt=""
                          />
                          X
                          <img
                            className="inline-block h-32 w-24 rounded-full"
                            src={teams[match.team_two]?.image}
                            alt=""
                          />
                          <br />
                          {teams[match.team_one]?.name} <br />
                          Vs
                          <br /> {teams[match.team_two]?.name}
                        </div>

                        <div className="font-medium">
                          <br />
                          {/* {teams[match.team_two]?.name} */}
                        </div>
                        <br />
                        <button
                          type="button"
                          onClick={() => popUpHandler(match)}
                          className={`w-32 rounded-md ${
                            betsMap.has(match?.id)
                              ? "bg-gray-700 "
                              : "bg-indigo-600 "
                          } px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                        >
                          {betsMap.has(match.id) ? " Edit bet " : " Bet "}
                        </button>
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
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                        {match?.status == "1" && (
                          <button
                            type="button"
                            onClick={() => popUpHandler(match)}
                            className={`w-32 rounded-md ${
                              betsMap.has(match?.id)
                                ? "bg-gray-700 "
                                : "bg-indigo-600 "
                            } px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                          >
                            {betsMap.has(match.id) ? " Edit bet" : "      Bet "}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* {matchData.show && (
        <Betpopup
          matchData={matchData}
          resetState={resetState}
          allBets={bets}
        />
      )} */}
    </div>
  );
}

export default Matches;
