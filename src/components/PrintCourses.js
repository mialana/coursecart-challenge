import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { AnimatePresence, motion } from "framer-motion";

export default (props) => {
  const [courses, setCourses] = useState(props.courses);
  const { selectedList } = useContext(GlobalContext);
  const { addItemToList } = useContext(GlobalContext);
  const { removeItemFromList } = useContext(GlobalContext);
  const [descriptionOpen, setDescriptionOpen] = useState([]);

  useEffect(() => {
    const updatedCourses = props.courses;
    setCourses([...updatedCourses]);
  }, [props.courses]);

  function addToArray(key, array) {
    if (array === "selected") {
      if (selectedList.includes(key)) {
        removeItemFromList(key);
      } else if (!selectedList.includes(key)) {
        if (selectedList.length >= 7) {
          return;
        }
        addItemToList(key);
      }
    } else if (array === "description") {
      if (descriptionOpen.includes(key)) {
        let removedDescription = descriptionOpen;
        removedDescription = removedDescription.filter(
          (course) => course !== key
        );
        setDescriptionOpen(removedDescription);
      } else if (!descriptionOpen.includes(key)) {
        let addedDescription = descriptionOpen;
        addedDescription = [...addedDescription, key];
        setDescriptionOpen(addedDescription);
      }
    }
  }

  function handleSelection(key) {
    if (selectedList.includes(key)) {
      return "is-selected";
    }
    return "not-selected";
  }

  return courses.map(({ dept, number, title, description }, i) => (
    <div
      key={`${dept}-${number}`}
      className={handleSelection(`${dept}-${number}`)}
      onClick={() => addToArray(`${dept}-${number}`, "description")}
    >
      <div>
        {dept} {number} {title}
      </div>
      <AnimatePresence>
        {descriptionOpen.includes(`${dept}-${number}`) && (
          <motion.div
            className="course-details"
            key={`${dept}-${number}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 0.5 }}
            exit={{ opacity: 0, height: 0 }}
          >
            {description}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className="select-button"
        onClick={(event) => {
          event.stopPropagation();
          addToArray(`${dept}-${number}`, "selected");
        }}
      >
        O
      </button>
    </div>
  ));
};
