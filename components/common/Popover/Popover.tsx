"use client";

import useClickOutside from "hooks/useClickOutside";
import React, { useRef } from "react";

type Unit = "px" | "rem" | "em" | "%" | "vh" | "vw" | "vmin" | "vmax";
type InsetValue = `${number}${Unit}`;

interface PopoverProps {
  top?:InsetValue,
  left?:InsetValue,
  right?:InsetValue,
  bottom?:InsetValue,
  onClose: () => void;
  children: React.ReactNode;
}

const Popover = React.memo(({
  top, left, right, bottom, onClose, children,
}: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  useClickOutside(popoverRef, onClose);
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        top: `${top ?? "auto"}`,
        left: `${left ?? "auto"}`,
        right: `${right ?? "auto"}`,
        bottom: `${bottom ?? "auto"}`,
      }}
      ref={popoverRef}
    >
      {children}
    </div>
  );
});

export default Popover;
