import React from "react";
import { useGetBetHistoryByMatchIdQuery } from "../../../../app/Services/betHistory";
import { Link, useParams } from "react-router-dom";
import { useGetMatchQuestionsQuery } from "../../../../app/Services/matchesApi";
import Loader from "../../../../Components/Loader";
import BackButton from "../../../../Components/BackButton";

function MatchHistory() {
  const { matchId } = useParams();
  const {
    data: matchBetResponse,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
  } = useGetBetHistoryByMatchIdQuery(matchId);
  const {
    data: questions,
    isLoading: isQuestionsLoading,
    isError: isQuestionsError,
  } = useGetMatchQuestionsQuery(matchId);

  if (isHistoryLoading || isQuestionsLoading) {
    return <Loader />;
  }

  if (isHistoryError || isQuestionsError) {
    return (
      <div className="mx-auto mt-6 w-full max-w-5xl rounded-2xl border border-red-400/35 bg-red-900/20 p-6 text-left text-red-200">
        Could not load this match history right now.
      </div>
    );
  }

  const matchBet = matchBetResponse?.matchBet;
  const questionList = questions?.questions || [];

  const statusClasses = {
    Won: "border-emerald-400/35 bg-emerald-500/15 text-emerald-200",
    Pending: "border-zinc-400/35 bg-zinc-500/15 text-zinc-200",
    Void: "border-zinc-400/35 bg-zinc-500/15 text-zinc-200",
    Lost: "border-red-400/35 bg-red-500/15 text-red-200",
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-24 pt-5 sm:px-6">
      <div className="rounded-2xl border border-[#f8d06f]/20 bg-[linear-gradient(160deg,#071522_0%,#0b2338_60%,#091927_100%)] p-5 shadow-[0_18px_36px_rgba(0,0,0,0.34)] sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <BackButton />
          {matchBet?.can_bet == "1" && (
            <Link
              to={`/matches/${matchId}`}
              className="inline-flex rounded-full border border-[#f8d06f]/35 bg-[#0f2a42] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#f3db9e] transition hover:border-[#f8d06f] hover:bg-[#173c5d]"
            >
              Edit Bets
            </Link>
          )}
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f8d06f]">
          Match Bet History
        </p>
        <h1 className="mt-2 text-left text-2xl font-black uppercase tracking-[0.02em] text-[#fff2cf] sm:text-3xl">
          {matchBet?.match_title}
        </h1>
        <p className="mt-2 text-sm text-[#cad4e4]">
          Total Rewards:{" "}
          <span className="font-bold text-[#f3db9e]">
            {matchBet?.can_show_points == "1"
              ? matchBet?.points
              : "Not Processed..."}
          </span>
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {questionList.map((question) => {
          const bet = matchBet?.answers?.[question.id];
          const selectedOption = question.options?.find(
            (opt) => opt.id == bet?.option
          );
          const correctOption = question.options?.find(
            (opt) => opt.id == question.correct_option
          );
          const status = question.correct_option
            ? question.correct_option == bet?.option
              ? "Won"
              : "Lost"
            : "Pending";
          const isVoid = correctOption?.option == "void";

          if (!selectedOption) return null;

          return (
            <article
              key={question.id}
              className="overflow-hidden rounded-2xl border border-[#f8d06f]/20 bg-[linear-gradient(150deg,#071521_0%,#0b2236_55%,#081826_100%)] shadow-[0_16px_30px_rgba(0,0,0,0.3)]"
            >
              <div className="border-b border-[#f8d06f]/15 px-5 py-4">
                <h2 className="text-left text-lg font-semibold text-[#f4eacb]">
                  {question.question}
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#d4deee] sm:gap-4 sm:text-sm">
                  <span>
                    Odd:{" "}
                    <span className="font-semibold text-[#f3db9e]">
                      {selectedOption?.odds}
                    </span>
                  </span>
                  <span>
                    Bet Amount:{" "}
                    <span className="font-semibold text-[#f3db9e]">
                      {bet?.amount}
                    </span>
                  </span>
                </div>
              </div>

              <div className="space-y-3 px-5 py-4 text-sm text-[#ced9ea]">
                <div className="flex items-start justify-between gap-4">
                  <span>Bet placed on</span>
                  <span className="text-right font-medium text-[#f5dfaa]">
                    {selectedOption?.option || "Not Placed"}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span>Right Bet</span>
                  <span className="text-right font-medium text-[#f5dfaa]">
                    {correctOption?.option || "- - -"}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span>Bet Status</span>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${
                      isVoid ? statusClasses.Void : statusClasses[status]
                    }`}
                  >
                    {isVoid ? "Void" : status}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default MatchHistory;
