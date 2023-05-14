import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./features/Auth/Login";
import Register from "./features/Register";
import Matches from "./features/Matches";
import Bets from "./features/Bets";
import "../src/tailwind.css";
import Index from "./features/Home/Index";
import Layout from "./features/Layout/Layout";

function App() {
  const token = localStorage.getItem("token");
  const [userToken, setUserToken] = useState(token);

  if (
    userToken == null ||
    userToken == "null" ||
    userToken == "undefined" ||
    userToken == undefined
  ) {
    return (
      <Layout user={false}>
        <Routes>
          <Route
            path="/login"
            Component={() => <Login setUserToken={setUserToken} />}
          />
          {/* <Route path='/register' Component={Register}/> */}
          <Route path="*" Component={Index} />
        </Routes>
      </Layout>
    );
  }
  return (
    <Layout user={true} setUserToken={setUserToken}>
      <Routes>
        <Route path="/matches" Component={Matches} />
        <Route path="/bets" Component={Bets} />
        <Route path="*" Component={Matches} />
      </Routes>
    </Layout>
  );
}

export default App;
