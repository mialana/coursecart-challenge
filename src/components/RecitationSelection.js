import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { RecitationContext } from "../context/RecitationState";

export default (props) => {
  const { selectedList } = useContext(GlobalContext);
  const { selectedRecitations } = useContext(RecitationContext);

  function changeClass(recitation) {
    if (selectedRecitations.includes(recitation)) {
      return "recitation-selected";
    } else if (!selectedRecitations.includes(recitation)) {
      return "rec-not-selected";
    }
  }

  function printRecitations() {
    if (props.course.hasOwnProperty("sections")) {
      if (Array.isArray(props.course.sections)) {
        if (props.course.sections[0].hasOwnProperty("associated_sections")) {
          if (Array.isArray(props.course.sections[0].associated_sections)) {
            return props.course.sections[0].associated_sections.map(
              (recitation) => {
                return (
                  <div
                    key={recitation.id}
                    onClick={(event) => {
                      event.stopPropagation();
                      props.handleRecitation(recitation);
                    }}
                    className={changeClass(recitation)}
                  >
                    {recitation.id}
                  </div>
                );
              }
            );
          }
        }
      }
    }
  }

  return (
    <div>
      {selectedList.some((selection) => {
        const sliceSelection =
          selection.match(/-/g).length === 2
            ? selection.substring(
                0,
                selection.indexOf("-", 1 + selection.indexOf("-"))
              )
            : selection;
        return sliceSelection.includes(props.courseID);
      }) && <div>{printRecitations()}</div>}
    </div>
  );
};
