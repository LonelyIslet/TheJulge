import { Filter } from "components/common";
import styles from "./page.module.scss";

const HomePage = () => {
  return (
    <main className={styles.main}>
      <h1>더줄게</h1>
      <Filter />
    </main>
  );
};

export default HomePage;
