import React, { useRef, useState } from "react";
import PopUpStructure from "./PopUpStructure";

function AddPopup() {
  const cancelButtonRef = useRef();
  const [show, setShow] = useState(localStorage.getItem("addPopup") == 'false' ? false : true);
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
      <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full relative">
        <img
          src="/VitaminCPost1.jpg"
          alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
          className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
        />
        <div
          aria-hidden="true"
          className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
        />
        <div className="flex items-end sm:absolute sm:inset-0 absolute right-1 top-0">
          <div className="">
            <button
              type="button"
              onClick={closePopupHandler}
              className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              close
            </button>
          </div>
        </div>
      </div>
    </PopUpStructure>
  );
}

export default AddPopup;
