import React, { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { checkForANonEmptyObject } from "../Utils/helpers";
import Loader from "./Loader";

export default function Notification(props) {
  const success = {
    fontColor: "text-[#1C9975]",
    background: "bg-[#D5F2EA]",
    border: "border border-[#B2E0D3]",
  };
  const error = {
    fontColor: "text-[#E45555]",
    background: "bg-[#FFF0F0]",
    border: "border-[#FFD1D1]",
  };
  const processing = {
    fontColor: "text-[#B9A46C]",
    background: "bg-[#FFF7E4]",
    border: "border border-[#F9E2A5]",
  };
  const info = {
    fontColor: "text-[#55608D]",
    background: "bg-[#F3F7FF]",
    border: "border border-[#D9E5FF]",
  };
  const styleMap = new Map([
    ["success", success],
    ["error", error],
    ["processing", processing],
    ["info", info],
  ]);
  let notificationStyle = {};
  if (props?.redError) {
    notificationStyle = styleMap.get("error");
  } else if (props?.style && styleMap.has(props.style)) {
    notificationStyle = styleMap.get(props.style);
  }
  
  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-start px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-[100]"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={props.show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={
                "max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto  ring-black ring-opacity-5 overflow-hidden " +
                (checkForANonEmptyObject(notificationStyle)
                  ? notificationStyle.border
                  : "")
              }
            >
              <div
                className={
                  "pl-3 pr-3 py-4 text-left " +
                  (checkForANonEmptyObject(notificationStyle)
                    ? notificationStyle.background
                    : "")
                }
              >
                <div className="flex items-center">
                  <div className="w-0 flex-1 flex justify-between items-center">
                    {props?.style == "processing" ? (
                      <Loader height="30px" width="30px" color={"#00C48C"} />
                    ) : null}
                    <p
                      className={
                        "w-0 flex-1 text-sm mb-0 pl-2 " +
                        (checkForANonEmptyObject(notificationStyle)
                          ? notificationStyle.fontColor
                          : "text-gray-900 ")
                      }
                    >
                      {props.message}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      type="button"
                      className={
                        "rounded-md inline-flex focus:outline-none " +
                        (checkForANonEmptyObject(notificationStyle)
                          ? notificationStyle.fontColor
                          : "text-gray-400 hover:text-gray-500")
                      }
                      onClick={() => {
                        props.setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
