import BandcampFetch from './lib/BandcampFetch.ts';

export { default as BaseAPI } from './lib/common/BaseAPI.ts';
export { default as BaseAPIWithImageSupport } from './lib/common/BaseAPIWithImageSupport.ts';
export { default as AlbumAPI } from './lib/album/AlbumAPI.ts';
export { default as ArticleAPI } from './lib/article/ArticleAPI.ts';
export { default as BandAPI } from './lib/band/BandAPI.ts';
export { default as DiscoveryAPI } from './lib/discovery/DiscoveryAPI.ts';
export { default as FanAPI } from './lib/fan/FanAPI.ts';
export { default as ImageAPI } from './lib/image/ImageAPI.ts';
export { default as ShowAPI } from './lib/show/ShowAPI.ts';
export { default as TagAPI } from './lib/tag/TagAPI.ts';
export { default as TrackAPI } from './lib/track/TrackAPI.ts';
export { default as SearchAPI } from './lib/search/SearchAPI.ts';
export { default as AutocompleteAPI } from './lib/autocomplete/AutocompleteAPI.ts';
export { default as StreamAPI } from './lib/stream/StreamAPI.ts';

export * from './lib/common/BaseAPI.ts';
export * from './lib/common/BaseAPIWithImageSupport.ts';
export * from './lib/album/AlbumAPI.ts';
export * from './lib/discovery/DiscoveryAPI.ts';
export * from './lib/image/ImageAPI.ts';
export * from './lib/article/ArticleAPI.ts';
export * from './lib/band/BandAPI.ts';
export * from './lib/fan/FanAPI.ts';
export * from './lib/show/ShowAPI.ts';
export * from './lib/tag/TagAPI.ts';
export * from './lib/track/TrackAPI.ts';
export * from './lib/album/AlbumAPI.ts';
export * from './lib/search/SearchAPI.ts';
export * from './lib/autocomplete/AutocompleteAPI.ts';
export * from './lib/stream/StreamAPI.ts';

export type * from './lib/types/Album.ts';
export type * from './lib/types/Shirt.ts';
export type * from './lib/types/Article.ts';
export type * from './lib/types/Artist.ts';
export * from './lib/types/Discovery.ts';
export type * from './lib/types/Fan.ts';
export * from './lib/types/Image.ts';
export type * from './lib/types/Label.ts';
export type * from './lib/types/MediaKind.ts';
export type * from './lib/types/Show.ts';
export type * from './lib/types/Tag.ts';
export type * from './lib/types/Track.ts';
export type * from './lib/types/UserKind.ts';
export * from './lib/types/Search.ts';
export * from './lib/types/Autocomplete.ts';

export { default as Cache } from './lib/utils/Cache.ts';
export * from './lib/utils/Cache.ts';
export { default as Fetcher } from './lib/utils/Fetcher.ts';
export * from './lib/utils/Fetcher.ts';
export { default as Limiter } from './lib/utils/Limiter.ts';

export type { default as Album } from './lib/types/Album.ts';
export type { default as Shirt } from './lib/types/Shirt.ts';
export type { default as Article } from './lib/types/Article.ts';
export type { default as Artist } from './lib/types/Artist.ts';
export type { default as Fan } from './lib/types/Fan.ts';
export type { default as Label } from './lib/types/Label.ts';
export type { default as MediaKind } from './lib/types/MediaKind.ts';
export type { default as Show } from './lib/types/Show.ts';
export type { default as Tag } from './lib/types/Tag.ts';
export type { default as Track } from './lib/types/Track.ts';
export type { default as UserKind } from './lib/types/UserKind.ts';
export { default as NameValuePair } from './lib/utils/NameValuePair.ts';

export { default as BandcampFetch } from './lib/BandcampFetch.ts';
export * from './lib/BandcampFetch.ts';

export default new BandcampFetch();
