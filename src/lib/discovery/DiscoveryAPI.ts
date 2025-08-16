import BaseAPIWithImageSupport, { type BaseAPIWithImageSupportParams } from '../common/BaseAPIWithImageSupport.ts';
import { type DiscoverOptions, type DiscoverParams, type DiscoverResult, type DiscoverResultContinuation, type SanitizedDiscoverParams } from '../types/Discovery.ts';
import { CacheDataType } from '../utils/Cache.ts';
import { URLS } from '../utils/Constants.ts';
import { FetchMethod } from '../utils/Fetcher.ts';
import type Limiter from '../utils/Limiter.ts';
import type NameValuePair from '../utils/NameValuePair.ts';
import DiscoverOptionsParser from './DiscoverOptionsParser.ts';
import DiscoverResultParser from './DiscoverResultParser.ts';

interface DiscoverRequestPayload {
  category_id: number; // (digital, vinyl, cd, cassetes, shirts)
  cursor: string; // Page cursor
  geoname_id: number; // Location
  include_result_types: string[]; // Always ['a', 's'] ?
  size: number; // Number of results to get
  slice: string; // (best-selling, new arrivals, surprise me)
  tag_norm_names: string[]; // Genres, subgenres, customTags...
  time_facet_id: number | null; // Time - Note: set to null if -1 (fresh)
}

export default class DiscoveryAPI extends BaseAPIWithImageSupport {

  async getAvailableOptions(): Promise<DiscoverOptions> {
    return this.cache.getOrSet(CacheDataType.Constants, 'discoverOptions', async () => {
      const html = await this.fetch(URLS.DISCOVER.SITE);
      return DiscoverOptionsParser.parseOptions(html);
    });
  }

  async sanitizeDiscoverParams(params?: DiscoverParams) {
    const options = await this.getAvailableOptions();

    const _getOptionValue = <T>(optArr: NameValuePair<T>[], value?: T, defaultIndex = 0) => {
      if (value !== undefined && optArr) {
        const opt = optArr.find((o) => o.value == value);
        if (opt) {
          return opt.value;
        }
      }
      if (optArr) {
        return optArr[defaultIndex]?.value;
      }

      return undefined;
    };

    const category = _getOptionValue(options.categories, params?.category) || 0;
    const genre = _getOptionValue(options.genres, params?.genre, -1);
    const sortBy = _getOptionValue(options.sortBys, params?.sortBy, -1) || 'top';
    const location = _getOptionValue(options.locations, params?.location) || 0;
    const time = _getOptionValue(options.times, params?.time) || -1;

    const sanitized: SanitizedDiscoverParams = {
      category,
      sortBy,
      location,
      time,
      size: params?.size || 60
    };
    if (genre) {
      sanitized.genre = genre;
      const subgenreOptions = options.subgenres[genre];
      if (subgenreOptions) {
        const subgenre = _getOptionValue(subgenreOptions, params?.subgenre, -1);
        if (subgenre) {
          sanitized.subgenre = subgenre;
        }
      }
    }
    if (params?.customTags) {
      sanitized.customTags = params.customTags;
    }

    return sanitized;
  }

  async discover(params?: DiscoverParams | DiscoverResultContinuation): Promise<DiscoverResult> {
    const imageConstants = await this.imageAPI.getConstants();
    const options = await this.getAvailableOptions();
    const opts = {
      imageBaseUrl: imageConstants.baseUrl,
      albumImageFormat: await this.imageAPI.getFormat(params?.albumImageFormat, 9),
      artistImageFormat: await this.imageAPI.getFormat(params?.artistImageFormat, 21),
      merchImageFormat: await this.imageAPI.getFormat(params?.merchImageFormat, 9)
    };
    let payload: DiscoverRequestPayload;
    let sanitizedParams: SanitizedDiscoverParams;
    if (params && DiscoveryAPI.#isContinuation(params)) {
      sanitizedParams = { ...params };
      Reflect.deleteProperty(sanitizedParams, 'cursor');
      payload = DiscoveryAPI.getDiscoverRequestPayload(params);
    }
    else {
      sanitizedParams = await this.sanitizeDiscoverParams(params);
      payload = DiscoveryAPI.getDiscoverRequestPayload(sanitizedParams);
    }
    const json = await this.fetch(URLS.DISCOVER.API, true, FetchMethod.POST, payload);
    const result = DiscoverResultParser.parseDiscoverResult(json, opts, sanitizedParams, options);
    if (result.continuation) {
      if (!params?.albumImageFormat) {
        delete result.continuation.albumImageFormat;
      }
      if (!params?.artistImageFormat) {
        delete result.continuation.artistImageFormat;
      }
      if (!params?.merchImageFormat) {
        delete result.continuation.merchImageFormat;
      }
    }
    return result;
  }

  /**
   * @internal
   */
  protected static getDiscoverRequestPayload(params: SanitizedDiscoverParams | DiscoverResultContinuation): DiscoverRequestPayload {
    const tagNames: string[] = [];
    if (params.genre) {
      tagNames.push(params.genre);
    }
    if (params.subgenre) {
      tagNames.push(params.subgenre);
    }
    if (params.customTags) {
      tagNames.push(...params.customTags);
    }
    return {
      category_id: params.category,
      cursor: this.#isContinuation(params) ? params.cursor : '*',
      geoname_id: params.location,
      include_result_types: [ 'a', 's' ],
      size: params.size,
      slice: params.sortBy,
      tag_norm_names: tagNames,
      time_facet_id: params.time === -1 ? null : params.time
    };
  }

  static #isContinuation(params: DiscoverParams | DiscoverResultContinuation): params is DiscoverResultContinuation {
    return Reflect.has(params, 'cursor');
  }
}

export class LimiterDiscoveryAPI extends DiscoveryAPI {

  #limiter: Limiter;

  constructor(params: BaseAPIWithImageSupportParams & { limiter: Limiter }) {
    super(params);
    this.#limiter = params.limiter;
  }

  async getAvailableOptions(): Promise<DiscoverOptions> {
    return this.#limiter.schedule(() => super.getAvailableOptions());
  }

  async sanitizeDiscoverParams(params: DiscoverParams): Promise<SanitizedDiscoverParams> {
    return this.#limiter.schedule(() => super.sanitizeDiscoverParams(params));
  }

  async discover(params: DiscoverParams): Promise<DiscoverResult> {
    return this.#limiter.schedule(() => super.discover(params));
  }
}
