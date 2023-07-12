"use client";

import React from "react";

interface PopoverProps {
  onClose: (e: MouseEvent) => void;
  children: React.ReactNode;
}

const Popover = React.memo(({ onClose, children }: PopoverProps) => {
  return (
    <div style={{ position: "absolute" }}>
      {children}
    </div>
  );
});

export default Popover;
