import React from "react";
import "./App.css";

import Courses from "./components/Courses";

import { GlobalProvider } from "./context/GlobalState";
import { RecitationProvider } from "./context/RecitationState";

export default () => {
  return (
    <div className="App">
      <RecitationProvider>
        <GlobalProvider>
          <Courses />
        </GlobalProvider>
      </RecitationProvider>
    </div>
  );
};
