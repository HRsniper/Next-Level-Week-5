import type { AppProps } from "next/app";
import Head from "next/head";
import { Header, Player } from "../components";
import styles from "../styles/appWrapper.module.scss";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={styles.appWrapper}>
      <Head>
        <title>Podcast</title>
      </Head>

      <section>
        <Header />
        <Component {...pageProps} />
      </section>

      <Player />
    </main>
  );
}

export default MyApp;
