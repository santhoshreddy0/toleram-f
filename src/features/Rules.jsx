import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import React from "react";

export default function Rules() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Match Rules:
        </h1>
        <p className="mt-6 text-xl leading-8"></p>
        <div className="mt-10 max-w-2xl">
          <ul
            role="list"
            className="mt-8 max-w-xl space-y-8 text-gray-600 text-left"
          >
            <li className="flex gap-x-3">
              a. The maximum bet amount allowed per match is 500,000.
            </li>
            <li className="flex gap-x-3">
              b. Your bets will be submitted once you have saved your response.
              You will however be allowed to make edits to your bets before the
              time ends (5 minutes before the toss)
            </li>
            <li className="flex gap-x-3">
              c. Please do not share your user credentials with anyone to ensure
              sanctity of your bets. Bets once finalized will not be cancelled.
            </li>
            <li className="flex gap-x-3">
              d. For example, if you bet 10,000 on the odds of 1.9, your total
              winnings on a favorable outcome would be 10,000 * 1.9 (bet amount
              * odds) = 19,000, resulting in a profit of 9,000..
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Tournament: Winners Rules
        </h1>
        <p className="mt-6 text-xl leading-8"></p>
        <div className="mt-10 max-w-2xl">
          <ul
            role="list"
            className="mt-8 max-w-xl space-y-8 text-gray-600 text-left"
          >
            <li className="flex gap-x-3">
              a.The maximum bet amount allowed per round is 100,000.
            </li>
            <li className="flex gap-x-3">
              b. A maximum of 4 bets will be allowed per individual for the
              outcome of the winners of the tournament. There will be a fresh
              set of odds after each round: Round 1, Eliminators, Semi-finals,
              and finals.
            </li>
            <li className="flex gap-x-3">
              c. The bets for each round will be frozen before the 1st match of
              that round begins.
            </li>
            <li className="flex gap-x-3">
              d. Please do not share your user credentials with anyone to ensure
              sanctity of your bets. Bets once finalized will not be cancelled.
            </li>
            <li className="flex gap-x-3">
              e. For example, if you bet 10,000 on the odds of 1.9, your total
              winnings on a favorable outcome would be 10,000 * 1.9 (bet amount
              * odds) = 19,000, resulting in a profit of 9,000.
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Top Players Rules
        </h1>
        <p className="mt-6 text-xl leading-8"></p>
        <div className="mt-10 max-w-2xl">
          <ul
            role="list"
            className="mt-8 max-w-xl space-y-8 text-gray-600 text-left"
          >
            <li className="flex gap-x-3">
              a.The maximum bet amount allowed for this section is 300,000.
            </li>
            <li className="flex gap-x-3">
              b. Your bets will be submitted once you have saved your response.
              You will however be allowed to make edits to your bets before the
              time ends (5 minutes before the toss of the first match). The bets
              will be frozen before the start of the tournament.
            </li>
            <li className="flex gap-x-3">
              c.Please do not share your user credentials with anyone to ensure
              sanctity of your bets. Bets once finalized will not be cancelled.
            </li>
            <li className="flex gap-x-3">
              d. For example, if you bet 10,000 on the odds of 1.9, your total
              winnings on a favorable outcome would be 10,000 * 1.9 (bet amount
              * odds) = 19,000, resulting in a profit of 9,000.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
