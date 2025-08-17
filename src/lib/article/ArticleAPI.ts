import BaseAPIWithImageSupport, { type BaseAPIWithImageSupportParams } from '../common/BaseAPIWithImageSupport.ts';
import {type ArticleCategorySection, type ArticleList} from '../types/Article.ts';
import type Article from '../types/Article.ts';
import { type ImageFormat } from '../types/Image.ts';
import { URLS } from '../utils/Constants.ts';
import type Limiter from '../utils/Limiter.ts';
import { normalizeUrl } from '../utils/Parse.ts';
import ArticleCategoryParser from './ArticleCategoryParser.ts';
import ArticleListParser from './ArticleListParser.ts';
import ArticleParser from './ArticleParser.ts';

export interface ArticleAPIGetArticleParams {
  articleUrl: string;
  albumImageFormat?: string | number | ImageFormat;
  artistImageFormat?: string | number | ImageFormat;
  includeRawData?: boolean;
}

export interface ArticleAPIListParams {
  categoryUrl?: string;
  imageFormat?: string | number | ImageFormat;
  page?: number;
}

export default class ArticleAPI extends BaseAPIWithImageSupport {

  async getCategories(): Promise<ArticleCategorySection[]> {
    const html = await this.fetch(URLS.DAILY);
    return ArticleCategoryParser.parseCategories(html);
  }

  async getArticle(params: ArticleAPIGetArticleParams): Promise<Article> {
    const imageConstants = await this.imageAPI.getConstants();
    const opts = {
      imageBaseUrl: imageConstants.baseUrl,
      albumImageFormat: await this.imageAPI.getFormat(params.albumImageFormat, 9),
      artistImageFormat: await this.imageAPI.getFormat(params.artistImageFormat, 21),
      includeRawData: !!params.includeRawData
    };
    const html = await this.fetch(params.articleUrl);
    return ArticleParser.parseArticle(html, opts);
  }

  async list(params?: ArticleAPIListParams): Promise<ArticleList> {
    let url = params?.categoryUrl ? params.categoryUrl : normalizeUrl('latest', URLS.DAILY);
    if (params?.page) {
      url += `?page=${params.page}`;
    }
    const opts = {
      imageFormat: await this.imageAPI.getFormat(params?.imageFormat)
    };
    const html = await this.fetch(url);
    return ArticleListParser.parseList(html, opts);
  }
}

export class LimiterArticleAPI extends ArticleAPI {

  #limiter: Limiter;

  constructor(params: BaseAPIWithImageSupportParams & { limiter: Limiter }) {
    super(params);
    this.#limiter = params.limiter;
  }

  async getCategories(): Promise<ArticleCategorySection[]> {
    return this.#limiter.schedule(() => super.getCategories());
  }

  async getArticle(params: ArticleAPIGetArticleParams): Promise<Article> {
    return this.#limiter.schedule(() => super.getArticle(params));
  }
}
