"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ModalPortal = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);

    return () => { return setMounted(false); };
  }, []);

  const el = typeof window !== "undefined" && document.getElementById("modal-root");
  if (!mounted) return null;
  return createPortal(children, el as HTMLElement);
};

export default ModalPortal;
