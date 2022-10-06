export interface allCharacters {
  id: string;
  name: string;
  description: string;
  resourceURI: string;
  thumbnail: thumbnail;
}

export interface thumbnail {
  extension: string;
  path: string;
}
