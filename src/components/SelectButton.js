import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export default ({ lecSections, handleSelection, addToArray }) => {
  const { selectedList } = useContext(GlobalContext);

  function sliceRecitation(recitation) {
    return recitation.id.substring(
      (recitation.id.indexOf("-", 1 + recitation.id.indexOf("-")) + 1)
    );
  }

  return (
    <div className="button-overall">
      {!Array.isArray(lecSections) && (
        <button
          className={handleSelection(lecSections, "select")}
          id="select-button"
          onClick={(event) => {
            event.stopPropagation();
            addToArray(lecSections, "selected");
          }}
        >
          {selectedList.includes(lecSections) && <div>x</div>}
          {!selectedList.includes(lecSections) && <div>+</div>}
        </button>
      )}
      {Array.isArray(lecSections) &&
        lecSections.map((section) => {
          return (
            <button
              key={section.id}
              className={handleSelection(section.id, "select")}
              id="select-button"
              onClick={(event) => {
                event.stopPropagation();
                addToArray(section.id, "selected");
              }}
            >
              {selectedList.includes(section.id) && <div>{sliceRecitation(section)} x</div>}
              {!selectedList.includes(section.id) && <div>{sliceRecitation(section)} +</div>}
            </button>
          );
        })}
    </div>
  );
};
