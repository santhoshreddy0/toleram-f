import React, { useEffect, useRef, useState } from "react";
import PopUpStructure from "./PopUpStructure";
import Text from "../Text";
import { useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { CogIcon } from "@heroicons/react/20/solid";
import numeral from "numeral";
import { isEmptyObject } from "../../Utils/Helpers";

function BetSlip({
  show,
  setShow,
  questions,
  formData,
  setFormData,
  onSubmit,
  totalBetAllowed
}) {
  const cancelButtonRef = useRef();
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm();  

  const onAmountChange = (e, questionId) => {
    let val = e.target.value
    if (isNaN(e.target.value)) {
      val = 0
    }
    setFormData({
      ...formData,
      [questionId]: {
        ...formData[questionId],
        amount: parseInt(val),
      },
    });
    clearErrors()
  };

  const deleteAnswer = (key) => {
    // remmove the question from the form data
    const newFormData = { ...formData };
    delete newFormData[key];
    setFormData(newFormData);
    if (isEmptyObject(newFormData)) {
      setShow(false);
    }
  };
  const [amounts, setAmounts] = useState({
    totalAmount: 0,
    potentialAmount: 0,
  });
  useEffect(() => {
    // calculate the total amount
    let amount = 0;
    Object.keys(formData)?.map((key) => {
      const val = isNaN(formData[key].amount) ? 0 : formData[key].amount
      amount += parseInt(val);
    });

    let potentialAmount = 0;
    Object.keys(formData)?.map((key) => {
      let odds = questions?.questions
        ?.find((i) => i.id == key)
        ?.options.find((i) => i.id == formData[key].option)?.odds;

      odds = parseFloat(odds);
      const val = isNaN(formData[key].amount) ? 0 : parseInt(formData[key].amount)
      potentialAmount += val * odds - val;
    });
    setAmounts({ totalAmount: amount, potentialAmount: potentialAmount });
  }, [formData]);
  return (
    <PopUpStructure
      cancelButtonRef={cancelButtonRef}
      canShowPopUp={show}
      dismissPopUP={() => {
        setShow(false);
      }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#f8d06f]/24 bg-[linear-gradient(140deg,#071321_0%,#0a2238_56%,#081828_100%)] p-2 text-[#f7f0de] shadow-[0_20px_46px_rgba(0,0,0,0.5)] sm:p-4 md:p-6">
        <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(248,208,111,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(248,208,111,0.05)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="pointer-events-none absolute -left-14 top-6 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(248,208,111,0.24)_0%,rgba(248,208,111,0)_72%)] blur-2xl" />
        <div className="pointer-events-none absolute -right-10 bottom-16 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(81,205,255,0.2)_0%,rgba(81,205,255,0)_72%)] blur-2xl" />

        <button
          onClick={() => setShow(false)}
          className="absolute right-3 top-3 z-20 inline-flex items-center gap-1 rounded-full border border-rose-400/45 bg-rose-500/18 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-rose-100 transition-colors hover:bg-rose-500/28"
        >
          <div className="flex items-center space-x-1">
            <XMarkIcon className="h-3.5 w-3.5" />
            <span className="text-xs">Close Bet</span>
          </div>
        </button>
        <ul
          role="list"
          className="relative z-10 m-2 divide-y divide-[#f8d06f]/14 sm:m-4 md:m-6"
        >
          <form className="" onSubmit={handleSubmit(onSubmit)} id="bets">
            {Object.keys(formData).length > 0 ? (
              Object.keys(formData)?.map((key, index) => {
                const question = questions?.questions?.find((i) => i.id == key);
                const option = questions?.questions
                  ?.find((i) => i.id == key)
                  ?.options.find((i) => i.id == formData[key].option);
           
                  

                return (
                  <li
                    key={index}
                    className="flex-col justify-between gap-x-6 py-5"
                  >
                    <div className="flex min-w-0 gap-x-4 rounded-xl border border-[#f8d06f]/14 bg-[#07192a]/86 p-3">
                      <XMarkIcon
                        className="h-8 w-8 shrink-0 cursor-pointer rounded-lg border border-[#f8d06f]/18 bg-[#0b2237] p-1.5 text-[#ffd27b] transition-colors hover:bg-[#12304b] hover:text-[#ffe2a2]"
                        onClick={() => deleteAnswer(key)}
                      />
                      <div className="min-w-0 flex-auto text-xl">
                        <p className="font-semibold leading-6 text-[#fff3d2]">
                          <CogIcon className="mr-1 inline-block h-5 w-5 text-[#f8d06f]" />
                          <span className={`${!question ? "text-red-500" : ""}`}>
                            {question?.question ||
                              "Question not found , Please remove this bet"}
                          </span>
                        </p>
                        <p className="mt-1 truncate text-base leading-5 text-[#8de8ba]">
                          {option?.option + " X " + option?.odds}
                        </p>
                        <div className="mt-3 rounded-lg border border-[#f8d06f]/14 bg-[#06111e]/85 p-3">
                          <label
                            htmlFor="email"
                            className="block text-xs font-semibold uppercase tracking-[0.08em] leading-6 text-[#f8d88a]"
                          >
                            Enter Bet Amount
                          </label>
                          <Text
                            register={register}
                            name={"number" + key}
                            min="0"
                            type="number"
                            value={formData?.[key]?.amount}
                            onChange={(i) => {
                              onAmountChange(i, key);
                            }}
                            // withCheck={true}
                            options={{
                              min: {
                                value: 1000,
                                message: "Minimum amount is 1000",
                              },
                            }}
                            errors={errors}
                            className={
                              "mt-1 !bg-[#0d2237] !text-[#fff3d1] ring-[#f8d06f]/22 placeholder:!text-[#9fb6cf] focus:ring-[#f8d06f]/48 hover:ring-[#f8d06f]/42"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })
            ) : (
              <div className="flex justify-center items-center h-40">
                <p className="rounded-xl border border-[#f8d06f]/16 bg-[#081827]/75 px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-[#f0dfb5]">
                  No Bets Selected
                </p>
              </div>
            )}
          </form>
        </ul>
        <div className="relative z-10 border-t border-[#f8d06f]/20">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between rounded-lg border border-[#f8d06f]/14 bg-[#0b1b2d]/80 px-4 py-2 text-base font-semibold leading-6">
              <div>Total Bet Allowed</div>
              <div className="text-sm text-[#f8d88a]">{numeral(parseFloat(totalBetAllowed)).format('0,0.00')}</div>
            </div>
            <div className="mt-2 flex justify-between rounded-lg border border-[#f8d06f]/14 bg-[#0b1b2d]/80 px-4 py-2 text-base font-semibold leading-6">
              <div>Total Amount</div>
              <div className="text-sm text-[#d4e0f2]">{numeral(parseFloat(amounts?.totalAmount)).format('0,0.00')}</div>
            </div>
            <div className="mt-2 flex justify-between rounded-lg border border-emerald-400/35 bg-[linear-gradient(90deg,rgba(33,92,77,0.78)_0%,rgba(30,112,83,0.74)_100%)] px-4 py-2 text-lg font-semibold leading-6 text-emerald-100">
              <div>Potential Win</div>
              <div className="text-sm font-bold">{numeral(parseFloat(amounts.potentialAmount)).format('0,0.00')}</div>
            </div>
          </div>
          <div className="mt-5">
            <button
              type="submit"
              form="bets"
              className="w-full rounded-b-xl border-t border-[#f8d06f]/32 bg-gradient-to-r from-[#f8d06f] via-[#efbb58] to-[#e2ad45] py-3 text-lg font-black uppercase tracking-[0.08em] text-[#1d1302] transition-all duration-300 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-65"
              disabled={Object.keys(formData).length === 0}
            >
              Place Bet
            </button>
          </div>
        </div>
      </div>
    </PopUpStructure>
  );
}

export default BetSlip;
