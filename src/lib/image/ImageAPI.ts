import BaseAPI, { type BaseAPIParams } from '../common/BaseAPI.ts';
import { type ImageConstants, type ImageFormat } from '../types/Image.ts';
import { CacheDataType } from '../utils/Cache.ts';
import { URLS } from '../utils/Constants.ts';
import type Limiter from '../utils/Limiter.ts';
import ImageParser from './ImageParser.ts';

export enum ImageFormatFilter {
  /** Album image formats */
  Album = 'album',
  /** Artist / Profile image formats */
  Bio = 'bio'
}

export default class ImageAPI extends BaseAPI {

  /**
   * @internal
   */
  async getConstants(): Promise<ImageConstants> {
    return this.cache.getOrSet(CacheDataType.Constants, 'imageConstants', async () => {
      const html = await this.fetch(URLS.SITE_URL);
      return ImageParser.parseImageConstants(html);
    });
  }

  /**
   * @internal
   * Parse image constants from any HTML content (e.g., track or search page)
   * This allows fallback when home page parsing fails
   */
  async getConstantsFromHtml(html: string): Promise<ImageConstants> {
    return ImageParser.parseImageConstants(html);
  }

  async getFormat(target?: string | number | ImageFormat, fallbackId?: number): Promise<ImageFormat | null> {
    if (target && typeof target === 'object' && target.id !== undefined && target.name) {
      return target;
    }
    let format;
    if (target !== undefined) {
      const imageConstants = await this.getConstants();
      format = imageConstants.formats.find(
        (format) => (typeof target === 'string' && format.name === target) ||
          (Number.isInteger(target) && format.id === target)) || null;
    }
    if (format) {
      return format;
    }
    if (fallbackId !== undefined) {
      return this.getFormat(fallbackId);
    }
    return null;
  }

  async getFormats(filter?: ImageFormatFilter): Promise<ImageFormat[]> {
    const constants = await this.getConstants();
    if (filter === ImageFormatFilter.Album) {
      return constants.formats.filter( (c) => c.name.startsWith('art_') );
    }
    else if (filter === ImageFormatFilter.Bio) {
      return constants.formats.filter( (c) => c.name.startsWith('bio_') );
    }

    return constants.formats;
  }
}

export class LimiterImageAPI extends ImageAPI {

  #limiter: Limiter;

  constructor(params: BaseAPIParams & { limiter: Limiter }) {
    super(params);
    this.#limiter = params.limiter;
  }

  async getFormats(filter?: ImageFormatFilter  ): Promise<ImageFormat[]> {
    return this.#limiter.schedule(() => super.getFormats(filter));
  }

  async getFormat(target?: string | number | ImageFormat  , fallbackId?: number  ): Promise<ImageFormat | null> {
    return this.#limiter.schedule(() => super.getFormat(target, fallbackId));
  }
}
