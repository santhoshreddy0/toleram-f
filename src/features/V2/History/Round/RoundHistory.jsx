import React from "react";
import { useGetBetHistoryByRoundIdQuery } from "../../../../app/Services/betHistory";
import { useGetPlayerQuestionsQuery } from "../../../../app/Services/playersApi";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../../Components/Loader";
import BetsList from "../../../../Components/BetsList";
import { useGetRoundQuestionsQuery } from "../../../../app/Services/roundsApi";

function RoundHistory() {
  const { roundId } = useParams();
  const {
    data: history,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
  } = useGetBetHistoryByRoundIdQuery(roundId);
  const {
    data: questions,
    isLoading: isQuestionsLoading,
    isError: isQuestionsError,
  } = useGetRoundQuestionsQuery(roundId);

  if (isHistoryLoading || isQuestionsLoading) {
    return <Loader />;
  }

  if (isHistoryError || isQuestionsError) {
    return <div>Error occurred</div>;
  }

  return (
    <BetsList
      data={history?.roundBet}
      questions={questions}
      editLink={`/round/${roundId}`}
    />
  );
}

export default RoundHistory;
