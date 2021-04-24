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

export type { EpisodeType };
