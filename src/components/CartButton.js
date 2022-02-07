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
    <div>
      <button className="cart-button" onClick={() => bringToCart()}>
        <img src={Cart} alt="Shopping Cart" className="cart-png"></img>
        {selectedList.length}
      </button>
    </div>
  );
};
