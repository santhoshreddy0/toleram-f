import React from "react";

const BettingHistory = ({ allBets }) => {
  return (
    <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6 shadow">
      <h3 className="tracking-tight text-gray-100 text-left sm:text-xl mb-4">
        Betting History
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-900 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              <th className="px-6 py-3 rounded-tl-lg">Type</th>
              <th className="px-6 py-3">Question</th>
              <th className="px-6 py-3">Selected Option</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Odds</th>
              <th className="px-6 py-3 rounded-tr-lg">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {allBets.map((bet, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}
              >
                <td className="px-6 py-4 tracking-tight">
                  <span className="bg-indigo-900 text-indigo-300 px-2 py-1 rounded text-xs">
                    {bet.type}
                  </span>
                </td>
                <td className="px-6 py-4 tracking-tight">{bet.question}</td>
                <td className="px-6 py-4 tracking-tight">
                  {bet.selectedOption}
                </td>
                <td className="px-6 py-4 tracking-tight">
                  {bet.betAmount.toLocaleString()}
                </td>
                <td className="px-6 py-4 tracking-tight">{bet.odds}</td>
                <td className="px-6 py-4 tracking-tight">
                  {bet.result === "Won" ? (
                    <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs flex items-center w-16">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                      Won
                    </span>
                  ) : bet.result === "Lost" ? (
                    <span className="bg-red-900 text-red-300 px-2 py-1 rounded text-xs flex items-center w-16">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                      Lost
                    </span>
                  ) : (
                    <span className="bg-yellow-900 text-yellow-300 px-2 py-1 rounded text-xs flex items-center w-16">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      NA
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BettingHistory;
