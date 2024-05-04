import React from "react";
import { useGetRoundsQuery } from "../../../app/Services/roundsApi";
import Loader from "../../../Components/Loader";

function Rounds() {
    const { data: rounds, isLoading, isError } = useGetRoundsQuery();

    console.log(rounds);
    if (isLoading) {
        return <Loader />;
    }
    return <div>Rounds</div>;
}

export default Rounds;
