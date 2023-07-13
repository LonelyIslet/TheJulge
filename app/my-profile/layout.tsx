import styles from "./page.module.scss";

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className={styles.layout}>
      {children}
    </section>
  );
};

export default MyPageLayout;
