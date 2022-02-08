import React, { useContext } from "react";
import Cart from "./imgs/Cart.png";
import { GlobalContext } from "../context/GlobalState";

export default (props) => {
  const { selectedList } = useContext(GlobalContext);

  function bringToCart() {
    if (selectedList.length === 0) {
      alert("Your Cart is Empty! Select Courses First");
      return;
    } else if (selectedList.length > 0) {
      props.setDisplayState("cart");
    }
  }

  return (
      <button className="cart-overall" onClick={() => bringToCart()}>
        <img src={Cart} alt="Shopping Cart" className="cart-png"></img>
        <div className="cart-amount">{selectedList.length}</div>
      </button>

  );
};
