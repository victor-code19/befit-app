import { Fragment, useContext, useEffect } from "react";
import { useFetcher } from "react-router-dom";

import { getAuthToken } from "../../../utils/auth";

import CartModal from "../Modals/CartModal";
import CartItem from "./CartItem";
import CartContext from "../../../store/cart-context";

import styles from "./Cart.module.css";

const Cart = ({ onClose }) => {
  const cartCtx = useContext(CartContext);
  const fetcher = useFetcher();

  const hasItems = cartCtx.items.length > 0;
  const totalAmount = Math.abs(cartCtx.totalAmount.toFixed(2));

  const isSubmitting = fetcher.state === "submitting";
  const isPurchaseSuccessful = fetcher.data && fetcher.data.status === 201;

  // clear cart after purchase, used useEffect to not update state while rendering
  useEffect(() => {
    if (isPurchaseSuccessful) {
      cartCtx.clearCart();
    }
  }, [isPurchaseSuccessful]);

  // increase the quantity of cart item by one
  const addItemHandler = (item) => {
    cartCtx.addItem({
      ...item,
      quantity: item.quantity + 1,
    });
  };

  // decrease the quantity of cart item by one or remove item
  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  // use fetcher to submit data and send it to action function
  const placeOrderHandler = () => {
    fetcher.submit(
      {
        orderedService: JSON.stringify(cartCtx.items),
        totalAmount: cartCtx.totalAmount.toFixed(2),
      },
      { method: "post", action: "/cart" }
    );
  };

  // map every JavaScript object to React component
  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      price={item.price}
      quantity={item.quantity}
      onRemove={removeItemHandler.bind(null, item.id)}
      onAdd={addItemHandler.bind(null, item)}
    />
  ));

  // render cart modal
  const renderCartModal = () => {
    return (
      <CartModal onClose={onClose}>
        <h2 className={styles.header}>YOUR CART</h2>
        <ul className={styles["cart-items"]}>
          {!hasItems && <p>Cart is empty</p>}
          {cartItems}
        </ul>
        <div className={styles.total}>
          <span>Total amount</span>
          <span>${totalAmount}</span>
        </div>
        <div className={styles.actions}>
          <button className={styles["close-btn"]} onClick={onClose}>
            Close
          </button>
          {hasItems && (
            <button
              disabled={isSubmitting}
              onClick={placeOrderHandler}
              className={styles["order-btn"]}
            >
              {isSubmitting ? "Buying..." : "Buy"}
            </button>
          )}
        </div>
      </CartModal>
    );
  };

  // render message, when purchase is successful
  const renderSuccessModal = () => {
    return (
      <CartModal onClose={onClose}>
        <h2 className={styles.header}>WE GOT IT!</h2>
        <p style={{ textAlign: "center" }}>
          Your purchase was successful. We have sent you a confirmation by email.
        </p>
        <div className={styles.actions}>
          <button className={styles["close-btn"]} onClick={onClose}>
            Close
          </button>
        </div>
      </CartModal>
    );
  };

  return (
    <Fragment>{isPurchaseSuccessful ? renderSuccessModal() : renderCartModal()}</Fragment>
  );
};

export default Cart;

export const action = async ({ request }) => {
  const data = await request.formData();

  const order = {
    services: JSON.parse(data.get("orderedService")),
    totalAmount: data.get("totalAmount"),
  };

  const response = await fetch("http://localhost:8080/orders/createOrder", {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(order),
  });

  return { status: response.status };
};
