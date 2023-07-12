"use client";

import useClickOutside from "hooks/useClickOutside";
import React, { useRef } from "react";

interface PopoverProps {
  top?:number,
  left?:number,
  right?:number,
  bottom?:number,
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
        top: `${top ?? 0}rem`,
        left: `${left ?? 0}rem`,
        right: `${right ?? 0}rem`,
        bottom: `${bottom ?? 0}rem`,
      }}
      ref={popoverRef}
    >
      {children}
    </div>
  );
});

export default Popover;
