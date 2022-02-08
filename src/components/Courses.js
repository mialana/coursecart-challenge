import React, { useState } from "react";
import data from "../data/courses";
import Search from "./Search";
import Filter from "./Filter";
import Cart from "./Cart";
import CartButton from "./CartButton";
import PrintCourses from "./PrintCourses";
import Nav from "./Nav";

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
    <div className="bottom">
      <div className={display} id="course-component">
        <div className="nav-cart">
          <div className="spacer"></div>
          <Nav />

          <CartButton setDisplayState={setDisplayState} display={display} />
        </div>
        <div className="search-filter">
          <Search setCoursesState={setCoursesState} allData={allData} />
          <div className="spacer search-filter"></div>
          <Filter
            courses={courses}
            allData={allData}
            setCoursesState={setCoursesState}
            setAllDataState={setAllDataState}
          />
        </div>
        <div>
          <PrintCourses courses={courses} />
        </div>
      </div>
      <div className={display} id="cart-component">
        <Cart setDisplayState={setDisplayState} display={display} />
      </div>
    </div>
  );
};
