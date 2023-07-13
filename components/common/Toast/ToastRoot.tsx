"use client";

import React from "react";
import useAppSelector from "redux/hooks/useAppSelector";
import Toast from "./Toast";

const ToastRoot = () => {
  const isVisible = useAppSelector((state) => { return state.toast.isShowing; });
  const message = useAppSelector((state) => { return state.toast.message; });
  if (isVisible) return <Toast message={message} />;
  return null;
};

export default ToastRoot;
