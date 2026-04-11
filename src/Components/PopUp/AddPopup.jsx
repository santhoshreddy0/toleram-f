import React, { useRef, useState } from "react";
import PopUpStructure from "./PopUpStructure";
import { XMarkIcon } from "@heroicons/react/24/outline";

function AddPopup() {
  const cancelButtonRef = useRef();
  const [show, setShow] = useState(
    localStorage.getItem("addPopup") == "false" ? false : true
  );
  const closePopupHandler = () => {
    setShow(false);
    localStorage.setItem("addPopup", false);
  };
  if (!show) {
    return <></>;
  }
  return (
    <PopUpStructure
      cancelButtonRef={cancelButtonRef}
      canShowPopUp={show}
      dismissPopUP={closePopupHandler}
    >
      <div className="group relative overflow-hidden rounded-2xl border border-[#f8d06f]/28 bg-[linear-gradient(140deg,#071422_0%,#0a243b_58%,#07192a_100%)] p-1 shadow-[0_24px_52px_rgba(0,0,0,0.5)]">
        <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(248,208,111,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(248,208,111,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="relative overflow-hidden rounded-[14px] border border-[#f8d06f]/20">
        <img
          src="https://tplmania.s3.eu-west-2.amazonaws.com/toleram/advertisement.png"
          alt="Tournament advertisement"
          className="h-auto w-full object-cover object-center bg-gray-900 transition-opacity duration-300 group-hover:opacity-90"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/55"
        />
         
          <div className="absolute right-3 top-3 z-30">
            <div className="flex items-center justify-center gap-1 rounded-full border border-[#f8d06f]/65 bg-[#071522]/95 px-3 py-1.5 text-[#f8e4a8] shadow-[0_10px_26px_rgba(0,0,0,0.42)]">
            <XMarkIcon className="h-4 w-4" />
            <button
              type="button"
              onClick={closePopupHandler}
              className="inline-flex items-center rounded-md text-xs font-black uppercase tracking-[0.08em] text-[#f8e4a8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Close
            </button>
            </div>
          </div>
          <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-[#f8d06f]/26 bg-[#06111d]/78 px-3 py-2 text-left backdrop-blur-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#f8d06f]">
              TPL Spotlight
            </p>
            <p className="mt-0.5 text-xs text-[#f1e8d2]">
              New promos and match-day announcements are now live.
            </p>
          </div>
        </div>
      </div>
    </PopUpStructure>
  );
}

export default AddPopup;
