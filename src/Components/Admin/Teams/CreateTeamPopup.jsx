import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import {
  useAddImageUrlMutation,
  useCreateTeamMutation,
  useUpdateTeamsDetailsMutation,
} from "../../../app/Services/Admin/AdminTeams";
import UploadImage from "../../UploadImage/Index";

export default function CreateTeamPopup({ open, setOpen, selectedTeam }) {
  const [createTeam, { isLoading: isCreateLoading }] = useCreateTeamMutation();
  const [updateTeam, { isLoading: isUpdateLoading }] =
    useUpdateTeamsDetailsMutation(selectedTeam?.id);
  const [addImageUrl, { isLoading: isAddImageLoading }] =
    useAddImageUrlMutation();

  // Use useEffect to reset the form when the popup opens/closes or selectedTeam changes
  useEffect(() => {
    if (open) {
      setTeamName(selectedTeam?.team_name || "");
      setImageFile(null);
      setImageUrl("");
    }
  }, [open, selectedTeam]);

  const [teamName, setTeamName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const isLoading = isCreateLoading || isUpdateLoading;
  const isEditMode = Boolean(selectedTeam);

  const onSubmit = async () => {
    if (!teamName.trim()) {
      toast.error("Team name is required");
      return;
    }

    if (!imageUrl && !isEditMode) {
      toast.error("Team image is required");
      return;
    }

    try {
      const payload = {
        teamName,
        teamId: selectedTeam?.id,
        imageUrl: imageUrl
      }; 

      if (isEditMode) {
        await updateTeam(payload).unwrap();
        toast.success("Team updated successfully");
      } else {
        await createTeam(payload).unwrap();
        toast.success("Team created successfully");
      }

      setOpen(false);
    } catch (error) {
      toast.error(
        error?.data?.message ||
          `Failed to ${isEditMode ? "update" : "create"} team`
      );
      console.error("Error details:", error);
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
                <UserGroupIcon
                  aria-hidden="true"
                  className="size-6 text-green-600"
                />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-100"
                >
                  {isEditMode ? "Edit Team" : "Create New Team"}
                </DialogTitle>
                <div className="mt-4">
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter team name"
                    className="w-full bg-gray-900 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
            <UploadImage
              placeholder={"Upload team logo"}
              updateImageUrl={setImageUrl}
              existingImageUrl={selectedTeam?.team_logo}
            />
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={onSubmit}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading
                  ? isEditMode
                    ? "Updating..."
                    : "Creating..."
                  : isEditMode
                  ? "Update Team"
                  : "Create Team"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
