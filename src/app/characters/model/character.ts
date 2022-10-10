export interface allCharacters {
  id: number;
  name: string;
  description: string;
  resourceURI: string;
  thumbnail: thumbnail;
  series: series;
}

export interface thumbnail {
  extension: string;
  path: string;
}
export interface series {
  available: number;
  collectionURI: string;
  items: items;
}
export interface items {
  name: string;
  resourceURI: string;
}
