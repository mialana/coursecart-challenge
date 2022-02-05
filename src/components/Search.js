import React, { useEffect, useState } from "react";
import SearchOptions from "./SearchOptions";

export default (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchOption, setSearchOption] = useState(0);

  function setSearchOptionState(input) {
    setSearchOption(input);
  }

  useEffect(() => {
    courseSearch(searchInput);
  }, [searchOption]);

  function courseSearch(input) {
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
        const includesArray = conditionalArray.map((input, index) => {
          if (indicesOfConcat.some((value) => value === index)) {
            return true;
          } else if (searchOption === 0) {
            return (
              course.dept.toLowerCase().includes(input) ||
              course.number.toString().toLowerCase().includes(input) ||
              course.title.toLowerCase().includes(input)
            );
          } else if (searchOption === 1) {
            console.log("called");
            if (course.hasOwnProperty("prereqs")) {
              if (!Array.isArray(course.prereqs)) {
                return course.prereqs.toLowerCase().includes(input);
              }

              var prereqsArray = [];
              course.prereqs.forEach((prereq) => {
                const prereqIsDeptNumber = props.allData.some((course) => {
                  var dynamicVar = course.dept;
                  var matchConcatDeptNumber = new RegExp(
                    `${dynamicVar} ([d*]?)`
                  );
                  return matchConcatDeptNumber.test(prereq);
                });
                if (prereqIsDeptNumber) {
                  const numbers = prereq.replace(/[^0-9]/gm, "");
                  var allLengths = [],
                    i;
                  for (i = 0; i < numbers.length; i++) {
                    var makeString = "",
                      j;
                    for (j = 0; j < i; j++) {
                      makeString = makeString + numbers.charAt(j).toLowerCase();
                    }
                    allLengths = [...allLengths, makeString];
                  }
                  prereqsArray = [...prereqsArray, ...allLengths];
                }

                const splitPrereqs = prereq.split(/[\s- ]+/).map((split) => {
                  return split.toLowerCase();
                });
                prereqsArray = [...prereqsArray, ...splitPrereqs];
              });

              return prereqsArray.includes(input);
            } else {
              return false;
            }
          } else if (searchOption === 2) {
            return course.description.toLowerCase().includes(input);
          } return true
        });
        return includesArray.every((i) => i === true);
      } else if (
        searchInputArray.length === 1 &&
        !hasConcatDeptNumber.includes(true) &&
        searchInputArray[0] !== ""
      ) {
        if (searchOption === 0) {
          return (
            course.dept.toLowerCase().includes(searchInputArray[0]) ||
            course.number
              .toString()
              .toLowerCase()
              .includes(searchInputArray[0]) ||
            course.title.toLowerCase().includes(searchInputArray[0])
          );
        } else if (searchOption === 1) {
          if (course.hasOwnProperty("prereqs")) {
            if (!Array.isArray(course.prereqs)) {
              return course.prereqs.toLowerCase().includes(input);
            }
            var prereqsArray = [];
            course.prereqs.forEach((prereq) => {
              const prereqIsDeptNumber = props.allData.some((course) => {
                var dynamicVar = course.dept;
                var matchConcatDeptNumber = new RegExp(`${dynamicVar} ([d*]?)`);
                return matchConcatDeptNumber.test(prereq);
              });
              if (prereqIsDeptNumber) {
                const numbers = prereq.replace(/[^0-9]/gm, "");
                var allNumLengths = [],
                  i;
                for (i = 0; i < numbers.length; i++) {
                  var makeNumString = "",
                    j;
                  for (j = 0; j < i; j++) {
                    makeNumString =
                      makeNumString + numbers.charAt(j).toLowerCase();
                  }
                  allNumLengths = [...allNumLengths, makeNumString];
                }
                prereqsArray = [...prereqsArray, ...allNumLengths];
              }

              const letters = prereq.replace(/[^a-zA-Z0-9]/gm, "");
              var allLengths = [],
                k;
              for (k = 0; k < letters.length; k++) {
                var makeString = "",
                  l;
                for (l = 0; l < k; l++) {
                  makeString = makeString + letters.charAt(l).toLowerCase();
                }
                allLengths = [...allLengths, makeString];
              }
              prereqsArray = [...prereqsArray, ...allLengths];

              const splitPrereqs = prereq.split(/[\s- ]+/).map((split) => {
                return split.toLowerCase();
              });
              prereqsArray = [...prereqsArray, ...splitPrereqs];
            });

            return prereqsArray.includes(input);
          } else {
            return false;
          }
        } else if (searchOption === 2) {
          return course.description.toLowerCase().includes(searchInputArray[0]);
        }
      } return true;
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
