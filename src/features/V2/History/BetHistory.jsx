import React from "react";
import { useGetBetHistoryQuery } from "../../../app/Services/betHistory";
import { Link } from "react-router-dom";
import Loader from "../../../Components/Loader";

function BetHistory() {
  const { data: betHistory, isLoading, isError } = useGetBetHistoryQuery();
  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading bet history</div>;

  const { matchBets, roundBets, betPlayerBets } = betHistory.bets;

  return (
    <div className="max-w-7xl mx-auto py-2 sm:px-2 lg:px-8">
      <div className="px-4 py-2 sm:px-0">
        <h2 className="text-2xl font-semibold bg-green-500 rounded-lg shadow text-gray-900">
          Match Bets
        </h2>
        <div className="mt-2 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {matchBets.map((bet) => (
            <Link to={`/history/matches/${bet.match_id}`} key={bet.match_id}>
              <div className="p-4 shadow mt-2 cursor-pointer rounded-xl border border-gray-200 bg-gray-600">
                <h3 className="text-lg leading-6 font-medium text-white">
                  {bet.match_title}
                </h3>
                <p className="mt-4 text-white">Points: {bet.points}</p>
                <p className="text-white mt-4">View Details</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-4 py-2 sm:px-0">
        <h2 className="text-2xl font-semibold bg-green-500 rounded-lg shadow text-gray-900">
          Round Bets
        </h2>
        <div className="mt-2 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {roundBets.map((bet) => (
            <Link to={`/history/rounds/${bet.round_id}`} key={bet.round_id}>
              <div className="p-4 shadow mt-2 cursor-pointer rounded-xl border border-gray-200 bg-gray-600">
                <h3 className="text-lg leading-6 font-medium text-white">
                  {bet.round_name}
                </h3>
                <p className="mt-4 text-white">Points: {bet.points}</p>
                <p className="text-white hover:text-indigo-500 mt-4">
                  View Details
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-4 py-2 sm:px-0">
        <h2 className="text-2xl font-semibold bg-green-500 rounded-lg shadow text-gray-900">
          Player Bets
        </h2>
        <div className="mt-2 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {betPlayerBets.map((bet, index) => (
            <Link to={`/history/bestPlayers`} key={index}>
              <div className="p-4 shadow mt-2 cursor-pointer rounded-xl border border-gray-200 bg-gray-600">
                <h3 className="text-lg leading-6 font-medium text-white">{`Player Bet #${
                  index + 1
                }`}</h3>
                <p className="mt-4 text-white">Points: {bet.points}</p>
                <p className="text-white hover:text-indigo-500 mt-4">
                  View Details
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BetHistory;
