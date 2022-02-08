import React from 'react'
import Book from "./imgs/Book.png";

export default () => {
  return (
  <div className="nav" id="navigation">
    <img src={Book} alt="chick-pic" className="book"></img>
    <h1 className="banner">Penn Course Cart</h1>
  </div>
  )
}
