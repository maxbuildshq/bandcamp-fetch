import BaseAPIWithImageSupport, { type BaseAPIWithImageSupportParams } from '../common/BaseAPIWithImageSupport.ts';
import { type ImageFormat } from '../types/Image.ts';
import type Track from '../types/Track.ts';
import type Limiter from '../utils/Limiter.ts';
import TrackInfoParser from './TrackInfoParser.ts';
import { CacheDataType } from '../utils/Cache.ts';

export interface TrackAPIGetInfoParams {
  trackUrl: string;
  albumImageFormat?: string | number | ImageFormat;
  artistImageFormat?: string | number | ImageFormat;
  includeRawData?: boolean;
}

export default class TrackAPI extends BaseAPIWithImageSupport {
  async getInfo(params: TrackAPIGetInfoParams): Promise<Track> {
    // Fetch HTML first
    const html = await this.fetch(params.trackUrl);

    let imageConstants;
    try {
      imageConstants = await this.imageAPI.getConstants();
    } catch (error) {
      console.warn('Failed to fetch constants from home page, parsing from track page instead.', error);
      imageConstants = await this.imageAPI.getConstantsFromHtml(html);
      // Cache for other calls (e.g., if search follows)
      this.cache.put(CacheDataType.Constants, 'imageConstants', imageConstants);
    }

    const opts = {
      trackUrl: params.trackUrl,
      imageBaseUrl: imageConstants.baseUrl,
      albumImageFormat: await this.imageAPI.getFormat(params.albumImageFormat, 9),
      artistImageFormat: await this.imageAPI.getFormat(params.artistImageFormat, 21),
      includeRawData: params.includeRawData !== undefined ? params.includeRawData : false
    };
    return TrackInfoParser.parseInfo(html, opts);
  }
}

export class LimiterTrackAPI extends TrackAPI {

  #limiter: Limiter;

  constructor(params: BaseAPIWithImageSupportParams & { limiter: Limiter }) {
    super(params);
    this.#limiter = params.limiter;
  }
  async getInfo(params: TrackAPIGetInfoParams): Promise<Track> {
    return this.#limiter.schedule(() => super.getInfo(params));
  }
}
