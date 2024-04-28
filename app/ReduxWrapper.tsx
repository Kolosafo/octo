import { ReduxProvider } from "@/redux/provider";
import React from "react";

const ReduxWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <ReduxProvider>{children}</ReduxProvider>
    </html>
  );
};

export default ReduxWrapper;
