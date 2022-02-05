import React, { useState } from "react";

export default (props) => {
  const [filterOption, setFilterOption] = useState("Sort By Number Low-High");

  function courseFilter(input) {
    setFilterOption(input);
    if (input === "Sort By Number Low-High") {
      const filteredCourses = props.courses.sort((a, b) => {
        return a.number - b.number;
      });
      props.setCoursesState(filteredCourses);
      const filteredAllData = props.allData.sort((a, b) => {
        return a.number - b.number;
      });
      props.setAllDataState(filteredAllData);
    }
    if (input === "Sort By Number High-Low") {
      const filteredCourses = props.courses.sort((a, b) => {
        return b.number - a.number;
      });
      props.setCoursesState(filteredCourses);
      const filteredAllData = props.allData.sort((a, b) => {
        return b.number - a.number;
      });
      props.setAllDataState(filteredAllData);
    }
    if (input === "Sort By Title A-Z") {
      const filteredCourses = props.courses.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        return 0;
      });
      props.setCoursesState(filteredCourses);
      const filteredAllData = props.allData.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        return 0;
      });
      props.setAllDataState(filteredAllData);
    }
    if (input === "Sort By Title Z-A") {
      const filteredCourses = props.courses.sort((a, b) => {
        if (b.title.toLowerCase() < a.title.toLowerCase()) return -1;
        if (b.title.toLowerCase() > a.title.toLowerCase()) return 1;
        return 0;
      });
      props.setCoursesState(filteredCourses);
      const filteredAllData = props.allData.sort((a, b) => {
        if (b.title.toLowerCase() < a.title.toLowerCase()) return -1;
        if (b.title.toLowerCase() > a.title.toLowerCase()) return 1;
        return 0;
      });
      props.setAllDataState(filteredAllData);
    }
  }
  
  return (
    <div>
      <select
        name="Filter"
        value={filterOption}
        onChange={(input) => courseFilter(input.target.value)}
      >
        <option>Sort By Number Low-High</option>
        <option>Sort By Number High-Low</option>
        <option>Sort By Title A-Z</option>
        <option>Sort By Title Z-A</option>
      </select>
    </div>
  );
};
