import React from "react";
import styles from "./CommonLayout.module.scss";

interface ILayoutProps {
  children: React.ReactNode
  position: "above" | "below"
}

const CommonLayout = ({ children, position }: ILayoutProps) => {
  const [title, content] = React.Children.toArray(children);
  const headerStyle = position === "above" ? `${styles.above}` : `${styles.below}`;

  return (
    <div className={styles.container}>
      <header className={headerStyle}>
        {title}
      </header>
      <article>
        {content}
      </article>
    </div>
  );
};

export default CommonLayout;
