import React, { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { toast } from "react-toastify";
import { useAddMatchMutation } from '../../../app/Services/Admin/AdminMatches';

export default function CreateNewMatch({open, setOpen}) {
  const [createMatch, { isLoading }] = useAddMatchMutation();
  const [matchData, setMatchData] = useState({
    teamOneId: '',
    teamTwoId: '',
    matchTitle: '',
    matchTime: '',
    canBet: "0",
    canShow: "1",
    betStatus: "dont_process"
  });

  const onSubmit = async () => {
    if (!matchData.matchTitle.trim()) {
      toast.error('Match title is required');
      return;
    }

    if (!matchData.teamOneId || !matchData.teamTwoId) {
      toast.error('Both teams are required');
      return;
    }

    if (!matchData.matchTime) {
      toast.error('Match time is required');
      return;
    }

    try {
      await createMatch(matchData).unwrap();
      toast.success('Match created successfully');
      setOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to create match');
      console.error('Error details:', error);
    }
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-[45]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-gray-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full sm:max-w-md sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                <UserGroupIcon aria-hidden="true" className="size-6 text-green-600" />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" className="text-base font-semibold text-gray-100">
                  Create New Match
                </DialogTitle>
                <div className="mt-4 space-y-4">
                  <input
                    type="text"
                    value={matchData.matchTitle}
                    onChange={(e) => setMatchData({...matchData, matchTitle: e.target.value})}
                    placeholder="Enter match title"
                    className="w-full bg-gray-900 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  
                  <input
                    type="datetime-local"
                    value={matchData.matchTime}
                    onChange={(e) => setMatchData({...matchData, matchTime: e.target.value})}
                    className="w-full bg-gray-900 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <input
                    type="text"
                    value={matchData.teamOneId}
                    onChange={(e) => setMatchData({...matchData, teamOneId: e.target.value})}
                    placeholder="Enter Team One"
                    className="w-full bg-gray-900 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <input
                    type="text" 
                    value={matchData.teamTwoId}
                    onChange={(e) => setMatchData({...matchData, teamTwoId: e.target.value})}
                    placeholder="Enter Team Two"
                    className="w-full bg-gray-900 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={matchData.canBet === "1"}
                        onChange={(e) => setMatchData({...matchData, canBet: e.target.checked ? "1" : "0"})}
                        className="mr-2"
                      />
                      Can Bet
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={matchData.canShow === "1"}
                        onChange={(e) => setMatchData({...matchData, canShow: e.target.checked ? "1" : "0"})}
                        className="mr-2"
                      />
                      Can Show
                    </label>
                  </div>

                  <select
                    value={matchData.betStatus}
                    onChange={(e) => setMatchData({...matchData, betStatus: e.target.value})}
                    className="w-full bg-gray-900 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="dont_process">Don't Process</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={onSubmit}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? 'Creating...' : 'Create Match'}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}