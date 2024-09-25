import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type { PropsWithChildren } from "react";
import { default as data } from "../../package.json";

export const runtime = "edge";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "mozaic.fm",
  description: "next generation web podcast",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

type Props = PropsWithChildren;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <p>
          {data.version}
          {/** TODO: remove me */}
        </p>
        {children}
      </body>
    </html>
  );
}
