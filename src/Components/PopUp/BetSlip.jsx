import React, { useEffect, useRef, useState } from "react";
import PopUpStructure from "./PopUpStructure";
import Text from "../Text";
import { useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/16/solid";

function BetSlip({
    show,
    setShow,
    questions,
    formData,
    setFormData,
    onSubmit,
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
        setFormData({
            ...formData,
            [questionId]: { ...formData[questionId], amount: e.target.value },
        });
    };
    const deleteAnswer = (key) => {
        // remmove the question from the form data
        const newFormData = { ...formData };
        delete newFormData[key];
        setFormData(newFormData);
        if (Object.keys(newFormData).length == 0) {
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
            amount += parseInt(formData[key].amount);
        });

        let potentialAmount = 0;
        Object.keys(formData)?.map((key) => {
            let odds = questions?.questions
                ?.find((i) => i.id == key)
                ?.options.find((i) => i.id == formData[key].option)?.odds;

            odds = parseFloat(odds);
            console.log(
                odds,
                formData[key].amount,
                parseInt(formData[key].amount) * odds
            );
            potentialAmount += parseInt(formData[key].amount) * odds;
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
            <div>
                <ul role="list" className="divide-y divide-gray-100">
                    {Object.keys(formData).length > 0 ? (
                        Object.keys(formData)?.map((key) => {
                            const question = questions?.questions?.find(
                                (i) => i.id == key
                            );
                            const option = questions?.questions
                                ?.find((i) => i.id == key)
                                .options.find(
                                    (i) => i.id == formData[key].option
                                );
                            return (
                                <li
                                    key={key}
                                    className="flex-col justify-between gap-x-6 py-5"
                                >
                                    <div className="flex min-w-0 gap-x-4">
                                        <XMarkIcon
                                            className="h-6 w-6 text-gray-400"
                                            onClick={() => deleteAnswer(key)}
                                        />
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">
                                                {question?.question}
                                            </p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                {option.option +
                                                    " - " +
                                                    option.odds}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <div className="text-sm leading-6 text-gray-900">
                                            <div className="">
                                                <label
                                                    htmlFor="email"
                                                    className="block text-sm font-medium leading-6 text-gray-900 text-right"
                                                >
                                                    Enter Bet Amount
                                                </label>
                                                <Text
                                                    register={register}
                                                    name="toss_bet"
                                                    type="number"
                                                    value={
                                                        formData?.[key]?.amount
                                                    }
                                                    onChange={(i) => {
                                                        clearErrors("toss_bet");
                                                        onAmountChange(i, key);
                                                    }}
                                                    withCheck={true}
                                                    //   options={{
                                                    //     required: "Please enter this field",
                                                    //   }}
                                                    errors={errors}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })
                    ) : (
                        <div className="flex justify-center items-center h-40">
                            <p className="text-sm text-gray-500">
                                No Bets Selected
                            </p>
                        </div>
                    )}
                </ul>
                <div className="bg-white   border-t-2">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="text-base font-semibold leading-6 text-gray-900 flex justify-between">
                            <div>Total Amount</div>
                            <div className="text-sm text-gray-500">
                                {amounts?.totalAmount}
                            </div>
                        </div>
                        <div className="text-base font-semibold leading-6 text-gray-900 flex justify-between">
                            <div>Potential Win </div>
                            <div className="text-sm text-gray-500">
                                {amounts.potentialAmount}
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <button
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 w-full text-center"
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
