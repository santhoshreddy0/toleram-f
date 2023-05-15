import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./features/Auth/Login";
import Register from "./features/Register";
import Matches from "./features/Matches";
import "../src/tailwind.css";
import Index from "./features/Home/Index";
import Layout from "./features/Layout/Layout";
import { useSelector } from "react-redux";
import Protected from "./features/Auth/Protected";

function App() {
  const store_token = useSelector((state) => state.auth.JWTtoken);
  const storage_token = localStorage.getItem("token");
  if (!!store_token || !!storage_token) {
    return (
      <Layout>
        <Protected>
          <Routes>
            <Route path="/matches" Component={Matches} />
            {/* <Route path="/bets" Component={Bets} /> */}
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