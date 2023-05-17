import React from "react";
import { useGetRoundsQuery } from "../../app/Services/roundsApi";
import Loader from "../../Components/Loader";
import WinnerForm from "./WinnerForm";
import { useGetWinnersBetsQuery } from "../../app/Services/winnersApi";

function index() {
  const { data: rounds, isLoading, isError } = useGetRoundsQuery();
  const {
    data: winnersData,
    isLoading: isWinnersLoading,
    isError: isWinnersError,
  } = useGetWinnersBetsQuery();

  if (isLoading || isWinnersLoading) {
    return <Loader />;
  } else if (isError || isWinnersError) {
    return <div> Unable load rounds data</div>;
  }
  const roundsData = rounds.rounds;

  if (roundsData[3].status == "1") {
    const existingData = winnersData.winners.find((w) => w?.round);
    return (
      <WinnerForm
        roundData={roundsData[3]}
        existingData={existingData ? existingData : false}
      />
    );
  } else if (roundsData[2].status == "1") {
    const existingData = winnersData.winners.find((w) => w?.round);
    return (
      <WinnerForm
        roundData={roundsData[2]}
        existingData={existingData ? existingData : false}
      />
    );
  } else if (roundsData[1].status == "1") {
    const existingData = winnersData.winners.find((w) => w?.round);
    return (
      <WinnerForm
        roundData={roundsData[1]}
        existingData={existingData ? existingData : false}
      />
    );
  } else if(roundsData[0].status == "1"){
    const existingData = winnersData.winners.find((w) => w?.round);
    return (
      <WinnerForm
        roundData={roundsData[0]}
        existingData={existingData ? existingData : false}
      />
    );
  }
  return <> No rounds Open now . Please come back after some time</>;
}

export default index;
