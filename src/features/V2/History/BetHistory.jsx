import React from "react";
import { useGetBetHistoryQuery } from "../../../app/Services/betHistory";

function BetHistory() {
  const { data: betHistory, isLoading, isError } = useGetBetHistoryQuery();
  console.log(betHistory)
  return <div>BetHistory</div>;
}

export default BetHistory;
