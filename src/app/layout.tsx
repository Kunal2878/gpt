import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import {ReduxProvider} from './store/index'
import "./globals.css";
import Head from 'next/head';

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TalkToGPT",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en" suppressHydrationWarning={true} className="dark">
         <Head> <link rel="icon" href="/favicon.ico"/></Head>
      <body className={inter.className}>
    
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
