import React, { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import BettingDetailsTable from "./QuestionsTable";
import BetActivityLogsPopup from "./BetActivityLogsPopup";


const BettingHistoryRow = ({ entry, isExpanded, toggleExpand, index, userId }) => {
  const [logsOpen, setLogsOpen] = useState(false);
  const refId = entry.type === "Match" ? entry.match_id : entry.round_id;
  const title = entry.type === "Match" ? entry.matchTitle : entry.roundTitle;

  return (
    <>
      <tr className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}>
        <td className="px-6 py-4 tracking-tight">
          <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs">
            {entry.type}
          </span>
        </td>
        <td className="px-6 py-4 tracking-tight">{title}</td>
        <td className="px-6 py-4 tracking-tight">{entry.betAmount}</td>
        <td className="px-6 py-4 tracking-tight">{entry.points}</td>
        <td className="px-6 py-4 text-right">
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => toggleExpand(entry.key)}
              className="text-green-400 hover:underline text-xs"
            >
              {isExpanded ? "Hide" : "View"} Details
            </button>
            <button
              type="button"
              onClick={() => setLogsOpen(true)}
              disabled={!userId || !refId}
              title="View betting activity logs"
              className="text-gray-300 hover:text-green-400 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <InformationCircleIcon className="h-5 w-5" />
            </button>
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan="5" className="bg-gray-900 px-6 py-4">
            <BettingDetailsTable bets={entry.bets} />
          </td>
        </tr>
      )}
      <BetActivityLogsPopup
        open={logsOpen}
        setOpen={setLogsOpen}
        type={entry.type}
        userId={userId}
        refId={refId}
        title={title}
      />
    </>
  );
};

export default BettingHistoryRow;
