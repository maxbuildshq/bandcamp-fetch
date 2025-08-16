import { URLS } from '../utils/Constants.ts';
import BaseAPIWithImageSupport, { type BaseAPIWithImageSupportParams } from '../common/BaseAPIWithImageSupport.ts';
import { type ImageFormat } from '../types/Image.ts';
import { type RelatedTags, type TagList } from '../types/Tag.ts';
import type Limiter from '../utils/Limiter.ts';
import TagListParser from './TagListParser.ts';
import { FetchMethod } from '../utils/Fetcher.ts';
import RelatedTagsParser from './RelatedTagsParser.ts';

export interface TagAPIGetRelatedParams {
  tags: string[];
  size?: number;
}

export default class TagAPI extends BaseAPIWithImageSupport {

  async list(): Promise<TagList> {
    const html = await this.fetch(URLS.SITE_URL);
    return TagListParser.parseTags(html);
  }

  async getRelated(params: TagAPIGetRelatedParams): Promise<RelatedTags> {
    const payload = {
      combo: true,
      tag_names: params.tags,
      size: params.size || 20
    }
    const json = await this.fetch(URLS.RELATED_TAGS, true, FetchMethod.POST, payload);
    return RelatedTagsParser.parseRelatedTags(json);
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

  async getRelated(params: TagAPIGetRelatedParams): Promise<RelatedTags> {
    return this.#limiter.schedule(() => super.getRelated(params));
  }
}
