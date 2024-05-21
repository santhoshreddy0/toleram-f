import React from "react";
import { useGetBetHistoryOfBestPlayersQuery } from "../../../../app/Services/betHistory";
import { useGetPlayerQuestionsQuery } from "../../../../app/Services/playersApi";
import { Link } from "react-router-dom";
import Loader from "../../../../Components/Loader";
import BetsList from "../../../../Components/BetsList";

function BestPlayersHistory() {
  const {
    data: matchBet,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
  } = useGetBetHistoryOfBestPlayersQuery();
  const {
    data: questions,
    isLoading: isQuestionsLoading,
    isError: isQuestionsError,
  } = useGetPlayerQuestionsQuery();

  if (isHistoryLoading || isQuestionsLoading) {
    return <Loader />;
  }

  if (isHistoryError || isQuestionsError) {
    return <div>Error occurred</div>;
  }

  return (
    <BetsList
      data={matchBet?.bestPlayerBets}
      questions={questions}
      editLink={`/players`}
    />
  );
}

export default BestPlayersHistory;
