"use client";

import useClickOutside from "hooks/useClickOutside";
import React, { useRef } from "react";

interface PopoverProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Popover = React.memo(({ onClose, children }: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  useClickOutside(popoverRef, onClose);
  return (
    <div style={{ position: "absolute" }} ref={popoverRef}>
      {children}
    </div>
  );
});

export default Popover;
