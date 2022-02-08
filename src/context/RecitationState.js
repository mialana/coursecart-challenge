import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  selectedRecitations: []
};

export const RecitationContext = createContext(initialState);

export const RecitationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function addRecitationToList(item) {
    dispatch({
      type: "ADD_RECITATION",
      payload: item,
    });
  }
  
  function removeRecitationFromList(item) {
    dispatch({
      type: "REMOVE_RECITATION",
      payload: item,
    });
  }

  function updateRecitationList(item) {
    dispatch({
      type: "UPDATE_RECITATION_LIST",
      payload: item,
    });
  }

  return (
    <RecitationContext.Provider
      value={{
        selectedRecitations: state.selectedRecitations,
        addRecitationToList,
        removeRecitationFromList,
        updateRecitationList,
      }}
    >
      {children}
    </RecitationContext.Provider>
  );
};
