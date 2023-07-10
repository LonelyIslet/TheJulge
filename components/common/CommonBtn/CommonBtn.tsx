"use client";

import classNames from "classnames/bind";
import { ButtonType, ButtonSize } from "types/enums/button.enum";
import styles from "./CommonBtn.module.scss";

const cx = classNames.bind(styles);

type ClickHandler = (e: React.MouseEvent) => void;

interface CommonBtnProps {
  type?: ButtonType;
  size?: ButtonSize;
  message?: string;
  onClick?: ClickHandler;
  responsive?: boolean;
}

const CommonBtn = ({
  type = ButtonType.SOLID, size = ButtonSize.LARGE, message = "button", onClick, responsive = false,
}: CommonBtnProps) => {
  return (
    <button type="button" className={cx("button", `${type}`, `${size}`, { responsive })} onClick={onClick} disabled={type === ButtonType.DISABLE}>
      {message}
    </button>
  );
};

export default CommonBtn;
