import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./features/Auth/Login";
import "../src/tailwind.css";
import Index from "./features/Home/Index";
import Layout from "./features/Layout/Layout";
import { useSelector } from "react-redux";
import Protected from "./features/Auth/Protected";
import Rules from "./features/Rules";
import moment from "moment-timezone";
import Matches from "./features/V2/Matches";
import Rounds from "./features/V2/Rounds";
import Players from "./features/V2/Players";

function App() {
    moment.tz.setDefault("Africa/Lagos");
    const store_token = useSelector((state) => state.auth.JWTtoken);
    const storage_token = localStorage.getItem("token");

    if (!!store_token || !!storage_token) {
        return (
            <Layout>
                <Protected>
                    <Routes>
                        <Route path="/matches" Component={Matches} />
                        <Route path="/rounds" Component={Rounds} />
                        <Route path="/players" Component={Players} />
                        <Route path="/rules" Component={Rules} />
                        <Route path="*" Component={Rules} />
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
