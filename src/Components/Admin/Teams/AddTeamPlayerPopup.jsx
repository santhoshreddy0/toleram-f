import React, { useState, useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { toast } from "react-toastify";
import { useAddPlayerToTeamMutation } from '../../../app/Services/Admin/AdminTeams';
import { useParams } from 'react-router-dom';

export default function AddTeamPlayerPopup({open, setOpen, player}) {
  const { teamId } = useParams();
  const [addplayer, { isLoading, isError }] = useAddPlayerToTeamMutation(teamId);
  
  const [playerName, setPlayerName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [role, setRole] = useState('batsman');

  useEffect(() => {
    if (player) {
      setPlayerName(player.name || '');
      setRole(player.player_role || 'batsman');
    }
  }, [player]);

  const playerRoles = [
    'batsman',
    'bowler',
    'all-rounder',
    'wicket-keeper'
  ];
  
  const onSubmit = async () => {
    try {
      const res = await addplayer({
        name: playerName,
        role: role,
        teamId: teamId,
        imageUrl: "https://files.hubhopper.com/podcast/337445/cric-it-with-badri_1453.png?v=1637821458&s=hh-web-app",
      }).unwrap();
      resetForm();
      setOpen(false);
      toast.success('Player added successfully');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to add player');
      console.error('Error details:', error);
    }
  };
  
  // Helper function to convert file to base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  
  const resetForm = () => {
    setPlayerName('');
    setImageFile(null);
    setRole('batsman');
  };

  return (
    <Dialog 
      open={open} 
      onClose={() => {
        resetForm();
        setOpen(false);
      }} 
      className="relative z-[45]"
    >
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
                  {player ? 'Edit Player' : 'Add New Player'}
                </DialogTitle>
                <div className="mt-4 space-y-4">
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Enter player name"
                    className="w-full bg-gray-900 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                  />
                  
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-gray-900 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                  >
                    {playerRoles.map((role) => (
                      <option key={role} value={role} className="bg-gray-900">
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Uplaod player image
                    </label>
                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-600 px-6 py-4">
                      <div className="text-center">
                        <div className="mt-1 flex text-sm text-gray-400">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-medium text-indigo-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-300"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={(e) => setImageFile(e.target.files[0])}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={onSubmit}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? (player ? 'Updating...' : 'Adding...') : (player ? 'Update Player' : 'Add Player')}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}