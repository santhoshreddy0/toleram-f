import React from "react";
import { useGetBetHistoryOfBestPlayersQuery } from "../../../../app/Services/betHistory";
import { useGetPlayerQuestionsQuery } from "../../../../app/Services/playersApi";

function BestPlayersHistory() {
  const {
    data: history,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
  } = useGetBetHistoryOfBestPlayersQuery();
  const {
    data: questions,
    isLoading: isQuestionsLoading,
    isError: isQuestionsError,
  } = useGetPlayerQuestionsQuery();
  return <div>BestPlayersHistory</div>;
}

export default BestPlayersHistory;
