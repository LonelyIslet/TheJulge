import React from "react";
import styles from "./CommonLayout.module.scss";

const CommonLayout = ({ children, isGray }) => {
  const layoutStyle = isGray ? `${styles.layout} ${styles.gray}` : `${styles.layout}`;

  const [title, content] = React.Children.map(children, (child, index) => { return child; });
  return (
    <div className={layoutStyle}>
      <div className={styles.container}>
        <header>
          {title}
        </header>
        <main>
          {content}
        </main>
      </div>
    </div>
  );
};

export default CommonLayout;
