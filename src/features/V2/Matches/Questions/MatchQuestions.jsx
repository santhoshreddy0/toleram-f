import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../../../Components/Loader";
import {
  useGetMatchBetsQuery,
  useGetMatchQuestionsQuery,
  useUpdateMatchBetsMutation,
} from "../../../../app/Services/matchesApi";
import AllQuestions from "../../../../Components/AllQuestions";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";

function MatchQuestions() {
  const navigate = useNavigate();
  const { matchId } = useParams();
  const {
    data: questions,
    isLoading,
    isError,
  } = useGetMatchQuestionsQuery(matchId);

  const {
    data: bets,
    isLoading: betsLoading,
    isError: betsError,
  } = useGetMatchBetsQuery(matchId);

  const [
    updateMatchBets,
    { isLoading: updateMatchBetsLoading, isError: updateMatchBetsError },
  ] = useUpdateMatchBetsMutation();

  const [formData, setFormData] = useState(bets ? bets?.bets : {});

  const onSubmit = async () => {
    const highestCanBet = import.meta.env.VITE_REACT_APP_TOTAL_AMOUNT;
    let totalAmount = 0;
    Object.keys(formData)?.map((key) => {
      totalAmount += parseInt(formData[key].amount);
    });
    if (totalAmount > highestCanBet) {
      alert("You can't bet more than " + highestCanBet);
      return;
    }
    if (totalAmount == 0) {
      alert("You can't bet 0");
      return;
    }
    try {
      const res = await updateMatchBets({
        matchId,
        data: {
          bets: formData,
        },
      }).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (bets) {
      const newBets = {};
      const existingBets = bets?.bets;
      Object.keys(existingBets)?.map((key) => {
        if (
          existingBets?.[key]?.option != null &&
          existingBets?.[key]?.amount != 0
        ) {
          newBets[key] = existingBets[key];
        }
      });

      setFormData(newBets);
    }
  }, [bets]);

  if (isLoading || betsLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="max-w-3xl text-base leading-7  rounded bg-gray-900 h-screen md:max-w-7xl w-screen mx-auto">
        <div className="flex justify-start">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex text-xs items-start gap-x-1.5 rounded-md  px-1.5 py-3 text-2xl font-medium border m-3 "
          >
            Back
          </button>
        </div>
        {/* <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Match Questions:
        </h1> */}
        <AllQuestions
          questions={questions}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
}

export default MatchQuestions;
