import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Theme } from "@radix-ui/themes";
import { SessionProvider } from "next-auth/react";
import Header from "@/shared/components/Header";
import "@radix-ui/themes/styles.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Theme accentColor="indigo" grayColor="slate" radius="large">
        <Header />
        <Component {...pageProps} />
      </Theme>
    </SessionProvider>
  );
}
