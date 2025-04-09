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
import { toast } from "react-hot-toast";


export default function AdminMatches() {
    const { matchId } = useParams();
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [question, setQuestion] = useState(null);
    const [editingQuestionId, setEditingQuestionId] = useState(null);
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
            toast.success('Correct answer updated successfully!');
        } catch (error) {
            console.error('Failed to update correct answer:', error);
            toast.error('Failed to update correct answer');
        }
    };

    if (isLoading || isUpdating) return <Loader />

    return (
        <div className="">
            <div className="pt-8 px-4 sm:px-8">
            <p className="text-gray-200 text-2xl font-medium mb-6">{match?.match.match_title}</p>
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
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto lg:max-w-none">
                    <div className="mt-4 sm:mt-6">
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
                                        <Disclosure key={faq.question} as="div" className="py-6 first:pt-0 last:pb-0" defaultOpen={false}>
                                            {({ open }) => (
                                                <>
                                                    <dt>
                                                        <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-100">
                                                            <span className="text-base/7 font-semibold">{faq.question}</span>
                                                            <span className="ml-6 flex h-7 items-center">
                                                                {!open ? (
                                                                    <PlusSmallIcon aria-hidden="true" className="size-6" />
                                                                ) : (
                                                                    <MinusSmallIcon aria-hidden="true" className="size-6" />
                                                                )}
                                                            </span>
                                                        </DisclosureButton>
                                                    </dt>
                                                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                                        <div className="space-y-4">
                                                            {faq.options.map((option) => (
                                                                <div key={option.id} className="flex items-center gap-x-4">
                                                                    <button
                                                                        onClick={async (e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            if (editingQuestionId === faq.id) {
                                                                                try {
                                                                                    await updateCorrectAnswer({
                                                                                        questionId: faq.id,
                                                                                        correctOption: option.id
                                                                                    }).unwrap();
                                                                                    toast.success('Correct answer updated successfully!');
                                                                                    setEditingQuestionId(null);
                                                                                } catch (error) {
                                                                                    console.error('Failed to update correct answer:', error);
                                                                                    toast.error('Failed to update correct answer');
                                                                                }
                                                                            }
                                                                        }}
                                                                        onMouseDown={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                        }}
                                                                        type="button"
                                                                        className={`flex items-center gap-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 
                                                                            ${+faq.correct_option === option.id ? 'bg-gray-700 border-2 border-green-500' : 'bg-gray-700'} 
                                                                            text-gray-100 hover:bg-gray-600`}
                                                                    >
                                                                        {editingQuestionId === faq.id && (
                                                                            <button 
                                                                                type="button"
                                                                                onClick={async (e) => {
                                                                                    e.preventDefault();
                                                                                    e.stopPropagation();
                                                                                    try {
                                                                                        await updateCorrectAnswer({
                                                                                            questionId: faq.id,
                                                                                            correctOption: option.id
                                                                                        }).unwrap();
                                                                                        toast.success('Correct answer updated successfully!');
                                                                                        setEditingQuestionId(null);
                                                                                    } catch (error) {
                                                                                        console.error('Failed to update correct answer:', error);
                                                                                        toast.error('Failed to update correct answer');
                                                                                    }
                                                                                }}
                                                                                className="flex items-center justify-center w-5 h-5 border border-gray-400 rounded hover:bg-gray-600"
                                                                            >
                                                                                {+faq.correct_option === option.id && (
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                                    </svg>
                                                                                )}
                                                                            </button>
                                                                        )}
                                                                        {option.option} (Odds: {option.odds})
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="flex gap-x-4 mt-4">
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    setOpen(true);
                                                                    setQuestion(faq);
                                                                }}
                                                                className="text-indigo-400 text-sm hover:text-indigo-300"
                                                            >
                                                                + Add Another Option
                                                            </button>
                                                            {editingQuestionId === faq.id ? (
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();
                                                                        setEditingQuestionId(null);
                                                                    }}
                                                                    className="text-red-400 text-sm hover:text-red-300"
                                                                >
                                                                    Cancel Selection
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();
                                                                        setEditingQuestionId(faq.id);
                                                                    }}
                                                                    className="text-indigo-400 text-sm hover:text-indigo-300"
                                                                >
                                                                    Set Correct Option
                                                                </button>
                                                            )}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
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
            {openEdit && <CreateNewMatch open={openEdit} setOpen={setOpenEdit} matchId={matchId}/>}
        </div>
    )
}
