import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import data from "../data/courses";

export default (props) => {
  const { selectedList } = useContext(GlobalContext);
  const { updateList } = useContext(GlobalContext);
  const { removeItemFromList } = useContext(GlobalContext);

  const selectedObjects = selectedList.map((selection) => {
    const sliceSelection =
      selection.match(/-/g).length === 2
        ? selection.substring(
            0,
            selection.indexOf("-", 1 + selection.indexOf("-"))
          )
        : selection;
    var index;
    data.forEach((course, i) => {
      if (`${course.dept}-${course.number}` === sliceSelection) {
        index = course;
      }
    });
    return index;
  });

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
          {index + 1} {selection} {selectedObjects[index].title}
        </div>
        <button onClick={() => removeItemFromList(selection)}>X</button>
        <button onClick={() => changePreferences(selection, "up")}>Up</button>
        <button onClick={() => changePreferences(selection, "down")}>Down</button>
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
