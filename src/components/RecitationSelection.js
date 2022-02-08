/* 
- component that handles printing of recitation numbers if a course with
  a recitation has been selected
- checks selectedReciations global variable
- changes state of individual recitation when selected
- only allows selection of one recitation
- briefly utilizes framer-motion npm packages 
    - (honestly not super familiar with this package, but wanted to try
      something new for this challenge)
*/

import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { RecitationContext } from "../context/RecitationState";
import { AnimatePresence, motion } from "framer-motion";

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
        if (props.course.sections.length > 0) {
          if (props.course.sections[0].hasOwnProperty("associated_sections")) {
            if (Array.isArray(props.course.sections[0].associated_sections)) {
              if (props.course.sections[0].associated_sections.length > 0) {
                props.setHasRecitationState(props.course.id);
                return props.course.sections[0].associated_sections.map(
                  (recitation) => {
                    return (
                      <AnimatePresence key={recitation.id}>
                        <motion.div
                          key={recitation.id}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 0.5 }}
                          exit={{ opacity: 0, height: 0 }}
                          onClick={(event) => {
                            event.stopPropagation();
                            props.handleRecitation(recitation);
                          }}
                          className={changeClass(recitation)}
                        >
                          {recitation.id}
                        </motion.div>
                      </AnimatePresence>
                    );
                  }
                );
              }
            }
          }
        }
      }
    }
  }

  return (
    <div className="recitations">
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
