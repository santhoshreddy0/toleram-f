import React from "react";
import BackButton from "../../Components/BackButton";

export default function Dream11ScoringRules() {
  const rulesData = {
    captainRoles: [
      {
        id: 1,
        role: "Captain",
        multiplier: "2×",
        icon: "C",
        bgColor: "bg-green-600",
      },
      {
        id: 2,
        role: "Vice-Captain",
        multiplier: "1.5×",
        icon: "VC",
        bgColor: "bg-green-600",
      },
    ],
    categories: [
      {
        id: 1,
        name: "Batting Points",
        points: [
          { id: 1, action: "Run Scored", value: "+1" },
          { id: 2, action: "Six (6)", value: "+2" },
        ],
      },
      {
        id: 2,
        name: "Bowling Points",
        points: [
          { id: 1, action: "Wicket", value: "+15" },
          { id: 2, action: "Maiden Over", value: "+5" },
        ],
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 bg-gray-900 rounded-lg shadow-md overflow-hidden text-sm">
      <div className="bg-green-600 px-4 py-3 m-2">
        <h1 className="font-bold text-white">Super12 Scoring Rules</h1>
      </div>

      <div className="p-3 space-y-4">
        <div className="space-y-2 text-gray-200">
          <h2 className="text-md font-bold text-gray-100">Super12</h2>
          <ul className="list-disc pl-4 space-y-1 text-sm">
            <li>
              Missed the chance to become an owner? No problem, we’ve got you
              covered.
            </li>
            <li>
              You can now create your own team of superheroes from the player
              pool under the Super12 section of{" "}
              <a
                href="https://tplmania.org"
                className="underline text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                tplmania.org
              </a>
              .
            </li>
            <li>
              We also have a live leaderboard section that will let you know
              who’s the BOSS.
            </li>
            <li>
              <strong>Hurry up!</strong> Team entry window will close by{" "}
              <strong>8th May, 8 am</strong>.
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-md font-bold text-gray-100 pb-1">
            Captain & Vice-Captain
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {rulesData.captainRoles.map((role) => (
              <div key={role.id} className="bg-gray-800 p-2 rounded-lg">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 ${role.bgColor} rounded-full flex items-center justify-center`}
                  >
                    <span className="text-white text-sm font-bold">
                      {role.icon}
                    </span>
                  </div>
                  <div className="ml-2">
                    <h3 className="font-bold text-sm">{role.role}</h3>
                    <p className="text-gray-200 text-xs mt-1">
                      {role.multiplier} Points
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {rulesData.categories.map((category) => (
          <div key={category.id} className="space-y-2">
            <h2 className="text-md font-bold text-gray-100">{category.name}</h2>
            <div className="overflow-hidden rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-100 uppercase tracking-wider">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-300">
                  {category.points.map((point) => (
                    <tr key={point.id}>
                      <td className="px-3 py-2 text-left text-xs text-gray-200">
                        {point.action}
                      </td>
                      <td className="px-3 py-2 text-right text-xs text-gray-200">
                        {point.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <div className="space-y-3 text-gray-200">
          <h2 className="text-md font-bold text-gray-100">General Rules</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Fixed bet amount: 50k NGN</li>
            <li>Select 10 male + 2 female players within 100 credits.</li>
            <li>Bets are frozen before the first match starts.</li>
            <li>Do not share credentials. Finalized bets cannot be changed.</li>
          </ul>

          <h2 className="text-md font-bold text-gray-100 pt-2">
            Team Composition
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Minimum 3 to maximum 5 Batsmen</li>
            <li>Minimum 2 to maximum 4 Allrounders</li>
            <li>Minimum 3 to maximum 5 Bowlers</li>
            <li>Exactly 2 Female Players</li>
          </ul>

          <h2 className="text-md font-bold text-gray-100 pt-2">
            Prize Distribution
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Rank 1: 1 Million NGN</li>
            <li>Rank 2: 500k NGN</li>
            <li>Rank 3: 250k NGN</li>
            <li>Ranks 4–8: 50k NGN each</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
