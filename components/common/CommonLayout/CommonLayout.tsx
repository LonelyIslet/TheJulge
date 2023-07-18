import React from "react";
import styles from "./CommonLayout.module.scss";

interface LayoutProps {
  children: React.ReactNode
  position: "above" | "below"
}

const CommonLayout = ({
  children,
  position,
}: LayoutProps) => {
  const [title, content] = React.Children.toArray(children);
  const headerStyle = position === "above" ? `${styles.above}` : `${styles.below}`;

  return (
    <div className={styles.container}>
      <header className={headerStyle}>
        {title}
      </header>
      <article draggable="true">
        {content}
      </article>
    </div>
  );
};

export default CommonLayout;
