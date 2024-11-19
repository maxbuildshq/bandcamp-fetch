import type Cache from '../utils/Cache.js';
import {type FetchMethod} from '../utils/Fetcher.js';
import type Fetcher from '../utils/Fetcher.js';

export interface BaseAPIParams {
  fetcher: Fetcher;
  cache: Cache;
}

export default abstract class BaseAPI {

  #fetcher: Fetcher;
  #cache: Cache;

  constructor(params: BaseAPIParams) {
    this.#fetcher = params.fetcher;
    this.#cache = params.cache;
  }

  protected fetch(url: string, jsonResponse: false, method: FetchMethod.HEAD, payload?: undefined): Promise<{ ok: boolean, status: number }>;
  protected fetch(url: string, jsonResponse: true, method?: FetchMethod, payload?: Record<string, any>): Promise<any>;
  protected fetch(url: string, jsonResponse?: boolean, method?: FetchMethod, payload?: Record<string, any>): Promise<string>;
  protected fetch(url: string, jsonResponse?: boolean, method?: FetchMethod, payload?: Record<string, any>): Promise<any> {
    return this.#fetcher.fetch(url, jsonResponse, method, payload);
  }

  protected get cache() {
    return this.#cache;
  }
}
