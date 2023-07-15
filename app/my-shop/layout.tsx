import styles from "./page.module.scss";

interface MyShopPageProps {
  children: React.ReactNode;
}

const layout = ({
  children,
}: MyShopPageProps) => {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  );
};

export default layout;
