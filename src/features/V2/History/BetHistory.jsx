import React from "react";
import { useGetBetHistoryQuery } from "../../../app/Services/betHistory";
import { Link } from "react-router-dom";
import Loader from "../../../Components/Loader";

function BetHistory() {
  const { data: betHistory, isLoading, isError } = useGetBetHistoryQuery();
  if (isLoading) return <Loader />;
  if (isError) {
    return (
      <div className="mx-auto mt-6 w-full max-w-7xl rounded-2xl border border-red-400/35 bg-red-900/20 p-6 text-left text-red-200">
        Error loading bet history.
      </div>
    );
  }

  const { matchBets, roundBets, betPlayerBets } = betHistory.bets;

  if (
    matchBets?.length == 0 &&
    roundBets?.length == 0 &&
    betPlayerBets?.length == 0
  ) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-5 sm:px-6">
        <div className="rounded-2xl border border-[#f8d06f]/20 bg-[linear-gradient(160deg,#071522_0%,#0b2338_60%,#091927_100%)] p-10 text-center shadow-[0_18px_36px_rgba(0,0,0,0.34)]">
          <h1 className="text-3xl font-black uppercase tracking-[0.02em] text-[#fff2cf]">
            No Betting History Yet
          </h1>
          <p className="mt-4 text-[#c6d1e2]">
            Place your first prediction and your match, round, and player
            history will appear here.
          </p>
        </div>
      </div>
    );
  }

  const BetCard = ({ title, points, canShowPoints, link }) => (
    <Link to={link} className="block">
      <div className="group relative overflow-hidden rounded-2xl border border-[#f8d06f]/20 bg-[linear-gradient(150deg,#071521_0%,#0b2236_55%,#081826_100%)] p-5 shadow-[0_16px_32px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#f8d06f]/35 hover:shadow-[0_20px_38px_rgba(0,0,0,0.38)]">
        <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(248,208,111,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(248,208,111,0.04)_1px,transparent_1px)] [background-size:30px_30px]" />

        <h3 className="relative text-lg font-black uppercase tracking-[0.02em] text-[#fff2cf]">
          {title}
        </h3>
        <p className="relative mt-3 text-sm text-[#c9d4e6]">
          Points:{" "}
          <span className="font-bold text-[#f3db9e]">
            {canShowPoints == "1" ? points : "- -"}
          </span>
        </p>
        <p className="relative mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#6ec0ff] transition group-hover:text-[#9ad5ff]">
          View Details →
        </p>
      </div>
    </Link>
  );

  const BetSection = ({ title, bets, renderBet }) => (
    <div className="mt-8">
      <h2 className="mb-4 border-b border-[#f8d06f]/20 pb-3 text-left text-sm font-bold uppercase tracking-[0.2em] text-[#f8d06f]">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {bets.map(renderBet)}
      </div>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-5 sm:px-6">
      {/* <section className="rounded-2xl border border-[#f8d06f]/20 bg-[linear-gradient(155deg,#06111d_0%,#0a1e32_52%,#071420_100%)] px-5 py-6 shadow-[0_18px_36px_rgba(0,0,0,0.34)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f8d06f]">
          V2 Bet History
        </p>
        <h1 className="mt-3 text-left text-3xl font-black uppercase tracking-[0.02em] text-[#fff2cf] sm:text-4xl">
          Track Every Prediction
        </h1>
        <p className="mt-2 max-w-3xl text-left text-sm text-[#cad4e4] sm:text-base">
          Review points from match bets, round bets, and best-player picks in
          one place.
        </p>
      </section> */}

      {matchBets?.length > 0 && (
        <BetSection
          title="Match Bets"
          bets={matchBets}
          renderBet={(bet) => (
            <BetCard
              key={bet.match_id}
              title={bet.match_title}
              points={bet.points}
              canShowPoints={bet.can_show_points}
              link={`/history/matches/${bet.match_id}`}
            />
          )}
        />
      )}

      {roundBets?.length > 0 && (
        <BetSection
          title="Round Bets"
          bets={roundBets}
          renderBet={(bet) => (
            <BetCard
              key={bet.round_id}
              title={bet.round_name}
              points={bet.points}
              canShowPoints={bet.can_show_points}
              link={`/history/rounds/${bet.round_id}`}
            />
          )}
        />
      )}

      {betPlayerBets?.length > 0 && (
        <BetSection
          title="Player Bets"
          bets={betPlayerBets}
          renderBet={(bet, index) => (
            <BetCard
              key={index}
              title="Player Bets"
              points={bet.points}
              canShowPoints={bet.can_show_points}
              link="/history/bestPlayers"
            />
          )}
        />
      )}
    </div>
  );
}

export default BetHistory;
