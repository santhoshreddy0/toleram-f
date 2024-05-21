import React from "react";
import { useGetBetHistoryByMatchIdQuery } from "../../../../app/Services/betHistory";
import { Link, useParams } from "react-router-dom";
import { useGetMatchQuestionsQuery } from "../../../../app/Services/matchesApi";
import Loader from "../../../../Components/Loader";
import BetsList from "../../../../Components/BetsList";

function MatchHistory() {
  const { matchId } = useParams();
  const {
    data: matchBet,
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
  return (
    <BetsList
      data={matchBet?.matchBet}
      questions={questions}
      editLink={`/matches/${matchId}`}
    />
  );
}

export default MatchHistory;
