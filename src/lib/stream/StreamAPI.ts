import BaseAPI, { type BaseAPIParams } from '../common/BaseAPI.ts';
import { URLS } from '../utils/Constants.ts';
import { FetchMethod } from '../utils/Fetcher.ts';
import type Limiter from '../utils/Limiter.ts';

export interface StreamTestResult {
  ok: boolean;
  status: number;
}

export default class StreamAPI extends BaseAPI {

  async test(url: string): Promise<StreamTestResult> {
    return this.fetch(url, false, FetchMethod.HEAD);
  }

  async refresh(url: string): Promise<string | null> {
    const refreshUrl = new URL(URLS.REFRESH_STREAM);
    refreshUrl.searchParams.set('url', url);
    const res = await this.fetch(refreshUrl.toString(), true);
    if (res && res.url && typeof res.url === 'string') {
      return res.url;
    }
    return null;
  }
}

export class LimiterStreamAPI extends StreamAPI {

  #limiter: Limiter;

  constructor(params: BaseAPIParams & { limiter: Limiter }) {
    super(params);
    this.#limiter = params.limiter;
  }

  async refresh(url: string): Promise<string | null> {
    return this.#limiter.schedule(() => super.refresh(url));
  }
}
