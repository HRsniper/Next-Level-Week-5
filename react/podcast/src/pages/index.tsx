import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { GetStaticProps } from "next";
import { api } from "../services/api";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

type FileType = {
  url: string;
  type: string;
  duration: number;
};

type EpisodeType = {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
  file: FileType;
};

type DurationAsStringAndUrl = {
  durationAsString: string;
  url: string;
};

type HomeProps = {
  episodes: Array<EpisodeType & DurationAsStringAndUrl>;
  // episodes: EpisodeType[];
};

function Home({ episodes }: HomeProps) {
  return <div>{JSON.stringify(episodes[0].published_at)}</div>;
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
      description: episode.description,
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url
    };
  });

  return {
    props: {
      episodes: episodes
    },
    //          60 * 60 * 8 = 8 horas
    revalidate: 60 * 60 * 8
  };
};

export default Home;
export { getStaticProps };
