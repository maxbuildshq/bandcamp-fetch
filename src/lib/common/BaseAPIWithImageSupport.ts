import type ImageAPI from '../image/ImageAPI.ts';
import BaseAPI, { type BaseAPIParams } from './BaseAPI.ts';

export interface BaseAPIWithImageSupportParams extends BaseAPIParams {
  imageAPI: ImageAPI;
}

export default abstract class BaseAPIWithImageSupport extends BaseAPI {

  #imageAPI: ImageAPI;

  constructor(params: BaseAPIWithImageSupportParams) {
    super(params);
    this.#imageAPI = params.imageAPI;
  }

  get imageAPI() {
    return this.#imageAPI;
  }
}
