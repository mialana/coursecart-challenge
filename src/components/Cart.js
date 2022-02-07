import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export default (props) => {
  const { selectedList } = useContext(GlobalContext);
  const { updateList } = useContext(GlobalContext);
  const { removeItemFromList } = useContext(GlobalContext);

  function changePreferences(key, direction) {
    if (direction === "up") {
      if (selectedList.indexOf(key) === 0) {
        return;
      }
      let movedUp = selectedList.map((course, i) => {
        if (selectedList[i + 1] === key) {
          return key;
        } else if (course === key) {
          return selectedList[i - 1];
        } else {
          return course;
        }
      });
      updateList(movedUp);
    }
    if (direction === "down") {
      if (selectedList.indexOf(key) === selectedList.length - 1) {
        return;
      }
      let movedDown = selectedList.map((course, i) => {
        if (selectedList[i - 1] === key) {
          return key;
        } else if (course === key) {
          return selectedList[i + 1];
        } else {
          return course;
        }
      });
      updateList(movedDown);
    }
  }

  function printSelections() {
    return selectedList.map((selection, index) => (
      <div key={selection}>
        <div>
          {index + 1} {selection}
        </div>
        <button onClick={() => removeItemFromList(selection)}>X</button>
        <button onClick={() => changePreferences(selection, "up")}> Up </button>
        <button onClick={() => changePreferences(selection, "down")}> Down </button>
      </div>
    ));
  }

  return (
    <div>
      <div>{printSelections()}</div>
      <button onClick={() => props.setDisplayState("courses")}>Back</button>
    </div>
  );
};
