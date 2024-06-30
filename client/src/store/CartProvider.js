import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount = state.totalAmount + action.item.price;

    const existingItem = state.items.find((item) => item.id === action.item.id);
    let updatedItems = [];

    if (existingItem) {
      const updatedExistingItem = {
        ...existingItem,
        quantity: ++existingItem.quantity,
      };

      updatedItems = state.items.map((item) =>
        item.id === action.item.id ? updatedExistingItem : item
      );
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingItem = state.items.find((item) => item.id === action.id);

    let updatedItems = [];

    if (existingItem.quantity > 1) {
      const updatedExistingItem = {
        ...existingItem,
        quantity: --existingItem.quantity,
      };

      updatedItems = state.items.map((item) =>
        item.id === action.id ? updatedExistingItem : item
      );
    } else {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    }

    const updatedTotalAmount = state.totalAmount - existingItem.price;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return {
      items: [],
      totalAmount: 0,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
  );
};

export default CartProvider;
