import React from "react";

export function showDetails(course, lecSections) {
  let object = Array.isArray(lecSections) ? lecSections : [course];
  return (
    <div>
      {!object[0].hasOwnProperty("id") && (
        <div>No Additional Info Available</div>
      )}

      {object[0].hasOwnProperty("id") &&
        object.map((obj) => {
          return (
            <div key={obj.id}>
              <div>
                {obj.hasOwnProperty("meetings") &&
                  obj.id &&
                  obj.meetings.map((meeting) => {
                    return (
                      <div
                        key={`${meeting.day}-${meeting.start}-${meeting.end}`}
                      >
                        {meeting.day} {meeting.start}-{meeting.end}
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}

      {course.hasOwnProperty("prerequisites") && (
        <div>{course.prerequisites}</div>
      )}

      {course.hasOwnProperty("difficulty") && <div>{course.difficulty}</div>}

      <div>{course.description}</div>
    </div>
  );
}
