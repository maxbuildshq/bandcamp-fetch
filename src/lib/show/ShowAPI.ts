import BaseAPIWithImageSupport, { type BaseAPIWithImageSupportParams } from '../common/BaseAPIWithImageSupport.js';
import { type ImageFormat } from '../types/Image.js';
import type Show from '../types/Show.js';
import { URLS } from '../utils/Constants.js';
import type Limiter from '../utils/Limiter.js';
import ShowListParser from './ShowListParser.js';
import ShowParser from './ShowParser.js';

export interface ShowAPIGetShowParams {
  showUrl: string,
  albumImageFormat?: string | number | ImageFormat;
  artistImageFormat?: string | number | ImageFormat;
  showImageFormat?: string | number | ImageFormat;
}

export interface ShowAPIListParams {
  imageFormat?: string | number | ImageFormat;
}

export default class ShowAPI extends BaseAPIWithImageSupport {

  async getShow(params: ShowAPIGetShowParams): Promise<Show> {
    const imageConstants = await this.imageAPI.getConstants();
    const opts = {
      showUrl: params.showUrl,
      imageBaseUrl: imageConstants.baseUrl,
      albumImageFormat: await this.imageAPI.getFormat(params.albumImageFormat, 9),
      artistImageFormat: await this.imageAPI.getFormat(params.artistImageFormat, 21),
      showImageFormat: await this.imageAPI.getFormat(params.showImageFormat, 25)
    };
    const html = await this.fetch(params.showUrl);
    return ShowParser.parseShow(html, opts);
  }

  async list(params?: ShowAPIListParams) {
    const imageConstants = await this.imageAPI.getConstants();
    const opts = {
      imageBaseUrl: imageConstants.baseUrl,
      imageFormat: await this.imageAPI.getFormat(params?.imageFormat, 25)
    };
    const json = await this.fetch(URLS.SHOWS, true);
    return ShowListParser.parseList(json, opts);
  }
}

export class LimiterShowAPI extends ShowAPI {

  #limiter: Limiter;

  constructor(params: BaseAPIWithImageSupportParams & { limiter: Limiter }) {
    super(params);
    this.#limiter = params.limiter;
  }

  async getShow(params: ShowAPIGetShowParams): Promise<Show> {
    return this.#limiter.schedule(() => super.getShow(params));
  }

  async list(params?: ShowAPIListParams  ): Promise<Show[]> {
    return this.#limiter.schedule(() => super.list(params));
  }
}
