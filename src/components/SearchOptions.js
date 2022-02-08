/* 
- handles functionality that allows user to search based off of:
  - courseID/Title
  - prereqs
  - keywords within description
*/

import React, { useState } from "react";

export default (props) => {
  const [whichOption, setWhichOption] = useState("Search By Course ID");

  function switchOption (input) {
    setWhichOption(input.value)
    props.setSearchOptionState(input.selectedIndex)
  }
  return (
    <select
      className="search-options"
      name="Search Option"
      value={whichOption}
      onChange={(input) => switchOption(input.target)}
    >
      <option>Search By Course ID/Title</option>
      <option>Search By Prereq</option>
      <option>Search by Keyword</option>
    </select>
  );
};
