/* 
- global function that is called in Search
- handles prereq search functionality
- compares search input to all prereqs based on dissected strings
  from searchPrereqs
- also handles special cases:
    - if the user searches a prereq by concatenating both the 
    dept and number (i.e. cis110)
    - if the user enters > 1 word into search bar
    - if the user enters words out of order

*/

import { searchPrereqs } from "../functions/PrereqSearch";

export function searchIncludes(
  condArr,
  concatIndices,
  course,
  searchOption,
  allData,
  firstInput,
  amount
) {
  if (amount === "multiple") {
    const includesArray = condArr.map((input, index) => {
      if (concatIndices.some((value) => value === index)) {
        return true;
      } else if (searchOption === 0) {
        return (
          course.dept.toLowerCase().includes(input) ||
          course.number.toString().toLowerCase().includes(input) ||
          course.title.toLowerCase().includes(input)
        );
      } else if (searchOption === 1) {
        if (course.hasOwnProperty("prereqs")) {
          if (!Array.isArray(course.prereqs)) {
            return course.prereqs.toLowerCase().includes(input);
          }
          var prereqsArray = searchPrereqs(course, allData, "multiple");

          return prereqsArray.includes(input);
        } else {
          return false;
        }
      } else if (searchOption === 2) {
        return course.description.toLowerCase().includes(input);
      }
      return true;
    });
    return includesArray;
  }
  if (amount === "single") {
    if (searchOption === 0) {
      return (
        course.dept.toLowerCase().includes(firstInput) ||
        course.number.toString().toLowerCase().includes(firstInput) ||
        course.title.toLowerCase().includes(firstInput)
      );
    } else if (searchOption === 1) {
      if (course.hasOwnProperty("prereqs")) {
        if (!Array.isArray(course.prereqs)) {
          return course.prereqs.toLowerCase().includes(firstInput);
        }
        var prereqsArray = searchPrereqs(course, allData, "single");
        return prereqsArray.includes(firstInput);
      } else {
        return false;
      }
    } else if (searchOption === 2) {
      return course.description.toLowerCase().includes(firstInput);
    }
  }
}
