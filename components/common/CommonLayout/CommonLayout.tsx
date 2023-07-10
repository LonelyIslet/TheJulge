import React from "react";
import styles from "./CommonLayout.module.scss";

interface ILayoutProps {
  children: React.ReactNode
  position: "above" | "below"
}

const CommonLayout = ({ children, position }): ILayoutProps => {
  const [title, content] = React.Children.toArray(children);
  // position === 'above' 일 때 header의 margin 24px
  // position === 'below' 일 때 header의 margin 32px

  return (
    <div className={styles.container}>
      <header>
        {title}
      </header>
      <article>
        {content}
      </article>
    </div>
  );
};

export default CommonLayout;
