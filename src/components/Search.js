import React, { useEffect, useState } from "react";
import SearchOptions from "./SearchOptions";
import { searchIncludes } from "../functions/SearchResults";

export default (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchOption, setSearchOption] = useState(0);

  useEffect(() => {
    courseSearch(searchInput);
  }, [searchOption]);

  function setSearchOptionState (input) {
    setSearchOption(input);
  }

  function courseSearch (input) {
    setSearchInput(input);

    const lowercasedSearchInput = input.toLowerCase();
    const searchInputArray = lowercasedSearchInput.split(/[\s- ]+/);

    const hasConcatDeptNumber = searchInputArray.map((input) => {
      return props.allData.some((course) => {
        var dynamicVar = course.dept.toLowerCase();
        var matchConcatDeptNumber = new RegExp(dynamicVar + "([d*]?)");

        return matchConcatDeptNumber.test(input);
      });
    });

    var indicesOfConcat = [],
      i;
    for (i = 0; i < hasConcatDeptNumber.length; i++)
      if (hasConcatDeptNumber[i] === true) indicesOfConcat.push(i);

    var concatArray = [],
      j;
    for (j = 0; j < indicesOfConcat.length; j++) {
      const splitArray = searchInputArray[indicesOfConcat[j]]
        .split(/([0-9]+)/)
        .filter(Boolean);
      concatArray = [...concatArray, ...splitArray];
    }

    const searchedCourses = props.allData.filter((course) => {
      if (searchInputArray.length > 1 || hasConcatDeptNumber.includes(true)) {
        const conditionalArray = hasConcatDeptNumber.includes(true)
          ? [...searchInputArray, ...concatArray]
          : searchInputArray;
        const includesArray = searchIncludes(
          conditionalArray,
          indicesOfConcat,
          course,
          searchOption,
          props.allData,
          "",
          "multiple"
        );
        return includesArray.every((i) => i === true);
      } else if (
        searchInputArray.length === 1 &&
        !hasConcatDeptNumber.includes(true) &&
        searchInputArray[0] !== ""
      ) {
        return searchIncludes(
          [],
          [],
          course,
          searchOption,
          props.allData,
          searchInputArray[0],
          "single"
        );
      }
      return true;
    });
    props.setCoursesState(searchedCourses);
  }

  return (
    <div>
      <input
        name="SearchBar"
        value={searchInput}
        placeholder="Search"
        onChange={(input) => courseSearch(input.target.value)}
      ></input>
      <SearchOptions setSearchOptionState={setSearchOptionState} />
    </div>
  );
};
