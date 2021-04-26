import type { AppProps } from "next/app";
import Head from "next/head";
import { Header, Player } from "../components";
import { PlayerContextProvider } from "../contexts/PlayerContext";
import styles from "../styles/appWrapper.module.scss";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Podcast</title>
      </Head>

      <PlayerContextProvider>
        <main className={styles.appWrapper}>
          <section>
            <Header />
            <Component {...pageProps} />
          </section>

          <Player />
        </main>
      </PlayerContextProvider>
    </>
  );
}

export default MyApp;
