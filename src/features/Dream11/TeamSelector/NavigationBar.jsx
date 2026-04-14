import React, { useState } from "react";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

const STEP_LABELS = {
  1: "Select Players",
  2: "Captain & VC",
  3: "Team Name",
  4: "Preview",
};

const NEXT_LABELS = {
  1: "Continue",
  2: "Team Name",
  3: "Preview",
};

const RULES = [
  "Select 10 male players + 2 female players (total 12) within 100 credits.",
  "Min 3 / max 5 batsmen, min 3 / max 5 bowlers, min 2 / max 4 all-rounders.",
  "Pick exactly 2 female players.",
  "Captain gets 2x points, Vice-Captain gets 1.5x points.",
  "Entry window closes as per tournament schedule. Bets once finalised cannot be cancelled.",
];

const TopBar = ({
  step,
  goBack,
  goToNextStep,
  handleSubmit,
  buttonLoading,
  usedCredits,
  totalCredits,
  isNextDisabled,
  nextDisabledReason = "",
  onBlockedNext,
}) => {
  const [showRules, setShowRules] = useState(false);
  const creditsLeft = totalCredits - usedCredits;

  return (
    <div className="relative bg-[linear-gradient(110deg,#0a1522_0%,#122c45_40%,#0f1f31_100%)] border-b border-[#f9d274]/25 text-white shadow-lg flex-shrink-0">
      <div className="flex items-center justify-between gap-3 px-3 sm:px-5 py-3 max-w-7xl mx-auto w-full">
        {/* Left: back / cancel */}
        <button
          onClick={goBack}
          className="flex items-center gap-1 text-sm font-semibold hover:bg-white/10 rounded-md px-2 py-1.5 transition"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="hidden sm:inline">
            {step > 1 ? "Back" : "Cancel"}
          </span>
        </button>

        {/* Center: title + info (fixed position, no step shift) */}
        <div className="flex items-center justify-center gap-1.5 flex-1 min-w-0">
          <h1 className="text-sm sm:text-base font-bold tracking-tight truncate text-[#f9d274]">
            Super 12
          </h1>
          <button
            onClick={() => setShowRules((s) => !s)}
            className="text-white/80 hover:text-white flex-shrink-0"
            aria-label="Rules"
          >
            <InformationCircleIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Right: next */}
        <div className="flex items-center gap-2">
          {step < 4 ? (
            <button
              onClick={isNextDisabled ? onBlockedNext : goToNextStep}
              aria-disabled={isNextDisabled}
              title={isNextDisabled ? nextDisabledReason : undefined}
              className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                isNextDisabled
                  ? "bg-[#1a1a1f] text-gray-500 cursor-not-allowed border border-gray-700"
                  : "bg-[#f9d274] text-[#1a1304] hover:bg-[#ffe39a] shadow-[0_0_18px_rgba(249,210,116,0.45)] border border-[#f9d274]"
              }`}
            >
              {NEXT_LABELS[step]}
              <ChevronRightIcon className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={buttonLoading}
              className="flex items-center justify-center gap-1 px-4 py-1.5 min-w-[84px] bg-[#f9d274] text-[#1a1304] text-xs font-bold rounded-full uppercase tracking-wider hover:bg-[#ffe39a] shadow-[0_0_18px_rgba(249,210,116,0.45)] border border-[#f9d274] disabled:opacity-70 disabled:cursor-wait"
            >
              {buttonLoading ? (
                <svg
                  className="h-3.5 w-3.5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-25"
                  />
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    className="opacity-75"
                  />
                </svg>
              ) : (
                "Submit"
              )}
            </button>
          )}
        </div>
      </div>

      {showRules && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[92vw] sm:w-96 bg-gray-900 text-white rounded-lg shadow-2xl z-30 p-4 border border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-sm">Super 12 Rules</h3>
            <button
              onClick={() => setShowRules(false)}
              className="text-gray-400 hover:text-white text-sm"
            >
              ✕
            </button>
          </div>
          <ul className="list-decimal pl-5 space-y-1.5 text-xs text-gray-200">
            {RULES.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TopBar;
