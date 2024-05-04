import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
    useGetRoundBetsQuery,
    useGetRoundQuestionsQuery,
} from "../../../../app/Services/roundsApi";
import Loader from "../../../../Components/Loader";

import QuestionWithOptions from "../../../../Components/QuetionWithOptions";
import {
    useGetMatchBetsQuery,
    useGetMatchQuestionsQuery,
} from "../../../../app/Services/matchesApi";

function MatchQuestions() {
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

    const [formData, setFormData] = useState(bets ? bets?.bets : {});
    const onChange = (i) => {
        setFormData({
            ...formData,
            [i.questionId]: { option: i.id, amount: 0 },
        });
    };

    if (isLoading) {
        return <Loader />;
    }
    console.log(formData);
    return (
        <>
            <div className="mx-5 max-w-3xl text-base leading-7 text-gray-700 bg-white rounded">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Match Questions:
                </h1>
                <div className="mt-10 max-w-2xl ">
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
                </div>
            </div>
        </>
    );
}

export default MatchQuestions;
