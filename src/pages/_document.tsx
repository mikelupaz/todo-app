import Document, { Html, Head, Main, NextScript } from "next/document";
import { getInitColorSchemeScript } from "@mui/material/styles";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head title="My TODO App">
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <body>
          {getInitColorSchemeScript()}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
