import type { Metadata } from "next";
import { Inter,Nunito } from "next/font/google";
import "./globals.css";
import configureAmplifyClient from './amplify-cognito_config'
import Head from 'next/head';
const inter = Nunito({ subsets: ["latin"] });
import { AppWrapper } from './index'
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
         <Head> <link rel="icon" href="/logo.svg"/></Head>
      <body className={inter.className}>
        <AppWrapper>
          {children}
        </AppWrapper>
        {/* {configureAmplifyClient()} */}
      </body>
    </html>
  );
}
