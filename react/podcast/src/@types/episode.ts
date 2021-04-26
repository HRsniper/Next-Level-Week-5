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
  duration: number;
  url: string;
};

export type { EpisodeType };
