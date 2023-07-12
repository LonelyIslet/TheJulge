import { EmployerTable } from "components/post/table";
import styles from "./page.module.scss";

const HomePage = () => {
  return (
    <main className={styles.main}>
      <h1>더줄게</h1>
      <EmployerTable
        data={[
          {
            id: 0,
            name: "박지석",
            intro: "소개",
            phoneNumber: "010-1234-1234",
            state: <div>aa</div>,
          },
          {
            id: 1,
            name: "박지석",
            intro: "소개",
            phoneNumber: "010-1234-1234",
            state: <div>aa</div>,
          },
          {
            id: 2,
            name: "박지석",
            intro: "소개",
            phoneNumber: "010-1234-1234",
            state: <div>aa</div>,
          },
        ]}
        currentPage={5}
        lastPage={6}
      />
    </main>
  );
};

export default HomePage;
