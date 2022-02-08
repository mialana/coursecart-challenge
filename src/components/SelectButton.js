import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export default ({ lecSections, handleSelection, addToArray }) => {
  const { selectedList } = useContext(GlobalContext);

  return (
    <div>
      {!Array.isArray(lecSections) && (
        <button
          className={handleSelection(lecSections)}
          id="select-button"
          onClick={(event) => {
            event.stopPropagation();
            addToArray(lecSections, "selected");
          }}
        >
          {selectedList.includes(lecSections) && <div>O</div>}
          {!selectedList.includes(lecSections) && <div>X</div>}
        </button>
      )}
      {Array.isArray(lecSections) &&
        lecSections.map((section) => {
          return (
            <button
              key={section.id}
              className={handleSelection(section.id)}
              id="select-button"
              onClick={(event) => {
                event.stopPropagation();
                addToArray(section.id, "selected");
              }}
            >
              {selectedList.includes(section.id) && <div>X</div>}
              {!selectedList.includes(section.id) && <div>O</div>}
            </button>
          );
        })}
    </div>
  );
};
