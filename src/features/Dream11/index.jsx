import React, { useState } from "react";
import Dream11Leaderboard from "./Leaderboard";

import { Tab } from "@headlessui/react";
import MenuTabs from "../Layout/MenuTabs";
import Dream11Team from "./Team";

function Dream11() {
  const [activeTab, setActiveTab] = useState('Team');
  return (
    <MenuTabs>
      <div className="w-full max-w-md mx-auto">
      <div className="flex w-full border border-gray-700 rounded-md overflow-hidden mb-4">
        <button
          onClick={() => setActiveTab('Team')}
          className={`flex-1 py-2 text-sm font-medium border-r border-gray-700 transition-colors duration-200 ${
            activeTab === 'Team'
              ? "bg-indigo-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Team
        </button>
        <button
          onClick={() => setActiveTab('Leaderboard')}
          className={`flex-1 py-2 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'Leaderboard'
              ? "bg-indigo-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Leaderboard
        </button>
      </div>
      
      <div>
        {activeTab === 'Team' && <Dream11Team />}
        {activeTab === 'Leaderboard' && <Dream11Leaderboard />}
      </div>
    </div>
    </MenuTabs>
  );
}

export default Dream11;
