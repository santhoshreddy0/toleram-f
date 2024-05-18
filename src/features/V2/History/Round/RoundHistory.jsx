import React from "react";
import { useGetBetHistoryByRoundIdQuery } from "../../../../app/Services/betHistory";
import { useGetPlayerQuestionsQuery } from "../../../../app/Services/playersApi";

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
  } = useGetPlayerQuestionsQuery();
  
  return <div>RoundHistory</div>;
}

export default RoundHistory;
