import React from 'react';
import { useGetDream11TeamQuery } from '../../app/Services/dream11Api';
import Dream11TeamDisplay from './ViewTeam';
import Loader from '../../Components/Loader';
import CreateTeam from './CreateTeam';
import ViewTeam from './ViewTeam';
import MenuTabs from '../Layout/MenuTabs';


const Dream11 = () => {
  const {
    data: teamData,
    isLoading: teamLoading,
    isError,
    error: errorMessage,
  } = useGetDream11TeamQuery();

  if (teamLoading) {
    return <Loader />;
  }

  if (isError && errorMessage?.status !== 404) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600 my-4">
        <p>{errorMessage?.data?.message || 'Error fetching team data'}</p>
        <button 
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  const hasTeam = teamData?.team && teamData.team.length > 0;

  return (
    <MenuTabs >
    <div className="team-container rounded-lg shadow-sm">
      {hasTeam ? (
        <ViewTeam teamData={teamData}/>
      ) : (
       <CreateTeam />
      )}
    </div>
    </MenuTabs>
  );
};

export default Dream11;