import type UserKind from './UserKind.ts';

interface Fan extends UserKind {
  type: 'fan';
  username: string;
  websiteUrl: string;
  followingGenresCount: number;
  followingArtistsAndLabelsCount: number;
  wishlistItemCount: number;
  collectionItemCount: number;
}

export interface FanItemsContinuation {
  fanId: number;
  token: string;
}

export default Fan;
