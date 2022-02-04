import React, { useState } from "react";
import data from "../data/courses";

export default () => {
  const [searchInput, setSearchInput] = useState("");
  const [courses, setCourses] = useState(data);

  function printCourses() {
    return courses.map(({ dept, number }) => (
      <p key={`${dept}-${number}`}>
        {dept} {number}
      </p>
    ));
  }

  function filterSearch(event) {
    event.preventDefault();

    const lowercasedSearchInput = searchInput.toLowerCase();
    const searchInputArray = lowercasedSearchInput.split(/[\s- ]+/);

    const hasConcatDeptNumber = searchInputArray.map((input) => {
      return data.some(
        (course) =>
          course.dept.toLowerCase() + course.number.toString().toLowerCase() ===
          input
      );
    });

    var indicesOfConcat = [],
      i;

    for (i = 0; i < hasConcatDeptNumber.length; i++)
      if (hasConcatDeptNumber[i] === true) indicesOfConcat.push(i);

    var concatArray = [],
      j;

    for (j = 0; j < indicesOfConcat.length; j++) {
      const temp = searchInputArray[indicesOfConcat[j]]
        .split(/([0-9]+)/)
        .filter(Boolean);
      concatArray = [...concatArray, ...temp];
    }

    const filteredCourses = data.filter((course) => {
      if (searchInputArray.length > 1 || hasConcatDeptNumber.includes(true)) {
        const conditionalArray = hasConcatDeptNumber.includes(true)
          ? [...searchInputArray, ...concatArray]
          : searchInputArray;
        const includesArray = conditionalArray.map((input, index) => {
          if (indicesOfConcat.some((value) => value === index)) {
            return true;
          }
          return (
            course.dept.toLowerCase().includes(input) ||
            course.number.toString().toLowerCase().includes(input) ||
            course.title.toLowerCase().includes(input) ||
            course.description.toLowerCase().includes(input)
          );
        });
        return includesArray.every((i) => i === true);
      } else if (
        searchInputArray.length === 1 &&
        !hasConcatDeptNumber.includes(true)
      ) {
        return (
          course.dept.toLowerCase().includes(searchInputArray[0]) ||
          course.number
            .toString()
            .toLowerCase()
            .includes(searchInputArray[0]) ||
          course.title.toLowerCase().includes(searchInputArray[0]) ||
          course.description.toLowerCase().includes(searchInputArray[0])
        );
      } else {
        return true;
      }
    });
    setCourses(filteredCourses);
  }

  return (
    <div>
      <form onSubmit={filterSearch}>
        <input
          name="SearchBar"
          value={searchInput}
          placeholder="Search"
          onChange={(input) => setSearchInput(input.target.value)}
        ></input>
        <button type="submit">Search</button>
      </form>
      <div>{printCourses()}</div>
    </div>
  );
};
