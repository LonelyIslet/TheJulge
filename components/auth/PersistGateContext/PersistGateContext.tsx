"use client";

import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "redux/store";

const PersistGateContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <PersistGate persistor={persistor} loading={null}>
      {children}
    </PersistGate>
  );
};

export default PersistGateContext;
