import React, { useState } from "react";
import QuestionWithOptions from "./QuetionWithOptions";
import BetSlip from "./PopUp/BetSlip";
import { TicketIcon } from "@heroicons/react/20/solid";

function AllQuestions({ questions, formData, setFormData, onSubmit, show, setShow,totalBetAllowed }) {
  // const [show, setShow] = useState(false);
  const onChange = (i) => {
    setFormData({
      ...formData,
      [i.questionId]: { option: i.id, amount: 0 },
    });
  };
  if (!questions?.questions) {
    return (
      <>
        <div className="flex items-center justify-center rounded-2xl border border-[#f8d06f]/22 bg-[#071321]/80 p-8 text-center">
          <div className="text-lg font-bold uppercase tracking-[0.08em] text-[#f0dfb5]">
            No Questions Available
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="mx-auto mt-2 max-w-full rounded-2xl border border-[#f8d06f]/18 bg-[linear-gradient(140deg,#06121f_0%,#091d31_56%,#071626_100%)] p-4 text-white shadow-[0_14px_30px_rgba(0,0,0,0.28)] sm:max-w-xl sm:p-6 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-7xl">
      {questions?.questions?.map((question) => {
        return (
          <QuestionWithOptions
            key={question.id}
            id={question.id}
            question={question.question}
            options={question.options}
            onChange={onChange}
            formData={formData}
          />
        );
      })}
      <button
        onClick={() => setShow(true)}
        className="fixed bottom-8 right-4 z-30 inline-flex items-center gap-2 rounded-full border border-[#f8d06f]/55 bg-gradient-to-r from-[#f8d06f] via-[#efbb58] to-[#e2ad45] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#1f1402] shadow-[0_14px_34px_rgba(248,208,111,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 sm:bottom-10 sm:right-8"
        // disabled={Object.keys(formData).length == 0}
      >
        <TicketIcon className="h-4 w-4" />
        Bet Slip
        <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full border border-[#1a1203]/25 bg-[#1a1203]/15 px-1.5 text-[11px] text-[#1a1203]">
          {Object.keys(formData).length}
        </span>
      </button>
      {show && (
        <BetSlip
          show={show}
          setShow={setShow}
          questions={questions}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          totalBetAllowed={totalBetAllowed}
        />
      )}
    </div>
  );
}

export default AllQuestions;
