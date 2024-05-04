import React from "react";
import { useGetMatchesQuery } from "../../../app/Services/matchesApi";
import Loader from "../../../Components/Loader";

function Matches() {
    const { data: matches, isLoading, isError } = useGetMatchesQuery();
    console.log(matches);

    if (isLoading) {
        return <Loader />;
    }
    return <div>Matches</div>;
}

export default Matches;
