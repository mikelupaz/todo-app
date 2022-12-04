import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

import { SnackbarProvider } from "notistack";

import type { AppProps } from "next/app";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

export default function App(props: MyAppProps) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SnackbarProvider
      maxSnack={3}
      variant="success"
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {getLayout(<Component {...pageProps} />)}
    </SnackbarProvider>
  );
}
