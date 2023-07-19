import styles from "./page.module.scss";

interface LayoutProp {
  children?: React.ReactNode
}

const layout = ({ children }: LayoutProp) => {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  );
};

export default layout;
