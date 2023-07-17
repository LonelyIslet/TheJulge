import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.animation} />
    </div>
  );
};

export default Loader;
