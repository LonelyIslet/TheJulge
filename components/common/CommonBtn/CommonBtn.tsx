"use client";

import classNames from "classnames/bind";
import { ButtonStyle, ButtonSize } from "types/enums/button.enum";
import styles from "./CommonBtn.module.scss";

const cx = classNames.bind(styles);

type ClickHandler = (e: React.MouseEvent) => void;

interface ICommonBtnProps {
  type?: "button" | "submit";
  style?: ButtonStyle;
  size?: ButtonSize;
  children: React.ReactNode;
  onClick?: ClickHandler | undefined;
  responsive?: boolean;
}

const CommonBtn = ({
  type = "button",
  style = ButtonStyle.SOLID,
  size = ButtonSize.LARGE,
  onClick = undefined,
  responsive = false,
  children,
}: ICommonBtnProps) => {
  const buttonClassName = cx(
    "button",
    `${style}`,
    `${size}`,
    { responsive },
  );
  return (
    <button
      type={type}
      className={buttonClassName}
      onClick={onClick}
      disabled={style === ButtonStyle.DISABLE}
    >
      {children}
    </button>
  );
};

export default CommonBtn;
