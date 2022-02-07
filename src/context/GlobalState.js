import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  selectedList: ["CIS-110", "CIS-120", "CIS-240"],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function addItemToList(item) {
    dispatch({
      type: "ADD_ITEM",
      payload: item,
    });
  }
  function removeItemFromList(item) {
    dispatch({
      type: "REMOVE_ITEM",
      payload: item,
    });
  }

  function updateList(item) {
    dispatch({
      type: "UPDATE_LIST",
      payload: item,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        selectedList: state.selectedList,
        addItemToList,
        removeItemFromList,
        updateList
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
