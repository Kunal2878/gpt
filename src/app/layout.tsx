import type { Metadata } from "next";
import { Inter,Nunito } from "next/font/google";
import {ReduxProvider} from './store/index'
import "./globals.css";
import configureAmplifyClient from './amplify-cognito_config'
import Head from 'next/head';
import { Provider } from 'react-redux';
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
         <Head> <link rel="icon" href="/favicon.ico"/></Head>
      <body className={inter.className}>
    
        <ReduxProvider>
          {children}
        </ReduxProvider>
 
        {/* {configureAmplifyClient()} */}
      </body>
    </html>
  );
}
