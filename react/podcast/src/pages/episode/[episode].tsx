import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { EpisodeType } from "../../@types/episode";
import { api } from "../../services/api";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";
import styles from "./styles.module.scss";

type EpisodeQuerySlugType = {
  episode: string;
};

type DurationAsStringAndUrl = {
  durationAsString: string;
  url: string;
};

type EpisodeProps = {
  episode: EpisodeType & DurationAsStringAndUrl;
};

function Episode({ episode }: EpisodeProps) {
  return (
    <div className={styles.episodeContainer}>
      <div className={styles.thumbnail}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>

        <Image src={episode.thumbnail} alt={episode.title} width={700} height={160} objectFit="cover" />

        <button type="button">
          <img src="/play.svg" alt="Tocar" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.published_at}</span>
        <span>{episode.durationAsString}</span>
      </header>

      {/* <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }} /> */}
      <div className={styles.description}>
        {episode.description.split("</p>").map((e, _i, a) => {
          const n = a.length - 1;
          const string = e.replace("<p>", "");
          delete a[n];
          return <p key={Math.random()}>{string}</p>;
        })}
      </div>
    </div>
  );
}

const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking" // blocking
  };
};

const getStaticProps: GetStaticProps = async (context) => {
  const { episode } = context.params as EpisodeQuerySlugType;

  const { data } = await api.get(`/episodes/${episode}`, {});

  const dataTyped = data as EpisodeType;

  const episodeSlug = {
    id: dataTyped.id,
    title: dataTyped.title,
    members: dataTyped.members,
    published_at: format(parseISO(dataTyped.published_at), "d MMM yy", { locale: ptBR }),
    thumbnail: dataTyped.thumbnail,
    description: dataTyped.description,
    duration: Number(dataTyped.file.duration),
    durationAsString: convertDurationToTimeString(Number(dataTyped.file.duration)),
    url: dataTyped.file.url
  };

  return {
    props: { episode: episodeSlug },
    //          60 * 60 * 24 * 30 = 1 mes
    revalidate: 60 * 60 * 24 * 30
  };
};

export default Episode;
export { getStaticProps, getStaticPaths };
