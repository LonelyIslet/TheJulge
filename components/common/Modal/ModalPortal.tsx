"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalPortalProps {
  children: React.ReactNode;
}

const ModalPortal = ({
  children,
}: ModalPortalProps) => {
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
