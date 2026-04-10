import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../../Components/Loader";
import {
  useGetMatchBetsQuery,
  useGetMatchQuery,
  useGetMatchQuestionsQuery,
  useUpdateMatchBetsMutation,
} from "../../../../app/Services/matchesApi";
import AllQuestions from "../../../../Components/AllQuestions";
import { toast } from "react-toastify";

function MatchQuestions() {
  const { matchId } = useParams();
  const {
    data: questions,
    isLoading,
    isError,
  } = useGetMatchQuestionsQuery(matchId);
  const { data: match } = useGetMatchQuery(matchId);

  const {
    data: bets,
    isLoading: betsLoading,
    isError: betsError,
  } = useGetMatchBetsQuery(matchId);

  const [
    updateMatchBets,
    {
      isLoading: updateMatchBetsLoading,
      isError: updateMatchBetsError,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdateMatchBetsMutation();

  const [formData, setFormData] = useState(bets ? bets?.bets : {});
  const [show, setShow] = useState(false);
  const highestCanBet = match?.match?.max_bet_amount;

  const onSubmit = async () => {
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
      toast.success(res?.message);
      console.log(res);
    } catch (error) {
      toast.error(error?.data?.message);
      console.log(error);
    }
    setShow(false);
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
    <section className="rounded-2xl border border-[#f8d06f]/20 bg-[linear-gradient(160deg,#071522_0%,#0b2338_60%,#091927_100%)] p-4 shadow-[0_14px_28px_rgba(0,0,0,0.25)] sm:p-5">
      <div className="mb-4 rounded-xl border border-[#f8d06f]/15 bg-[#06111d]/80 px-4 py-3 text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f8d06f]">
          Match Questions
        </p>
        <p className="mt-1 text-sm text-[#cad4e4]">
          Place your predictions carefully. Total bet limit:{" "}
          <span className="font-bold text-[#f3db9e]">
            {highestCanBet ?? "--"}
          </span>
        </p>
      </div>
      <AllQuestions
        questions={questions}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        show={show}
        setShow={setShow}
        totalBetAllowed={highestCanBet}
      />
    </section>
  );
}

export default MatchQuestions;
