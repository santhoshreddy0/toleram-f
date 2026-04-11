import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetRoundBetsQuery,
  useGetRoundQuestionsQuery,
  useGetRoundQuery,
  useUpdateRoundBetsMutation,
} from "../../../../app/Services/roundsApi";
import Loader from "../../../../Components/Loader";
import AllQuestions from "../../../../Components/AllQuestions";
import BackButton from "../../../../Components/BackButton";
import { toast } from "react-toastify";


function RoundQuestions() {
  const navigate = useNavigate();
  const { roundId } = useParams();
  const {
    data: questions,
    isLoading,
    isError,
  } = useGetRoundQuestionsQuery(roundId);
  const { data: round } = useGetRoundQuery(roundId);

  const {
    data: bets,
    isLoading: betsLoading,
    isError: betsError,
  } = useGetRoundBetsQuery(roundId);

  const [
    updateRoundBets,
    { isLoading: updateRoundBetsLoading, isError: updateRoundBetsError },
  ] = useUpdateRoundBetsMutation();

  const [formData, setFormData] = useState(bets ? bets?.bets : {});
  const [show, setShow] = useState(false);

  const onSubmit = async () => {
    const highestCanBet = round?.round?.max_bet_amount;
    let totalAmount = 0;
    Object.keys(formData)?.map((key) => {
      totalAmount += parseInt(formData[key].amount);
    });
    if (totalAmount > highestCanBet) {
      alert("You can't bet more than " + highestCanBet);
      return;
    }
    try {
      const res = await updateRoundBets({
        roundId,
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
          Round Questions
        </p>
        <p className="mt-1 text-sm text-[#cad4e4]">
          Place your predictions carefully. Total bet limit:{" "}
          <span className="font-bold text-[#f3db9e]">
            {round?.round?.max_bet_amount ?? "--"}
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
        totalBetAllowed={round?.round?.max_bet_amount}
      />
    </section>
  );
}

export default RoundQuestions;
