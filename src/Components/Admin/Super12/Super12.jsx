import React,{ useEffect, useState } from "react";
import {
  useUpdateSuper12BetStatusMutation,
  useGetTournamentQuery,
} from "../../../app/Services/tournament";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import CustomButton from "../../CustomButton";

export default function Super12() {
  const { data: tournament, isLoading: isTournamentLoading } =
    useGetTournamentQuery();
  const [updateSuper12BetStatus, { isLoading: isUpdating }] =
    useUpdateSuper12BetStatusMutation();

  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (tournament?.runSuper12Bets) {
      setIsEnabled(tournament.runSuper12Bets === "yes");
    }
  }, [tournament]);

  const toggleBets = async () => {
    const newStatus = isEnabled ? "no" : "yes";

    try {
      await updateSuper12BetStatus({ status: newStatus }).unwrap();
      setIsEnabled(!isEnabled);
    } catch (error) {
      console.error("Error updating Super12 bet status:", error);
    }
  };

  const isLoading = isTournamentLoading || isUpdating;

  return (
    <div className="mt-8 max-w-md mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">
          Super12 Betting
        </h2>

        <div className="flex items-center justify-between w-full mb-6">
          <span className="text-lg font-medium text-gray-300">
            Betting is currently:{" "}
            <span
              className={
                isEnabled
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
              }
            >
              {isEnabled ? " ON" : " OFF"}
            </span>
          </span>

          <div className="flex items-center">
            {isEnabled ? (
              <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
            ) : (
              <XCircleIcon className="w-6 h-6 text-red-500 mr-2" />
            )}
          </div>
        </div>

        <CustomButton
          disabled={isLoading}
          isLoading={isLoading}
          onClick={toggleBets}
          className={`flex items-center justify-center px-6 py-3 rounded-lg w-full transition-all duration-300 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : isEnabled
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {isEnabled ? "Turn OFF Bets" : "Turn ON Bets"}
        </CustomButton>
      </div>
    </div>
  );
}
