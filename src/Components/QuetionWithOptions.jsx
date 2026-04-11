import React from "react";
import { Disclosure, RadioGroup } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/16/solid";

const QuestionWithOptions = ({ id, question, options, onChange, formData }) => {
  return (
    <div className="w-full border-b border-[#f8d06f]/15 px-1 py-1.5">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-[#f8d06f]/15 bg-[#071321]/85 p-2 shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-[#f4e8ca] transition-colors duration-200 hover:bg-[#0d2338]/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f8d06f]/50">
                <span className="text-left text-base sm:text-lg">{question}</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-[#f8d06f]`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-3 pb-3 pt-3 text-sm text-gray-500">
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
  const selected = options.find((o) => o.id == formData?.[questionId]?.option);

  return (
    <div className="w-full px-2">
      <div className="mx-auto w-full max-w-4xl">
        <RadioGroup
          value={selected}
          onChange={(i) => {
            onChange({ ...i, questionId });
          }}
        >
          <RadioGroup.Label className="sr-only">Options</RadioGroup.Label>
          <div className="space-y-2">
            {options?.map((option) => {
              if(option?.option == 'void') {
                return <></>
              }
              return(
              <RadioGroup.Option
                key={option.id}
                value={option}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-[#f8d06f]/50 ring-offset-1 ring-offset-[#071321]"
                      : ""
                  }
                  ${
                    selected?.id == option?.id
                      ? "border border-[#f8d06f]/55 bg-[linear-gradient(120deg,rgba(248,208,111,0.3)_0%,rgba(227,170,57,0.2)_65%,rgba(81,205,255,0.18)_100%)] text-white"
                      : "border border-[#f8d06f]/12 bg-[#0a1a2a] text-[#dce5f3] hover:border-[#f8d06f]/28 hover:bg-[#10253a]"
                  }
                    relative flex cursor-pointer rounded-xl px-5 py-4 shadow-md transition-all duration-200 focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm text-left">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium text-lg ${
                              selected?.id == option?.id
                                ? "text-[#fff5d8]"
                                : "text-[#d8e4f7]"
                            }`}
                          >
                            {option.option} <br />
                            <span className="text-sm text-[#f8d88a]">
                              odd - {option.odds}
                            </span>
                          </RadioGroup.Label>
                        </div>
                      </div>
                      {selected?.id == option?.id && (
                        <div className="shrink-0 text-[#fff3d1]">
                          <CheckCircleIcon className="h-6 w-6 " />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
              )
            })}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default QuestionWithOptions;
