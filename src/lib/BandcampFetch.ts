import type Bottleneck from 'bottleneck';
import AlbumAPI, { LimiterAlbumAPI } from './album/AlbumAPI.js';
import ArticleAPI, { LimiterArticleAPI } from './article/ArticleAPI.js';
import AutocompleteAPI, { LimiterAutocompleteAPI } from './autocomplete/AutocompleteAPI.js';
import BandAPI, { LimiterBandAPI } from './band/BandAPI.js';
import DiscoveryAPI, { LimiterDiscoveryAPI } from './discovery/DiscoveryAPI.js';
import FanAPI, { LimiterFanAPI } from './fan/FanAPI.js';
import ImageAPI, { LimiterImageAPI } from './image/ImageAPI.js';
import SearchAPI, { LimiterSearchAPI } from './search/SearchAPI.js';
import ShowAPI, { LimiterShowAPI } from './show/ShowAPI.js';
import TagAPI, { LimiterTagAPI } from './tag/TagAPI.js';
import TrackAPI, { LimiterTrackAPI } from './track/TrackAPI.js';
import Cache, { CacheDataType } from './utils/Cache.js';
import Fetcher from './utils/Fetcher.js';
import Limiter from './utils/Limiter.js';
import StreamAPI, { LimiterStreamAPI } from './stream/StreamAPI.js';
export interface BandcampFetchParams {
  cookie?: string | null;
}

export default class BandcampFetch {

  #cookie?: string | null;
  #fetcher: Fetcher;
  #cache: Cache;
  #wrappedCache: CacheWrapper;
  #limiter: Limiter;

  readonly album: AlbumAPI;
  readonly track: TrackAPI;
  readonly discovery: DiscoveryAPI;
  readonly image: ImageAPI;
  readonly band: BandAPI;
  readonly tag: TagAPI;
  readonly article: ArticleAPI;
  readonly show: ShowAPI;
  readonly fan: FanAPI;
  readonly search: SearchAPI;
  readonly autocomplete: AutocompleteAPI;
  readonly stream: StreamAPI;

  readonly limiter: {
    readonly album: LimiterAlbumAPI;
    readonly track: LimiterTrackAPI;
    readonly discovery: LimiterDiscoveryAPI;
    readonly image: LimiterImageAPI;
    readonly band: LimiterBandAPI;
    readonly tag: LimiterTagAPI;
    readonly article: LimiterArticleAPI;
    readonly show: LimiterShowAPI;
    readonly fan: LimiterFanAPI;
    readonly search: LimiterSearchAPI;
    readonly autocomplete: LimiterAutocompleteAPI;
    readonly stream: StreamAPI;
    updateSettings: (options?: Bottleneck.ConstructorOptions) => void;
  };

  constructor(params?: BandcampFetchParams) {
    this.#cookie = params?.cookie;
    this.#cache = new Cache({
      [CacheDataType.Constants]: 3600,
      [CacheDataType.Page]: 300
    }, { page: 10 });
    this.#wrappedCache = new CacheWrapper(this.#cache);
    this.#fetcher = new Fetcher({
      cookie: this.#cookie,
      cache: this.#cache
    });
    this.#limiter = new Limiter();

    const baseAPIParams = {
      fetcher: this.#fetcher,
      cache: this.#cache,
      limiter: this.#limiter
    };
    this.image = new ImageAPI(baseAPIParams);

    const baseAPIWithImageSupportParams = {
      ...baseAPIParams,
      imageAPI: this.image
    };

    this.album = new AlbumAPI(baseAPIWithImageSupportParams);
    this.track = new TrackAPI(baseAPIWithImageSupportParams);
    this.discovery = new DiscoveryAPI(baseAPIWithImageSupportParams);
    this.image = new ImageAPI(baseAPIParams);
    this.band = new BandAPI(baseAPIWithImageSupportParams);
    this.tag = new TagAPI(baseAPIWithImageSupportParams);
    this.article = new ArticleAPI(baseAPIWithImageSupportParams);
    this.show = new ShowAPI(baseAPIWithImageSupportParams);
    this.fan = new FanAPI(baseAPIWithImageSupportParams);
    this.search = new SearchAPI(baseAPIWithImageSupportParams);
    this.autocomplete = new AutocompleteAPI(baseAPIParams);
    this.stream = new StreamAPI(baseAPIParams);

    this.limiter = {
      album: new LimiterAlbumAPI(baseAPIWithImageSupportParams),
      track: new LimiterTrackAPI(baseAPIWithImageSupportParams),
      discovery: new LimiterDiscoveryAPI(baseAPIWithImageSupportParams),
      image: new LimiterImageAPI(baseAPIParams),
      band: new LimiterBandAPI(baseAPIWithImageSupportParams),
      tag: new LimiterTagAPI(baseAPIWithImageSupportParams),
      article: new LimiterArticleAPI(baseAPIWithImageSupportParams),
      show: new LimiterShowAPI(baseAPIWithImageSupportParams),
      fan: new LimiterFanAPI(baseAPIWithImageSupportParams),
      search: new LimiterSearchAPI(baseAPIWithImageSupportParams),
      autocomplete: new LimiterAutocompleteAPI(baseAPIParams),
      stream: new LimiterStreamAPI(baseAPIParams),
      updateSettings: this.#limiter.updateSettings.bind(this.#limiter)
    };
  }

  setCookie(value?: string | null) {
    this.#cookie = value;
    this.#fetcher.setCookie(value);
  }

  get cookie() {
    return this.#cookie;
  }

  get cache() {
    return this.#wrappedCache;
  }
}

export class CacheWrapper {

  #cache: Cache;

  constructor(cache: Cache) {
    this.#cache = cache;
  }

  clear(type?: CacheDataType) {
    this.#cache.clear(type);
  }

  setTTL(type: CacheDataType, ttl: number) {
    this.#cache.setTTL(type, ttl);
  }

  setMaxPages(maxPages: number) {
    this.#cache.setMaxEntries(CacheDataType.Page, maxPages);
  }
}
