import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { GetStaticProps } from "next";
import { EpisodeType } from "../../@types/episode";
import { api } from "../../services/api";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";
import styles from "./styles.module.scss";

type EpisodeQuerySlugType = {
  episode: string;
};

type EpisodeProps = {
  episode: EpisodeType;
};

function Episode({ episode }: EpisodeProps) {
  return (
    <>
      <h1>
        {styles}
        {episode.thumbnail}
      </h1>
    </>
  );
}

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
export { getStaticProps };
