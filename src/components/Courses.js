import React, { useState } from "react";
import data from "../data/courses";
import Search from "./Search";
import Filter from "./Filter";
import Cart from "./Cart";
import CartButton from "./CartButton";
import PrintCourses from "./PrintCourses";

export default () => {
  const [courses, setCourses] = useState(data);
  const [allData, setAllData] = useState(data);
  const [display, setDisplay] = useState("courses");

  function setCoursesState(input) {
    const changedCourses = [...input];
    setCourses(changedCourses);
  }

  function setAllDataState(input) {
    const changedAllData = [...input];
    setAllData(changedAllData);
  }

  function setDisplayState(input) {
    const changedDisplay = input;
    setDisplay(changedDisplay);
  }

  return (
    <div>
      <div className={display} id="course-component">
        <div>
          <CartButton setDisplayState={setDisplayState} display={display} />
        </div>
        <div>
          <Search setCoursesState={setCoursesState} allData={allData} />
          <Filter
            courses={courses}
            allData={allData}
            setCoursesState={setCoursesState}
            setAllDataState={setAllDataState}
          />
        </div>
        <div>
          <PrintCourses courses={courses}/>
        </div>
      </div>
      <div className={display} id="cart-component">
        <Cart setDisplayState={setDisplayState} display={display} />
      </div>
    </div>
  );
};
