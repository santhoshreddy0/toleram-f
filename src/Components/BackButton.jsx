import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-start">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex  items-start gap-x-1.5 rounded-md   py-3 text-lg font-medium border m-3 px-3"
      >
        <ArrowLeftIcon className="h-6 w-6" />
        Back
      </button>
    </div>
  );
}

export default BackButton;
