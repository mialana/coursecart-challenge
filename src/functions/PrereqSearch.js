export function searchPrereqs(course, allData, amount) {
  var prereqsArray = [];
  course.prereqs.forEach((prereq) => {
    const prereqIsDeptNumber = allData.some((oneCourse) => {
      var dynamicVar = oneCourse.dept;
      var matchConcatDeptNumber = new RegExp(`${dynamicVar} ([d*]?)`);
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

    if (amount === "single") {
      const characters = prereq.replace(/[^a-zA-Z0-9]/gm, "");
      var allCharLengths = [],
        k;
      for (k = 0; k < characters.length; k++) {
        var makeCharString = "",
          l;
        for (l = 0; l < k; l++) {
          makeCharString = makeCharString + characters.charAt(l).toLowerCase();
        }
        allCharLengths = [...allCharLengths, makeCharString];
      }
      prereqsArray = [...prereqsArray, ...allCharLengths];
    }
    const splitPrereqs = prereq.split(/[\s- ]+/).map((split) => {
      return split.toLowerCase();
    });
    prereqsArray = [...prereqsArray, ...splitPrereqs];
  });
  return prereqsArray;
}
