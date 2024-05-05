import React from "react";
import { Disclosure, RadioGroup } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/16/solid";

const QuestionWithOptions = ({ id, question, options, onChange, formData }) => {
    return (
        <div className="w-full px-2">
            <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-green-100 px-4 py-2 text-left text-sm font-medium  hover:bg-green-200 focus:outline-none focus-visible:ring focus-visible:ring-green-500/75">
                                <span>{question}</span>
                                <ChevronUpIcon
                                    className={`${
                                        open ? "rotate-180 transform" : ""
                                    } h-5 w-5 text-green-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                                <Options
                                    questionId={id}
                                    options={options}
                                    onChange={onChange}
                                    formData={formData}
                                />
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </div>
    );
};

const Options = ({ options, onChange, questionId, formData }) => {
    const selected = options.find(
        (o) => o.id == formData?.[questionId]?.option
    );

    return (
        <div className="w-full px-4">
            <div className="mx-auto w-full max-w-md">
                <RadioGroup
                    value={selected}
                    onChange={(i) => {
                        onChange({ ...i, questionId });
                    }}
                >
                    <RadioGroup.Label className="sr-only">
                        Options
                    </RadioGroup.Label>
                    <div className="space-y-2">
                        {options?.map((option) => (
                            <RadioGroup.Option
                                key={option.id}
                                value={option}
                                className={({ active, checked }) =>
                                    `${
                                        active
                                            ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                                            : ""
                                    }
                  ${
                      selected?.id == option?.id
                          ? "bg-green-600/75 text-white"
                          : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                }
                            >
                                {({ active, checked }) => (
                                    <>
                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="text-sm">
                                                    <RadioGroup.Label
                                                        as="p"
                                                        className={`font-medium  ${
                                                            selected?.id ==
                                                            option?.id
                                                                ? "text-white"
                                                                : "text-gray-900"
                                                        }`}
                                                    >
                                                        {option.option}
                                                    </RadioGroup.Label>
                                                    <RadioGroup.Description
                                                        as="span"
                                                        className={`inline ${
                                                            selected?.id ==
                                                            option?.id
                                                                ? "text-sky-100 font-medium"
                                                                : "text-gray-500 "
                                                        }`}
                                                    >
                                                        <span className="">
                                                            {option.odds}
                                                        </span>
                                                    </RadioGroup.Description>
                                                </div>
                                            </div>
                                            {selected?.id == option?.id && (
                                                <div className="shrink-0 text-white">
                                                    <CheckCircleIcon className="h-6 w-6 " />
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
            </div>
        </div>
    );
};

export default QuestionWithOptions;
