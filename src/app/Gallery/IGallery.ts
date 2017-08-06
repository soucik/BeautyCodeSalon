export interface OutFbAlbum {
  created_time: string;
  id: string;
}

export interface FbAlbum {
  hairID: string;
  lashesID: string;
  wimpersID: string
  extensionsID: string;
  nailsID: string;
  hairPicturesIDs?: Array<OutFbAlbum>;
  lashesPicturesIDs?: Array<OutFbAlbum>;
  wimpersPicturesIDs?: Array<OutFbAlbum>;
  extensionsPicturesIDs?: Array<OutFbAlbum>;
  nailsPicturesIDs?: Array<OutFbAlbum>
}

export interface OutFbPhoto {
  is_silhouette: string;
  url: string;
}