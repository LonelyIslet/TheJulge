import React from "react";
import styles from "./CommonLayout.module.scss";

const CommonLayout = ({ children, isGray }: { children: React.ReactNode }) => {
  const [title, content] = React.Children.toArray(children);

  return (
    <div className={styles.container}>
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
