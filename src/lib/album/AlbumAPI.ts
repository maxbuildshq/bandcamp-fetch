import type Album from '../types/Album.js';
import { type ImageFormat } from '../types/Image.js';
import AlbumInfoParser from './AlbumInfoParser.js';
import type Limiter from '../utils/Limiter.js';
import BaseAPIWithImageSupport, { type BaseAPIWithImageSupportParams } from '../common/BaseAPIWithImageSupport.js';

export interface AlbumAPIGetInfoParams {
  albumUrl: string;
  albumImageFormat?: string | number | ImageFormat;
  artistImageFormat?: string | number | ImageFormat;
  includeRawData?: boolean;
}

export default class AlbumAPI extends BaseAPIWithImageSupport {

  async getInfo(params: AlbumAPIGetInfoParams): Promise<Album> {
    const imageConstants = await this.imageAPI.getConstants();
    const opts = {
      imageBaseUrl: imageConstants.baseUrl,
      albumImageFormat: await this.imageAPI.getFormat(params.albumImageFormat, 9),
      artistImageFormat: await this.imageAPI.getFormat(params.artistImageFormat, 21),
      includeRawData: params.includeRawData !== undefined ? params.includeRawData : false
    };
    const html = await this.fetch(params.albumUrl);
    return AlbumInfoParser.parseInfo(html, opts);
  }
}

export class LimiterAlbumAPI extends AlbumAPI {

  #limiter: Limiter;

  constructor(params: BaseAPIWithImageSupportParams & { limiter: Limiter }) {
    super(params);
    this.#limiter = params.limiter;
  }

  async getInfo(params: AlbumAPIGetInfoParams): Promise<Album> {
    return this.#limiter.schedule(() => super.getInfo(params));
  }
}
