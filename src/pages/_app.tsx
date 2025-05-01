import "@/styles/globals.scss";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import NProgress from "nprogress";
import Head from "next/head";
import { parseCookies } from "nookies";
import { Router } from "next/router";
import React, { Fragment, ReactElement, ReactNode } from "react";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "@/store";
import 'antd/dist/reset.css'; // use reset.css for AntD v5+
// import 'antd/dist/antd.min.css';
import {
  createCache,
  StyleProvider,
} from '@ant-design/cssinjs';
import type Entity from '@ant-design/cssinjs/es/Cache';
import { renderToString } from 'react-dom/server';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  access_token: string;
  user_info: any;
  category_list: any;
  signInPrivacy: string;
  userType: string;
};
NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
const MyApp = ({ Component, pageProps, ...props }: AppPropsWithLayout) => {
  const isAdminRoute =
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/admin");
  const getLayout = Component.getLayout ?? ((page) => page);
  const cache = React.useMemo<Entity>(() => createCache(), []);
  return (
    <Fragment>
      
      <StyleProvider cache={cache}>
      <Provider store={store}>
      {isAdminRoute ? (
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
      ) : (
        <Head>
          <title>Copper & Crumb</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta name="description" content="Wide Selection of Music Artists." />
          <link
            rel="stylesheet"
            href="https://unpkg.com/treeflex/dist/css/treeflex.css"
          ></link>
          {/* <link rel="icon" href="public%favicon.ico" /> */}
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />

          {/* <style jsx global>{`
      * {
        font-family: ${montserrat.style.fontFamily} !important; 
      }
    `}</style> */}
        </Head>
      )}
      <Script id="my-script" strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-FVXPLF125R', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-FVXPLF125R"
      ></Script>
        <Script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBioMK31w2-759jRzfev6Tpkdj9pe2eKrw"
    async
    defer
  ></Script>
      {getLayout(
        <>
          <Component {...pageProps} />
          {/* <ScrollToTop /> */}
          <ToastContainer />
        </>
      )}
      </Provider>
      </StyleProvider>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    </Fragment>
  );
};

// MyApp.getInitialProps = async (context: any) => {
  // const accessToken = parseCookies(context.ctx)[
  //   COOKIES_USER_COPPER_CRUMB_ACCESS_TOKEN
  // ];
  // try {
  //   if (accessToken) {
  //     crumbApi.setToken(accessToken);
  //     let apiRes = await crumbApi.Auth.profile();
  //     const user_info = { ...apiRes.customer };
  //     return { user_info: { ...user_info, access_token: accessToken } };
  //   }
  //   return { user_info: { access_token: accessToken } };
  // } catch (error: any) {
  //   return { user_info: { access_token: accessToken } };
  // }
// };

export default MyApp;
