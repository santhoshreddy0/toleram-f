import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./features/Auth/Login";
import "../src/tailwind.css";
import Index from "./features/Home/Index";
import Layout from "./features/Layout/Layout";
import { useSelector } from "react-redux";
import Protected from "./features/Auth/Protected";
import Rules from "./Rules";
import moment from "moment-timezone";
import Matches from "./features/V2/Matches";
import Rounds from "./features/V2/Rounds";
import Players from "./features/V2/Players";
import RoundQuestions from "./features/V2/Rounds/Questions";
import MatchQuestions from "./features/V2/Matches/Questions";
import BetHistory from "./features/V2/History/index";
import MatchHistory from "./features/V2/History/Match";
import RoundHistory from "./features/V2/History/Round";
import BestPlayersHistory from "./features/V2/History/BestPlayers";

function App() {
    moment.tz.setDefault();
    const store_token = useSelector((state) => state.auth.JWTtoken);
    const storage_token = localStorage.getItem("token");

    if (!!store_token || !!storage_token) {
        return (
            <Layout>
                <Protected>
                    <Routes>
                        <Route path="/matches" Component={Matches} />
                        <Route path="/matches/:matchId" Component={MatchQuestions} />
                        <Route path="/rounds" Component={Rounds} />
                        <Route path="/rounds/:roundId" Component={RoundQuestions} />
                        <Route path="/players" Component={Players} />
                        <Route path="/rules" Component={Rules} />
                        <Route path="/history" Component={BetHistory} />
                        <Route path="/history/matches/:matchId" Component={MatchHistory} />
                        <Route path="/history/rounds/:roundId" Component={RoundHistory} />
                        <Route path="/history/bestPlayers" Component={BestPlayersHistory} />
                        <Route path="*" Component={Matches} />
                    </Routes>
                </Protected>
            </Layout>
        );
    }
    return (
        <Layout>
            <Routes>
                <Route path="/login" Component={Login} />
                {/* <Route path='/register' Component={Register}/> */}
                <Route path="*" Component={Index} />
            </Routes>
        </Layout>
    );
}

export default App;
