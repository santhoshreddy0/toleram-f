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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from "./Components/Admin/index";
import AdminMatches from "./Components/Admin/Matches/AdminMatches";
import AdminTournament from "./Components/Admin/Teams/AdminTournament";
import AdminTeams from "./Components/Admin/Teams/AdminTeams";
import AdminTeamDetails from "./Components/Admin/Teams/AdminTeamDetails";
import AdminMatchDetails from "./Components/Admin/Matches/AdminMatchDetails";

function App() {
    moment.tz.setDefault();
    const store_token = useSelector((state) => state.auth.JWTtoken);
    const storage_token = localStorage.getItem("token");

    if (!!store_token || !!storage_token) {
        return (
            <Layout>
                <Protected>
                    <ToastContainer 
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                        transition: Bounce
                        style={{zIndex: -1}}
                    />
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

                        {/* mayuris work */}
                        <Route path="/admin" Component={AdminDashboard} />
                        <Route path="/admin/teams" Component={AdminTeams} />
                        <Route path="/admin/teams/:teamId" Component={AdminTeamDetails} />

                        <Route path="/admin/matches" Component={AdminMatches} />
                        <Route path="/admin/matches/:matchId" Component={AdminMatchDetails} />

                        <Route path="/admin/tournament" Component={AdminTournament} />


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
