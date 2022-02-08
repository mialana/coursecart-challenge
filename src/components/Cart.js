/* 
- handles cart page
- prints courses in order they were selected
- prints recitations if they were selected
- allows for user to both delete and rank their choices
*/

import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import data from "../data/courses";
import { RecitationContext } from "../context/RecitationState";
import Nav from "./Nav";

export default (props) => {
  const { selectedList } = useContext(GlobalContext);
  const { updateList } = useContext(GlobalContext);
  const { removeItemFromList } = useContext(GlobalContext);
  const { selectedRecitations } = useContext(RecitationContext);

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

  function sliceCourse(course) {
    return course.substring(0, course.indexOf("-", 1 + course.indexOf("-")));
  }

  function sliceRecitation(recitation) {
    return recitation.id.substring(
      0,
      recitation.id.indexOf("-", 1 + recitation.id.indexOf("-"))
    );
  }

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

  function printRecitation(selection) {
    return selectedRecitations.map((rec) => {
      if (sliceRecitation(rec) === sliceCourse(selection)) {
        return <div>Rec: {rec.id}</div>;
      }
      return <div></div>;
    });
  }

  function printSelections() {
    return selectedList.map((selection, index) => (
      <div key={selection} className="cart-courses">
        <div className="course-recitation">
          <div className="identifier">
            <strong>{index + 1}.</strong>  {selection} {selectedObjects[index].title}
          </div>
          <div className="cart-recitation">{printRecitation(selection)}</div>
        </div>
        <div className="cart-buttons">
          <button
            className="delete"
            onClick={() => removeItemFromList(selection)}
          >
            X
          </button>
          <button
            className="up"
            onClick={() => changePreferences(selection, "up")}
          >
            Up
          </button>
          <button
            className="down"
            onClick={() => changePreferences(selection, "down")}
          >
            Down
          </button>
        </div>
      </div>
    ));
  }

  return (
    <div>
      <div className="cart-nav">
        <Nav />
      </div>
      <div className="cart-window">
        <h1 className="receipt">Receipt</h1>
        <div>{printSelections()}</div>
        <button className="back" onClick={() => props.setDisplayState("courses")}>Back</button>
      </div>
    </div>
  );
};
