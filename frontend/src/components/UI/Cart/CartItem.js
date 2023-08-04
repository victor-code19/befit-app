import styles from "./CartItem.module.css";

const CartItem = ({ name, price, quantity, onRemove, onAdd }) => {
  const roundedPrice = `$${price.toFixed(2)}`;

  return (
    <li className={styles["cart-item"]}>
      <div>
        <h2>{name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{roundedPrice}</span>
          <span className={styles.quantity}>x {quantity}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles["remove-btn"]} onClick={onRemove}>
          -
        </button>
        <button className={styles["add-btn"]} onClick={onAdd}>
          +
        </button>
      </div>
    </li>
  );
};

export default CartItem;
