import styles from "./page.module.scss";

interface MyPageLayoutProps {
  children: React.ReactNode;
}

const MyPageLayout = ({
  children,
}: MyPageLayoutProps) => {
  return (
    <section className={styles.layout}>
      {children}
    </section>
  );
};

export default MyPageLayout;
