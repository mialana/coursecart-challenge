import React from "react";
import "./App.css";

import Nav from "./components/Nav";
import Courses from "./components/Courses";

import { GlobalProvider } from "./context/GlobalState";
import { RecitationProvider } from "./context/RecitationState";

export default () => {
  return (
    <div className="App">
      <RecitationProvider>
      <GlobalProvider>
        <Nav />
        <div
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "0 calc(1rem + 10%)",
          }}
        ></div>
        <Courses />
      </GlobalProvider>
      </RecitationProvider>
    </div>
  );
};
