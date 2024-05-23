import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-around">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex text-xs items-start gap-x-1.5 rounded-md  px-1.5 py-3 text-2xl font-medium border m-3 "
      >
        Back
      </button>
      <Link to={`/rules`} className="">
        <button className="inline-flex text-xs items-start gap-x-1.5 rounded-md  px-1.5 py-3 text-2xl font-medium border m-3 ">
          Rules
        </button>
      </Link>
    </div>
  );
}

export default BackButton;
