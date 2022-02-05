import React, { useState } from "react";
import data from "../data/courses";
import Search from "./Search";
import Filter from "./Filter";

export default () => {
  const [courses, setCourses] = useState(data);
  const [allData, setAllData] = useState(data);

  function printCourses() {
    return courses.map(({ dept, number, title }) => (
      <p key={`${dept}-${number}`}>
        {dept} {number} {title}
      </p>
    ));
  }

  function setCoursesState(input) {
    const changedCourses = [...input]
    setCourses(changedCourses);
  }

  function setAllDataState(input) {
    const changedAllData = [...input]
    setAllData(changedAllData);
  }

  return (
    <div>
      <Search setCoursesState={setCoursesState} allData={allData} />
      <Filter
        courses={courses}
        allData={allData}
        setCoursesState={setCoursesState}
        setAllDataState={setAllDataState}
      />
      <div>{printCourses()}</div>
    </div>
  );
};
