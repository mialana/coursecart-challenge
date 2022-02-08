/*
- global state variable: selectedList
= contains functionality for adding to list, removing from list, and completely
  replacing list
- (i'm not too familiar with using the react context api for global state handling.
  i wanted to try using it briefly for this project, and will definitely continue
  learning how to use it properly in the future.)
*/

import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  selectedList: [],
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
        updateList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
