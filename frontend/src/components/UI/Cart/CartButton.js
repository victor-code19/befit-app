import { useContext } from "react";
import CartIcon from "./CartIcon";
import CartContext from "../../../store/cart-context";

import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const cartItemsLength = cartCtx.items.length;
  return (
    <button
      disabled={!cartItemsLength}
      className={classes["cart-btn"]}
      onClick={props.onClick}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.amount}>{cartItemsLength}</span>
    </button>
  );
};

export default CartButton;
