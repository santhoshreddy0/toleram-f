import React, { useState } from "react";
import { 
  PlusCircleIcon, 
  UserGroupIcon, 
  UserPlusIcon, 
  QuestionMarkCircleIcon,
  ChevronDownIcon 
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { useAddMatchMutation } from "../app/Services/adminMatchesApi";


const Admin = () => {
  const [activeTab, setActiveTab] = useState("addMatch");
  const [
    addMatch,
    {
      isLoading: updateMatchBetsLoading,
      isError: updateMatchBetsError,
      isSuccess: isUpdateSuccess,
    },
  ] = useAddMatchMutation();

  // Form states
  const [matchData, setMatchData] = useState({
    teamOneId: 0,
    teamTwoId: 0,
    matchTitle: "",
    matchTime: "",
    canBet: 1,
    canShow: 1,
    betStatus: "dont_process",
  });

  const [teamData, setTeamData] = useState({
    name: "",
    logo: "",
    description: "",
  });

  const [playerData, setPlayerData] = useState({
    name: "",
    team: "",
    position: "",
  });

  const [questionData, setQuestionData] = useState({
    question: "",
    options: ["", ""],
    correctAnswer: "",
  });

  const tabs = [
    { id: "addMatch", label: "Add Match", icon: PlusCircleIcon },
    { id: "createTeam", label: "Create Team", icon: UserGroupIcon },
    { id: "addPlayer", label: "Add Player", icon: UserPlusIcon },
    { id: "addQuestions", label: "Match Questions", icon: QuestionMarkCircleIcon },
  ];

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    // Handle form submission logic here
    // console.log(`${type} submitted:`, 
    //   type === "match" ? matchData : 
    //   type === "team" ? teamData : 
    //   type === "player" ? playerData : 
    //   questionData
    // );

    try {
      const res = await addMatch({
        // matchId:2,
        // data: {
        matchData
        // },
      }).unwrap();
      toast.success(res?.message);
      console.log(res);
    } catch (error) {
      toast.error(error?.data?.message);
      console.log(error);
    }




  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-500 text-blue-400"
                  : "text-gray-400 hover:text-blue-400"
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Forms */}
        <div className="bg-gray-800 rounded-lg shadow p-6">
          {activeTab === "addMatch" && (
            <form onSubmit={(e) => handleSubmit(e, "match")}>
              <h2 className="text-xl font-semibold mb-4 text-gray-100">Add New Match</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Match Title"
                  className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                  value={matchData.matchTitle}
                  onChange={(e) => setMatchData({ ...matchData, matchTitle: e.target.value })}
                />
                <input
                  type="datetime-local"
                  className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-100"
                  value={matchData.matchTime}
                  onChange={(e) => {
                    // Convert to UTC
                    const localDate = new Date(e.target.value);
                    const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
                    setMatchData({ ...matchData, matchTime: utcDate.toISOString() });
                  }}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Team One ID"
                    className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                    value={matchData.teamOneId}
                    onChange={(e) => setMatchData({ ...matchData, teamOneId: e.target.value })}
                  />
                  <input
                    type="text" 
                    placeholder="Team Two ID"
                    className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                    value={matchData.teamTwoId}
                    onChange={(e) => setMatchData({ ...matchData, teamTwoId: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={matchData.canBet ?? true}
                      onChange={(e) => setMatchData({ ...matchData, canBet: e.target.checked })}
                    />
                    <label className="text-gray-100">Can Bet</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={matchData.canShow ?? true}
                      onChange={(e) => setMatchData({ ...matchData, canShow: e.target.checked })}
                    />
                    <label className="text-gray-100">Can Show</label>
                  </div>
                  <select
                    className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-100"
                    value={matchData.betStatus}
                    onChange={(e) => setMatchData({ ...matchData, betStatus: e.target.value })}
                  >
                    <option value="dont_process">Don't Process</option>
                    <option value="process">Process</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Create Match
                </button>
              </div>
            </form>
          )}

          {activeTab === "createTeam" && (
            <form onSubmit={(e) => handleSubmit(e, "team")}>
              <h2 className="text-xl font-semibold mb-4 text-gray-100">Create New Team</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Team Name"
                  className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                  value={teamData.name}
                  onChange={(e) => setTeamData({ ...teamData, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Team Logo URL" 
                  className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                  value={teamData.logo}
                  onChange={(e) => setTeamData({ ...teamData, logo: e.target.value })}
                />
                <textarea
                  placeholder="Team Description"
                  className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" 
                  value={teamData.description}
                  onChange={(e) => setTeamData({ ...teamData, description: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Question"
                  className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                  value={teamData.question}
                  onChange={(e) => setTeamData({ ...teamData, question: e.target.value })}
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={teamData.canShow ?? true}
                    onChange={(e) => setTeamData({ ...teamData, canShow: e.target.checked })}
                  />
                  <label className="text-gray-100">Can Show</label>
                </div>
                <textarea
                  placeholder="Options (one per line)"
                  className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                  value={teamData.options}
                  onChange={(e) => setTeamData({ ...teamData, options: e.target.value })}
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Create Team
                </button>
              </div>
            </form>
          )}

          {activeTab === "addPlayer" && (
            <form onSubmit={(e) => handleSubmit(e, "player")}>
              <h2 className="text-xl font-semibold mb-4 text-gray-100">Add Player to Team</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Player Name"
                  className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                  value={playerData.name}
                  onChange={(e) => setPlayerData({ ...playerData, name: e.target.value })}
                />
                <select
                  className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-100"
                  value={playerData.team}
                  onChange={(e) => setPlayerData({ ...playerData, team: e.target.value })}
                >
                  <option value="">Select Team</option>
                  {/* Add team options here */}
                </select>
                <input
                  type="text"
                  placeholder="Position"
                  className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                  value={playerData.position}
                  onChange={(e) => setPlayerData({ ...playerData, position: e.target.value })}
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Add Player
                </button>
              </div>
            </form>
          )}

          {activeTab === "addQuestions" && (
            <form onSubmit={(e) => handleSubmit(e, "question")}>
              <h2 className="text-xl font-semibold mb-4 text-gray-100">Add Match Questions</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Question"
                  className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                  value={questionData.question}
                  onChange={(e) => setQuestionData({ ...questionData, question: e.target.value })}
                />
                {questionData.options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...questionData.options];
                      newOptions[index] = e.target.value;
                      setQuestionData({ ...questionData, options: newOptions });
                    }}
                  />
                ))}
                <select
                  className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-100"
                  value={questionData.correctAnswer}
                  onChange={(e) => setQuestionData({ ...questionData, correctAnswer: e.target.value })}
                >
                  <option value="">Select Correct Answer</option>
                  {questionData.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Add Question
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;