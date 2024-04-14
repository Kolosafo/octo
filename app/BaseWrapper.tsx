import { ReduxProvider } from "@/redux/provider";
import React from "react";

const BaseAppWrapper = ({
  children,
  fontFamily,
}: {
  children: React.ReactNode;
  fontFamily: any;
}) => {
  return (
    <html lang="en">
      <ReduxProvider>
        <body className={fontFamily}>
          <main className="min-h-screen max-w-[90rem] mx-auto p-10">
            {children}
          </main>
        </body>
      </ReduxProvider>
    </html>
  );
};

export default BaseAppWrapper;
