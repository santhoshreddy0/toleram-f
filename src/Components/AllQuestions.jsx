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

    console.log(show);
    return (
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
            <button
                onClick={() => setShow(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                disabled={Object.keys(formData).length == 0}
            >
                Submit ( {Object.keys(formData).length} )
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
