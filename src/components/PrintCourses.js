/* 
- main hub that handles all of printing for courses and calls 
  other components when necesssary
- handles the detection of more than one section of the same course,
  and passes that information to SelectButton
- contains helper functions addToArray and handleRecitation
  that add and remove items from global state variables selectedList 
  and selectedRecitations
    - contains functionality that ensures user can't pick more than
    one section and more than one recitation of the same course
- contains helper function handleSelection that updates state of
  printed course depending on if selected, if opened, and 
  if has available recitation
- handles state variable that stores which details are open at any
  given time
*/

import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { RecitationContext } from "../context/RecitationState";
import { showDetails } from "../functions/CourseDetails";
import SelectButton from "./SelectButton";
import RecitationSelection from "./RecitationSelection";

export default (props) => {
  const [courses, setCourses] = useState(props.courses);
  const [detailsOpen, setDetailsOpen] = useState([]);
  const [hasRecitation, setHasRecitation] = useState([]);
  const { selectedList } = useContext(GlobalContext);
  const { addItemToList } = useContext(GlobalContext);
  const { removeItemFromList } = useContext(GlobalContext);
  const { selectedRecitations } = useContext(RecitationContext);
  const { addRecitationToList } = useContext(RecitationContext);
  const { removeRecitationFromList } = useContext(RecitationContext);

  useEffect(() => {
    const updatedCourses = props.courses;
    setCourses([...updatedCourses]);
  }, [props.courses]);

  function slice(course) {
    return course.id.substring(
      0,
      course.id.indexOf("-", 1 + course.id.indexOf("-"))
    );
  }

  function setHasRecitationState(input) {
    if (!hasRecitation.includes(input)) {
      const addHasRecitation = [...hasRecitation, input];
      setHasRecitation(addHasRecitation);
    }
  }

  function handleRecitation(recitation) {
    const recitationSliced = slice(recitation);
    if (selectedRecitations.includes(recitation)) {
      removeRecitationFromList(recitation);
    } else if (
      selectedRecitations.some((rec) => {
        return slice(rec) === recitationSliced;
      })
    ) {
      return;
    }
    if (!selectedRecitations.includes(recitation)) {
      addRecitationToList(recitation);
    }
  }

  function addToArray(key, array) {
    if (array === "selected") {
      if (selectedList.includes(key)) {
        removeItemFromList(key);
      } else if (!selectedList.includes(key)) {
        if (selectedList.length >= 7) {
          return;
        }
        const sliceKey =
          key.match(/-/g).length === 2
            ? key.substring(0, key.indexOf("-", 1 + key.indexOf("-")))
            : key;
        if (
          selectedList.some((course) => {
            const sliceCourse =
              course.match(/-/g).length === 2
                ? course.substring(
                    0,
                    course.indexOf("-", 1 + course.indexOf("-"))
                  )
                : course;
            return sliceCourse.includes(sliceKey);
          })
        ) {
          return;
        }
        addItemToList(key);
      }
    } else if (array === "details") {
      if (detailsOpen.includes(key)) {
        let removedDescription = detailsOpen;
        removedDescription = removedDescription.filter(
          (course) => course !== key
        );
        setDetailsOpen(removedDescription);
      } else if (!detailsOpen.includes(key)) {
        let addedDescription = detailsOpen;
        addedDescription = [...addedDescription, key];
        setDetailsOpen(addedDescription);
      }
    }
  }

  function handleSelection(lecSections, action) {
    if (!Array.isArray(lecSections)) {
      if (action === "select") {
        if (selectedList.includes(lecSections)) {
          return "is-selected";
        }
        return "not-selected";
      }
      if (action === "open") {
        if (detailsOpen.includes(lecSections)) {
          return "is-opened";
        }
        
        return "not-opened";
      }
      if (action === "recitation") {
        if (selectedList.includes(lecSections)) {
          if (
            hasRecitation.some((id) => {
              return id === lecSections;
            })
          ) {
            return "recitation-available";
          }
        }
        return "rec-not-available";
        
      }
    }
    if (Array.isArray(lecSections)) {
      if (action === "select") {
        if (
          lecSections.some((section) => {
            return selectedList.includes(section.id);
          })
        ) {
          return "is-selected";
        }
        return "not-selected";
      }
      if (action === "open") {
        if (
          lecSections.some((section) => {
            return detailsOpen.includes(slice(section));
          })
        ) {
          return "is-opened";
        }
        return "not-opened";
      }
      if (action === "recitation") {
        if (
          lecSections.some((section) => {
            return selectedList.includes(section.id);
          })
        ) {
          if (
            hasRecitation.some((id) => {
              return id === slice(lecSections[0]);
            })
          ) {
            return "recitation-available";
          }
        }
        return "rec-not-available";
      }
    }
  }

  return courses.map((course) => {
    var lecSections;
    if (course.hasOwnProperty("sections") && course.sections.length === 0) {
      lecSections = course.id;
    } else if (course.hasOwnProperty("sections")) {
      lecSections = course.sections.filter(
        (section) => section.activity === "LEC"
      );
    } else {
      lecSections = `${course.dept}-${course.number}`;
    }
    const courseID = `${course.dept}-${course.number}`;

    return (
      <div
        key={`${course.dept}-${course.number}`}
        className={`${handleSelection(lecSections, "select")} ${handleSelection(
          lecSections,
          "open"
        )} ${handleSelection(lecSections, "recitation")}`}
        id="select-box"
        onClick={() => addToArray(`${course.dept}-${course.number}`, "details")}
      >
        <div className="all-text">
          <div className="text">
            <strong>
              {course.dept} {course.number} {course.title}
            </strong>
          </div>
          {detailsOpen.includes(`${course.dept}-${course.number}`) && (
            <div className="course-details">
              {showDetails(course, lecSections)}
            </div>
          )}
        </div>

        <SelectButton
          lecSections={lecSections}
          handleSelection={handleSelection}
          addToArray={addToArray}
        />

        <RecitationSelection
          course={course}
          courseID={courseID}
          handleRecitation={handleRecitation}
          setHasRecitationState={setHasRecitationState}
        />
      </div>
    );
  });
};
