import React from "react";
import styles from "./CommonLayout.module.scss";

const CommonLayout = ({ children }) => {
  const [title, content] = React.Children.map(children, (child, index) => { return child; });
  return (
    <div className={styles.layout}>
      <header>
        {title}
      </header>
      <main>
        {content}
      </main>
    </div>
  );
};

export default CommonLayout;
