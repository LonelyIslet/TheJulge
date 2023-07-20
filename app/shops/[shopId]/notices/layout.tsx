import styles from "./page.module.scss";

interface NoticePageProps {
  children: React.ReactNode
}

const layout = ({
  children,
}: NoticePageProps) => {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  );
};

export default layout;
