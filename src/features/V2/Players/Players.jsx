import React, { useState } from "react";
import {
    useGetPlayerQuestionsQuery,
    useGetPlayersBetsQuery,
} from "../../../app/Services/playersApi";
import Loader from "../../../Components/Loader";
import MenuTabs from "../../Layout/MenuTabs";
import QuestionWithOptions from "../../../Components/QuetionWithOptions";

function Players() {
    const {
        data: playerQuestions,
        isLoading,
        isError,
    } = useGetPlayerQuestionsQuery();

    const {
        data: playerBets,
        isLoading: betsLoading,
        isError: betsError,
    } = useGetPlayersBetsQuery();
    const [formData, setFormData] = useState(
        playerBets ? playerBets?.bets : {}
    );
    const onChange = (i) => {
        setFormData({
            ...formData,
            [i.questionId]: { option: i.id, amount: 0 },
        });
    };

    console.log(formData);
    if (isLoading || betsLoading) {
        return <Loader />;
    }
    return (
        <>
            <MenuTabs>
                <div className="mx-5 max-w-3xl text-base leading-7 text-gray-700 bg-white rounded">
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Best Players:
                    </h1>
                    <div className="mt-10 max-w-2xl ">
                        {playerQuestions?.questions?.map((question) => {
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
            </MenuTabs>
        </>
    );
}

export default Players;
