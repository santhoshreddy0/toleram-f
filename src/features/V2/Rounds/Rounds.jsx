import React from "react";
import { useGetRoundsQuery } from "../../../app/Services/roundsApi";
import Loader from "../../../Components/Loader";
import MenuTabs from "../../Layout/MenuTabs";

function Rounds() {
    const { data: rounds, isLoading, isError } = useGetRoundsQuery();

    console.log(rounds);
    if (isLoading) {
        return <Loader />;
    }
    return (
        <>
            <MenuTabs>Rounds</MenuTabs>
        </>
    );
}

export default Rounds;
