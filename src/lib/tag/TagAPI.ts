import { URLS } from '../utils/Constants.js';
import BaseAPIWithImageSupport, { type BaseAPIWithImageSupportParams } from '../common/BaseAPIWithImageSupport.js';
import { type ImageFormat } from '../types/Image.js';
import { type TagList } from '../types/Tag.js';
import type Limiter from '../utils/Limiter.js';
import TagListParser from './TagListParser.js';

export interface TagAPIGetAlbumHighlightsParams {
  tagUrl: string;
  imageFormat?: string | number | ImageFormat;
}

export interface TagAPIGetReleasesParams {
  tagUrl: string;
  imageFormat?: string | number | ImageFormat;
  useHardcodedDefaultFilters?: boolean;
  filters?: Record<string, string | number | Array<string | number>>;
  page?: number;
}

export default class TagAPI extends BaseAPIWithImageSupport {

  async list(): Promise<TagList> {
    const html = await this.fetch(URLS.SITE_URL);
    return TagListParser.parseTags(html);
  }
}

export class LimiterTagAPI extends TagAPI {

  #limiter: Limiter;

  constructor(params: BaseAPIWithImageSupportParams & { limiter: Limiter }) {
    super(params);
    this.#limiter = params.limiter;
  }

  async list(): Promise<TagList> {
    return this.#limiter.schedule(() => super.list());
  }
}
