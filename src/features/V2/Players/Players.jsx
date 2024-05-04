import React from "react";
import { useGetPlayerQuestionsQuery } from "../../../app/Services/playersApi";
import Loader from "../../../Components/Loader";

function Players() {
    const {
        data: playerQuestions,
        isLoading,
        isError,
    } = useGetPlayerQuestionsQuery();

    if (isLoading) {
        return <Loader />;
    }
    return <div>Players</div>;
}

export default Players;
