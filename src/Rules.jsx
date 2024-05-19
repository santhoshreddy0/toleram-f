import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import React from "react";
import BackButton from "./Components/BackButton";

export default function Rules() {
  return (
    <>
      <BackButton />
      <div className=" px-6 py-7 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 ">
          <h1 className=" text-3xl font-bold tracking-tight  sm:text-4xl">
            General Rules:
          </h1>
          <p className="mt-6 text-xl leading-8"></p>
          <div className="mt-10 max-w-2xl">
            <ul role="list" className="mt-8 max-w-xl space-y-8  text-left">
              <li className="flex gap-x-3">
                a. Your bets will be submitted once you have saved your
                response. You will however be allowed to make edits to your bets
                before the time ends (5 minutes before the toss)
              </li>
              <li className="flex gap-x-3">
                b. Please do not share your user credentials with anyone to
                ensure the sanctity of your bets. Bets once finalized will not
                be cancelled.
              </li>
              <li className="flex gap-x-3">
                c. Winning Calculation: For example, if you bet 10,000 on the
                odds of 1.9, your total winnings on a favorable outcome would be
                10,000 * 1.9 (bet amount * odds) = 19,000, resulting in a profit
                of 9,000.
              </li>
              <li className="flex gap-x-3">
                d. Player Odds: There are player odds next to a few named
                players for different events. In case you want to bet on a
                player that is not named on the odds list, the player will fall
                under the other category and will have odds of 6 or 8 (in case
                of tournament bets). However, you will have to select the other
                player from the dropdown list of options.
              </li>
              <li className="flex gap-x-3">
                e. In case of player odds, if you want to bet on a player that
                doesn’t appear on the dropdown list, please try an alternate
                spelling. If you still cannot find the player you want to bet
                on, kindly contact the betting committee representative to place
                the bet directly for that event.
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-3xl text-base leading-7 ">
          <h1 className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl">
            Match Rules:
          </h1>
          <p className="mt-6 text-xl leading-8"></p>
          <div className="mt-10 max-w-2xl">
            <ul role="list" className="mt-8 max-w-xl space-y-8  text-left">
              <li className="flex gap-x-3">
                a. The maximum bet amount allowed per match is 500,000.
              </li>
              <li className="flex gap-x-3">
                b. The link to bet on a match will close 5 minutes before the
                toss of that match.
              </li>
              <li className="flex gap-x-3">
                c. 6s Explanation: For betting on the number of sixes in a
                match, there are two options with respective odds next to them,
                please select the option you think is favorable.
              </li>
              <li>Option A: Over 14.5 – Means 15 or more sixes will be hit</li>
              <li>Option B: Under 12.5 – Means 12 or less sixes will be hit</li>
              <li className="flex gap-x-3">
                d. In case of a super over, the winner of the super over will be
                declared the winner of the match for the purpose of betting.
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-3xl text-base leading-7 ">
          <h1 className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl">
            Tournament: Winners Rules
          </h1>
          <p className="mt-6 text-xl leading-8"></p>
          <div className="mt-10 max-w-2xl">
            <ul role="list" className="mt-8 max-w-xl space-y-8  text-left">
              <li className="flex gap-x-3">
                a. The maximum bet amount allowed per round is 100,000.
              </li>
              <li className="flex gap-x-3">
                b. A maximum of 2 bets will be allowed per individual for the
                outcome of the winners of the tournament. There will be a fresh
                set of odds before Round 1 and Semi-finals.
              </li>
              <li className="flex gap-x-3">
                c. The bets for each round will be frozen before the 1st match
                of that round begins.
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-3xl text-base leading-7 ">
          <h1 className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl">
            Tournament: Top Players Rules
          </h1>
          <p className="mt-6 text-xl leading-8"></p>
          <div className="mt-10 max-w-2xl">
            <ul role="list" className="mt-8 max-w-xl space-y-8  text-left">
              <li className="flex gap-x-3">
                a. The maximum bet amount allowed for this section is 300,000.
              </li>
              <li className="flex gap-x-3">
                b. The bets will be frozen before the start of the tournament.
              </li>
              <li className="flex gap-x-3">
                c. In case of player odds, if you want to bet on a player that
                doesn’t appear on the dropdown list, please try an alternate
                spelling. If you still cannot find the player you want to bet
                for, kindly contact the betting committee representative to
                place the bet directly for that event.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
