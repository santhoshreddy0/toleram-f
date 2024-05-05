import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    useGetRoundBetsQuery,
    useGetRoundQuestionsQuery,
    useUpdateRoundBetsMutation,
} from "../../../../app/Services/roundsApi";
import Loader from "../../../../Components/Loader";

import AllQuestions from "../../../../Components/AllQuestions";

function RoundQuestions() {
    const { roundId } = useParams();
    const {
        data: questions,
        isLoading,
        isError,
    } = useGetRoundQuestionsQuery(roundId);

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

    console.log("formData", formData, bets);

    const onSubmit = async () => {
        const highestCanBet = import.meta.env.VITE_REACT_APP_ROUNDS_AMOUNT;
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
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (bets) {
            setFormData(bets?.bets);
        }
    }, [bets]);

    if (isLoading || betsLoading) {
        return <Loader />;
    }

    return (
        <>
            <div className="mx-5 max-w-3xl text-base leading-7 text-gray-700 bg-white rounded">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Round Questions:
                </h1>
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

export default RoundQuestions;
