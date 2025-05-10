import React, { useState } from "react";
import EditTeam from "./EditTeam";
import TeamDetails from "./TeamDetails";

const ViewTeam = ({teamData}) => {

    const [showEditTeam, setShowEditTeam] = useState(false);
    const toggleEditMode = () => {
        setShowEditTeam(!showEditTeam);
    };
  return (
   <>
   {!showEditTeam ? <TeamDetails teamData={teamData} handleEdit={toggleEditMode} /> : <EditTeam teamData={teamData} handleEdit={toggleEditMode} />}

   </>
  );
}
export default ViewTeam;