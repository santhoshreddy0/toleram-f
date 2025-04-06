import React, { useState } from "react";
import { useGetMatchQuestionsQuery } from "../../../app/Services/matchesApi";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Loader";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronLeftIcon, MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import CreateNewQuestionPopup from "./CreateNewQuestionPopup";
import CreateNewMatch from "./AddNewmatchPopup";
import { useGetAdminQuestionsQuery, useGetMatchQuery, useUpdateCorrectAnswerMutation } from "../../../app/Services/Admin/AdminMatches";
import BackButton from "../../BackButton";


export default function AdminMatches() {
    const { matchId } = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [question, setQuestion] = useState(null);
    console.log(question)
    const {
        data: match,
        isLoading: matchLoading,
        isError: matchError,
      } = useGetMatchQuery(matchId);
    const { data: questions, isLoading, isError } = useGetAdminQuestionsQuery(matchId);
    const [updateCorrectAnswer, { isLoading: isUpdating }] = useUpdateCorrectAnswerMutation();

    const handleAnswerSelect = async (questionId, option) => {
        try {
            await updateCorrectAnswer({
                questionId,
                correctOption: option
            }).unwrap();
        } catch (error) {
            console.error('Failed to update correct answer:', error);
            // Optionally add toast/notification here
        }
    };

    if (isLoading || isUpdating) return <Loader />

    return (
        <div className="">
            <div className="pt-12 px-6 lg:px-8">
            <p className="text-gray-200 text-2xl font-medium my-6">{match?.match.match_title}</p>
                <div className="bg-gray-800 rounded-2xl inset-x-0 bottom-0 flex flex-col justify-between gap-x-8 gap-y-4 p-6 ring-1 ring-gray-900/10 md:flex-row md:items-center lg:px-8">
                <div className="flex items-center gap-x-4">
                    <p className="max-w-4xl text-gray-100 text-xl font-semibold">
                        Questions
                    </p>
                </div>
                    <div className="flex flex-none items-center gap-x-5">
                    <button
                            type="button"
                            onClick={() => {setOpen(true); setQuestion("")}}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-white text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                        >
                            Create question
                        </button>
                        <button
                            type="button"
                            onClick={() => setOpenEdit(true)}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-white text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                        >
                            Edit match
                        </button>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto lg:max-w-none">
                    <div className="mt-16 lg:mt-20">
                        <div className="">
                        <div className="bg-gray-800 rounded-2xl">
                        <div className="mx-auto max-w-7xl px-6 py-6 sm:py-12 lg:px-8 lg:py-8">
                            <div className="mx-auto max-w-4xl">
                            <dl className="divide-y divide-gray-900/10">
                                {questions?.questions.length === 0 ? (
                                    <div className="text-center py-12 flex flex-col items-center justify-center">
                                        <svg
                                            className="mx-auto h-24 w-24 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                                            />
                                        </svg>
                                        <h3 className="mt-4 text-xl font-semibold text-gray-100">No questions yet</h3>
                                        <p className="mt-2 text-gray-400">Get started by creating your first question.</p>
                                        <button
                                            type="button"
                                            onClick={() => { setOpen(true); setQuestion("") }}
                                            className="mt-6 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Create Question
                                        </button>
                                    </div>
                                ) : (
                                    questions?.questions.map((faq) => (
                                        <Disclosure key={faq.question} as="div" className="py-6 first:pt-0 last:pb-0">
                                            <dt>
                                            <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-100">
                                                <span className="text-base/7 font-semibold">{faq.question}</span>
                                                <span className="ml-6 flex h-7 items-center">
                                                <PlusSmallIcon aria-hidden="true" className="size-6 group-data-[open]:hidden" />
                                                <MinusSmallIcon aria-hidden="true" className="size-6 group-[&:not([data-open])]:hidden" />
                                                </span>
                                            </DisclosureButton>
                                            </dt>
                                            <DisclosurePanel as="dd" className="mt-2 pr-12">
                                            <div className="space-y-4">
                                                {faq.options.map((option) => (
                                                    <div key={option.id} className="flex items-center gap-x-4">
                                                        <button
                                                            onClick={() => handleAnswerSelect(faq.id, option.option)}
                                                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                                                faq.correct_option === option.id 
                                                                    ? 'bg-green-600 text-white' 
                                                                    : 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                                                            }`}
                                                        >
                                                            {option.option} (Odds: {option.odds})
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex gap-x-4 mt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => {setOpen(true); setQuestion(faq)}}
                                                    className="text-indigo-400 text-sm hover:text-indigo-300"
                                                >
                                                    + Add Another Option
                                                </button>
                                                <div className="relative">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            const dropdown = e.currentTarget.nextElementSibling;
                                                            dropdown.classList.toggle('hidden');
                                                        }}
                                                        className="text-indigo-400 text-sm hover:text-indigo-300"
                                                    >
                                                        + Set Correct Answer
                                                    </button>
                                                    <div className="hidden absolute z-10 mt-2 w-48 rounded-md bg-gray-700 shadow-lg">
                                                        <div className="py-1">
                                                            {faq.options.map((option) => (
                                                                <button
                                                                    key={option.id}
                                                                    onClick={() => {
                                                                        handleAnswerSelect(faq.id, option.option);
                                                                        // Hide dropdown after selection
                                                                        const dropdown = document.querySelector(`#dropdown-${faq.id}`);
                                                                        if (dropdown) dropdown.classList.add('hidden');
                                                                    }}
                                                                    className="block w-full px-4 py-2 text-left text-sm text-gray-100 hover:bg-gray-600"
                                                                >
                                                                    {option.option}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </DisclosurePanel>
                                        </Disclosure>
                                    ))
                                )}
                            </dl>
                            </div>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            {open && <CreateNewQuestionPopup open={open} setOpen={setOpen} question={question} match={match?.match}/>}
            {openEdit && <CreateNewMatch open={openEdit} setOpen={setOpenEdit} match={match?.match}/>}
        </div>
    )
}
