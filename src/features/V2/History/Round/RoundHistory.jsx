import React from "react";
import { useGetBetHistoryByRoundIdQuery } from "../../../../app/Services/betHistory";
import { useGetPlayerQuestionsQuery } from "../../../../app/Services/playersApi";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../../Components/Loader";

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

  if (isHistoryLoading || isQuestionsLoading) {
    return <Loader />;
  }

  if (isHistoryError || isQuestionsError) {
    return <div>Error occurred</div>;
  }

  return (
    <div className="p-4 relative">
      <h1 className="text-2xl font-bold mb-4">Round History</h1>
      {history?.roundBet?.can_bet === "1" ? (
        questions.questions.map((question) => {
          const answer = history.roundBet.answers[question.id];
          return (
            <div
              key={question.id}
              className="p-4 border border-gray-300 rounded-lg mb-4"
            >
              <h2 className="text-xl font-bold mb-2">
                {question.id}.{question.question}
              </h2>
              <p className="mb-2">Your answer: {answer?.option}</p>
              <p className="mb-2">Amount: {answer?.amount}</p>
              {question.options.map((option) => (
                <p key={option.id} className="ml-2">
                  {option.option} (Odds: {option?.odds})
                </p>
              ))}
            </div>
          );
        })
      ) : (
        <p className="text-lg">Nothing is there in history</p>
      )}
      {history?.roundBet?.can_bet === "1" && (
        <Link
          to="/rounds/:roundId"
          className="absolute top-0 right-0 mt-4 mr-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Edit
        </Link>
      )}
    </div>
  );
}

export default RoundHistory;
