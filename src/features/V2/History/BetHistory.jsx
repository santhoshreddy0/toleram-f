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
    <div className="p-4 bg-gray-800 text-white">
      <h2 className="text-2xl mb-4">Match Bets</h2>
      <ul className="space-y-4">
        {matchBets.map((bet) => (
          <li key={bet.match_id} className="p-4 bg-gray-700 rounded">
            <Link to={`/history/matches/${bet.match_id}`}>
              <h3 className="text-xl">{bet.match_title}</h3>
              <p className="text-gray-300">{`Points: ${bet.points}`}</p>
              <div
                to={`/history/matches/${bet.match_id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl mt-8 mb-4">Round Bets</h2>
      <ul className="space-y-4">
        {roundBets.map((bet) => (
          <li key={bet.round_id} className="p-4 bg-gray-700 rounded">
            <Link to={`/history/rounds/${bet.round_id}`}>
              <h3 className="text-xl">{bet.round_name}</h3>
              <p className="text-gray-300">{`Points: ${bet.points}`}</p>
              <div
                to={`/history/rounds/${bet.round_id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl mt-8 mb-4">Player Bets</h2>
      <ul className="space-y-4">
        {betPlayerBets.map((bet, index) => (
          <li key={index} className="p-4 bg-gray-700 rounded">
            <Link to={`/history/bestPlayers`}>
              <h3 className="text-xl">{`Player Bet #${index + 1}`}</h3>
              <p className="text-gray-300">{`Points: ${bet.points}`}</p>
              <div
                to={`/history/bestPlayers`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BetHistory;
