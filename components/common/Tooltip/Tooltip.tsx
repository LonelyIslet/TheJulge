import React from "react";
import classNames from "classnames/bind";
import styles from "./Tooltip.module.scss";

const cx = classNames.bind(styles);

interface TooltipProps {
  isVisible: boolean;
  message: string;
}

const Tooltip = ({ isVisible, message }: TooltipProps) => {
  return (
    <div className={cx("container", !isVisible && "hidden")}>
      {message}
    </div>
  );
};

export default Tooltip;
