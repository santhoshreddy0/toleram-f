import React, { useState } from "react";
import QuestionWithOptions from "./QuetionWithOptions";
import BetSlip from "./PopUp/BetSlip";

function AllQuestions({ questions, formData, setFormData, onSubmit }) {
    const [show, setShow] = useState(false);
    const onChange = (i) => {
        setFormData({
            ...formData,
            [i.questionId]: { option: i.id, amount: 0 },
        });
    };

    return (
        <div className="mt-10 max-w-2xl mx-auto">
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
                className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4 fixed right-0 bottom-10 text-black"
                // disabled={Object.keys(formData).length == 0}
            >
                <span className="px-2 py-1 rounded-full text-white bg-red-600"> {Object.keys(formData).length} </span>
                <br />
                BET SLIP
            </button>
            {show && (
                <BetSlip
                    show={show}
                    setShow={setShow}
                    questions={questions}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={onSubmit}
                />
            )}
        </div>
    );
}

export default AllQuestions;
