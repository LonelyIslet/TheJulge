"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import ToastPortal from "./ToastPortal";
import styles from "./Toast.module.scss";

const cx = classNames.bind(styles);

interface ToastProps {
  message: string;
}

const Toast = ({
  message,
}: ToastProps) => {
  const [isShowing, setIsShowing] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowing(false);
    }, 2800);

    return () => { return clearTimeout(timeout); };
  }, []);
  return (
    <ToastPortal>
      <div
        className={cx(styles.toast, { [styles.fadeIn]: isShowing, [styles.fadeOut]: !isShowing })}
      >
        <span>{message}</span>
      </div>
    </ToastPortal>
  );
};

export default Toast;
