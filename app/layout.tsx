import type { Metadata } from 'next';
import { Inter, Karla } from 'next/font/google';
import './globals.css';
const karla = Karla({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Gemina",
  description: "Supercharge your kids learning with interactive lessons backed by google's gemini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={karla.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
