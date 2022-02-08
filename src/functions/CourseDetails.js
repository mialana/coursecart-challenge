/* 
- global function that is called in PrintCourses.
- handles window that appears when a course is clicked 
- loops through data to detect whether a course has any of the given features:
  - Days of week and time of day of course sections
  - Course rating
  - Prerequisites
  - Description
*/

import React from "react";

export function showDetails(course, lecSections) {
  let object = Array.isArray(lecSections) ? lecSections : [course];
  return (
    <div className="details-overall">
      <div className="additional-info">
        {(!object[0].hasOwnProperty("id") && (
          <div><p>No Additional Info Available</p></div>
        )) ||
          (object[0].hasOwnProperty("id") &&
            object.map((obj) => {
              return (
                <div key={obj.id}>
                  <div>
                    <p>
                      <strong>{obj.id}: </strong>
                    </p>
                    {obj.hasOwnProperty("meetings") &&
                      obj.id &&
                      obj.meetings.map((meeting) => {
                        return (
                          <div
                            key={`${meeting.day}-${meeting.start}-${meeting.end}`}
                          >
                            <strong>{meeting.day}</strong> {meeting.start}-
                            {meeting.end}
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            }))}

        {course.hasOwnProperty("prerequisites") && course.prerequisites !== "" && (
          <div>
            <p>
              <strong>Prerequisites: </strong>
            </p>
            {course.prerequisites}
          </div>
        )}

        {course.hasOwnProperty("difficulty") && (
          <div>
              <p><strong>Rating: </strong>{course.difficulty}</p>
          </div>
        )}
      </div>

      <div className="description"><p><strong>Description: </strong></p>{course.description}</div>
    </div>
  );
}
