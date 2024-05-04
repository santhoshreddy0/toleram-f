import React from "react";
import { useGetMatchesQuery } from "../../../app/Services/matchesApi";
import Loader from "../../../Components/Loader";
import MenuTabs from "../../Layout/MenuTabs";

function Matches() {
    const { data: matches, isLoading, isError } = useGetMatchesQuery();
    console.log(matches);

    if (isLoading) {
        return <Loader />;
    }
    return (
        <>
            <MenuTabs>
                Matches
            </MenuTabs>
        </>
    )
}

export default Matches;
