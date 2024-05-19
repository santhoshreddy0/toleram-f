import React from "react";
import { useGetBetHistoryByMatchIdQuery } from "../../../../app/Services/betHistory";
import { Link, useParams } from "react-router-dom";
import { useGetMatchQuestionsQuery } from "../../../../app/Services/matchesApi";
import Loader from "../../../../Components/Loader";
import { CheckCircleIcon, CircleStackIcon, XCircleIcon } from "@heroicons/react/24/solid";


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


console.log(matchBet)
console.log(questions)
if(isHistoryLoading || isQuestionsLoading) {
  return <Loader/>
}
return (
  <div className="flex flex-col justify-between p-4 m-2">
    <div className="flex flex-row justify-between">
      {matchBet?.matchBet?.can_bet === "1" && (
        <div className="text-right">
          <Link to={`/matches/${matchId}`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            Edit
          </Link>
        </div>
      )}
    </div>
    {
      questions?.questions?.map((question) => {
        const bet = matchBet?.matchBet?.answers[question.id];
        const correct = question.correct_option == bet.option;
        const profit = correct ? bet.amount * question.options.find(opt => opt.id === bet.option)?.odds : 0;
        
        return (
          <div key={question.id} className="p-4 border border-gray-300 rounded-lg mb-4 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-2 ">{question.question}</h2>
            { bet.option ? (
              <>
              { !!question.correct_option  ? 
                <div>
                <p className="mb-1">Correct answer:
                    {question.options
                    .find((option) => option.id == question.correct_option)?.option}
                </p>
                <p className="mb-1">Your answer:
                {question.options
                .filter(option => option.id === bet.option)
                  .map((option) => (
                  <span key={option.id} className="ml-2">
                    {option.option}
                    {question.correct_option == option.id && <CheckCircleIcon className="h-5 w-5 text-green-500 inline ml-2"/>}
                    {bet.option == option.id && question.correct_option != option.id && <XCircleIcon className="h-5 w-5 text-red-500 inline ml-2"/>}
                  </span>
                  ))
                }
                </p>
                <p className="h-5 w-5 text-green-500 inline mr-2">Amount invested: {bet.amount}</p>
              </div>
              :
              <>
                <p className="mb-1">Your answer:
                  {question.options
                  .filter(option => option.id === bet.option)
                  .map((option) => (
                  <span key={option.id} className="ml-2">
                    {option.option}
                  </span>
                  ))
                  }
                </p>
                <p className="h-5 w-5 text-green-500 inline mr-2">Amount invested: {bet.amount}</p>
              </> 
              }
             </>
            )
            : "you didn't choose any bet on this"
            }
          </div>
        );
      })
    }
  </div>
);
}

export default MatchHistory;
