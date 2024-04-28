import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import BaseAppWrapper from "./BaseWrapper";
import ReduxWrapper from "./ReduxWrapper";
const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Octo - The smart learning AI tutor",
  description: "Octo is a smart learning AI tutor that helps you learn better and faster.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxWrapper>
      <BaseAppWrapper fontFamily={poppins.className}>{children}</BaseAppWrapper>
    </ReduxWrapper>
  );
}
