import { Fragment } from "react";
import ReactDOM from "react-dom";

import styles from "./WarningModal.module.css";

const Backdrop = ({ onConfirm }) => {
  return <div className={styles.backdrop} onClick={onConfirm}></div>;
};

const ModalOverlay = ({ title, message, onConfirm }) => {
  return (
    <div className={styles.modal}>
      <header className={styles.header}>
        <h2>{title}</h2>
      </header>
      <div className={styles.content}>
        <p>{message}</p>
      </div>
      <footer className={styles.actions}>
        <button onClick={onConfirm}>Confirm</button>
      </footer>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = ({ title, message, onConfirm }) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onConfirm={onConfirm} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay title={title} message={message} onConfirm={onConfirm} />,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
