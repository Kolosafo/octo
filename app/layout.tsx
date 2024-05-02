import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ReduxWrapper from "./ReduxWrapper";
import dynamic from "next/dynamic";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Octo - The smart learning AI tutor",
  description:
    "Octo is a smart learning AI tutor that helps you learn better and faster.",
  icons: {
    icon: "/octo.svg",
  },
};

const BaseAppWrapper = dynamic(
  () => import("./BaseWrapper").then((mod) => mod.default),
  { ssr: false }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxWrapper>
      <body className={poppins.className}>
        <BaseAppWrapper fontFamily={poppins.className}>
          {children}
          <div id="portal"></div>
        </BaseAppWrapper>
      </body>
    </ReduxWrapper>
  );
}
