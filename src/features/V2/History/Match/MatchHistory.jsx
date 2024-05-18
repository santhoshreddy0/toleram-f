import React from "react";
import { useGetBetHistoryByMatchIdQuery } from "../../../../app/Services/betHistory";
import { useGetPlayerQuestionsQuery } from "../../../../app/Services/playersApi";

function MatchHistory() {
  const { matchId } = useParams();
  const {
    data: history,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
  } = useGetBetHistoryByMatchIdQuery();
  const {
    data: questions,
    isLoading: isQuestionsLoading,
    isError: isQuestionsError,
  } = useGetPlayerQuestionsQuery();

  return <div>MatchHistory</div>;
}

export default MatchHistory;
