import React from "react";
import { useGetPlayerQuestionsQuery } from "../../../app/Services/playersApi";
import Loader from "../../../Components/Loader";
import MenuTabs from "../../Layout/MenuTabs";

function Players() {
    const {
        data: playerQuestions,
        isLoading,
        isError,
    } = useGetPlayerQuestionsQuery();
    console.log(playerQuestions);

    if (isLoading) {
        return <Loader />;
    }
    return (
        <>
            <MenuTabs>Players</MenuTabs>
        </>
    );
}

export default Players;
