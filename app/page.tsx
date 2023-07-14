import Filter from "components/common/Filter/Filter";
import styles from "./page.module.scss";

const HomePage = () => {
  return (
    <main className={styles.main}>
      <Filter />
    </main>
  );
};

export default HomePage;
