import React, { useState, useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { toast } from "react-toastify";
import { useAddImageUrlMutation, useCreateTeamMutation, useUpdateTeamsDetailsMutation } from '../../../app/Services/Admin/AdminTeams';

export default function CreateTeamPopup({open, setOpen, selectedTeam}) {
  const [createTeam, { isLoading: isCreateLoading }] = useCreateTeamMutation();
  const [updateTeam, { isLoading: isUpdateLoading }] = useUpdateTeamsDetailsMutation(selectedTeam?.id);
  const [addImageUrl, { isLoading: isAddImageLoading }] = useAddImageUrlMutation();

  // Use useEffect to reset the form when the popup opens/closes or selectedTeam changes
  useEffect(() => {
    if (open) {
      setTeamName(selectedTeam?.team_name || '');
      setImageFile(null);
      setImageUrl('');
    }
  }, [open, selectedTeam]);

  const [teamName, setTeamName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const isLoading = isCreateLoading || isUpdateLoading;
  const isEditMode = Boolean(selectedTeam);

  const onSubmit = async () => {
    if (!teamName.trim()) {
      toast.error('Team name is required');
      return;
    }

    if (!imageFile && !isEditMode) {
      toast.error('Team image is required'); 
      return;
    }

    if (imageFile && imageFile.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    if (imageFile && !['image/jpeg', 'image/png', 'image/jpg'].includes(imageFile.type)) {
      toast.error('Please upload a valid image file (JPG, JPEG or PNG)');
      return;
    }

    try {
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await convertFileToBase64(imageFile);
      }

      const payload = {
        name: teamName,
        teamId: selectedTeam?.id,
        ...(imageFile && { imageUrl }),
      };

      
      if (isEditMode) {
        await updateTeam(payload).unwrap();
        toast.success('Team updated successfully');
      } else {
        await createTeam(payload).unwrap();
        toast.success('Team created successfully');
      }
      
      setOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} team`);
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
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const response = await addImageUrl({
          fileName: file.name,
          fileType: file.type
        }).unwrap();
        setImageUrl(response.imageUrl);
        setImageFile(file);
      } catch (error) {
        toast.error('Failed to generate image upload URL');
        console.error('Error:', error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-11 w-screen overflow-y-auto">
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
                  {isEditMode ? 'Edit Team' : 'Create New Team'}
                </DialogTitle>
                <div className="mt-4">
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter team name"
                    className="w-full bg-gray-900 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Uplaod team image
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
                              onChange={handleFileChange}
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
                {isLoading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Team' : 'Create Team')}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}