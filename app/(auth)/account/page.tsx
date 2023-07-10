import { AuthForm } from "components/auth";
import styles from "./page.module.scss";

const AccountPage = () => {
  return (
    <div className={styles.container}>
      <AuthForm />
    </div>
  );
};

export default AccountPage;
