import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/5.8.6/reset.min.css"
        />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
