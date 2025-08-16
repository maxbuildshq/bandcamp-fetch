import { type FanItemsContinuation } from '../types/Fan.ts';
import FanItemsBaseParser, { type FanItemParseOptions } from './FanItemsBaseParser.ts';
import FanWishlistParser from './FanWishlistParser.ts';

export default class FanCollectionParser extends FanItemsBaseParser {

  static parseCollectionFromPage(html: string, opts: FanItemParseOptions) {
    return this.parsePageItems(html, {
      ...opts,
      dataKey: 'collection',
      parseItemFn: this.parseCollectionItem
    });
  }

  static parseCollectionItem(data: any, opts: FanItemParseOptions, tracklists: any) {
    return FanWishlistParser.parseWishlistItem(data, opts, tracklists);
  }

  static parseCollectionFromContinuation(json: any, continuation: FanItemsContinuation, opts: FanItemParseOptions) {
    return this.parseContinuationItems(json, continuation, {
      ...opts,
      dataKey: 'items',
      parseItemFn: this.parseCollectionItem
    });
  }
}
