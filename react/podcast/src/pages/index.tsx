import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { EpisodeType } from "../@types/episode";
import { api } from "../services/api";
import styles from "../styles/home.module.scss";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

type DurationAsStringAndUrl = {
  durationAsString: string;
  url: string;
};

type HomeProps = {
  // episodes: EpisodeType[];
  allEpisodes: Array<EpisodeType & DurationAsStringAndUrl>;
  latestEpisodes: Array<EpisodeType & DurationAsStringAndUrl>;
};

function Home({ allEpisodes, latestEpisodes }: HomeProps) {
  return (
    <div className={styles.homePage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos laçamentos</h2>
        <ul>
          {latestEpisodes.map((episode) => {
            return (
              <li key={episode.id}>
                <Image src={episode.thumbnail} alt={episode.title} width={192} height={192} objectFit="cover" />

                <div className={styles.episodeDetails}>
                  <Link href={`/episode/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.published_at}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type="button">
                  <img src="/play-green.svg" alt="Tocar" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode) => {
              return (
                <tr key={episode.id}>
                  <td className={styles.tdImage}>
                    <Image src={episode.thumbnail} alt={episode.title} width={120} height={120} objectFit="cover" />
                  </td>
                  <td>
                    <Link href={`/episode/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td className={styles.tdPublishedAt}>{episode.published_at}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type="button">
                      <img src="/play-green.svg" alt="Tocar" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

const getStaticProps: GetStaticProps = async () => {
  // const response = await fetch("http://localhost:3333/episodes?_limit=12&_sort=published_at&_order=desc");
  // const data = await response.json();

  const { data } = await api.get("episodes", {
    params: { _limit: 12, _sort: "published_at", _order: "desc" }
  });

  // const dataTyped = data as Array<EpisodeType>;
  const dataTyped = data as EpisodeType[];

  const episodes = dataTyped.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      members: episode.members,
      published_at: format(parseISO(episode.published_at), "d MMM yy", { locale: ptBR }),
      thumbnail: episode.thumbnail,
      // description: episode.description,
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url
    };
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      allEpisodes: allEpisodes,
      latestEpisodes: latestEpisodes
    },
    //          60 * 60 * 8 = 8 horas
    revalidate: 60 * 60 * 8
  };
};

export default Home;
export { getStaticProps };
