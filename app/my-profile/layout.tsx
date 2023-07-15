import styles from "./page.module.scss";

interface MyPageLayoutProps {
  children: React.ReactNode;
}

const MyPageLayout = ({
  children,
}: MyPageLayoutProps) => {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  );
};

export default MyPageLayout;
