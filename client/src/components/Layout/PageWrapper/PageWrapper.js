import styles from "./PageWrapper.module.css";

const PageWrapper = (props) => {
  return <section className={styles.wrapper}>{props.children}</section>;
};

export default PageWrapper;
