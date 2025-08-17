import { load as cheerioLoad } from 'https://esm.sh/cheerio@1.0.0';
import { decode } from 'https://esm.sh/html-entities@2.5.2';
import type Fan from '../types/Fan.ts';
import { type ImageFormat } from '../types/Image.ts';
import { ParseError } from '../utils/Parse.ts';

interface FanInfoParseOptions {
  imageBaseUrl: string;
  imageFormat: ImageFormat | null;
}

export default class FanInfoParser {

  static parseInfo(html: string, opts: FanInfoParseOptions): Fan {
    const $ = cheerioLoad(html);
    const blob = decode($('#pagedata[data-blob]').attr('data-blob'));
    let parsed;
    try {
      parsed = JSON.parse(blob);
    }
    catch (error: any) {
      throw new ParseError('Failed to parse fan info: JSON error in data-blob.', html, error);
    }

    const fanData = parsed.fan_data || {};
    const fanId = fanData.fan_id;
    if (!fanId || !fanData.name || !fanData.username) {
      throw new ParseError('Failed to parse fan info: invalid data.', html);
    }

    const result: Fan = {
      type: 'fan',
      name: fanData.name || null,
      username: fanData.username || null,
      url: fanData.trackpipe_url,
      description: fanData.bio || null,
      location: fanData.location || null,
      websiteUrl: fanData.website_url || null,
      imageUrl: '',
      followingGenresCount: fanData.following_genres_count || 0,
      followingArtistsAndLabelsCount: fanData.following_bands_count || 0,
      collectionItemCount: parsed.collection_data?.item_count || 0,
      wishlistItemCount: parsed.wishlist_data?.item_count || 0
    };

    if (fanData.photo && fanData.photo.image_id && opts.imageFormat?.id) {
      result.imageUrl = `${opts.imageBaseUrl}/img/${fanData.photo.image_id}_${opts.imageFormat.id}.jpg`;
    }

    return result;
  }

  static parseLoggedInFanUsername(html: string) {
    const $ = cheerioLoad(html);
    const blob = decode($('#pagedata[data-blob]').attr('data-blob'));
    let parsed;
    try {
      parsed = JSON.parse(blob);
    }
    catch (error: any) {
      throw new ParseError('Failed to parse logged-in fan username: JSON error in data-blob.', html, error);
    }

    const identitiesData = parsed.identities || {};
    const username = identitiesData.fan?.username;
    if (!username || typeof username !== 'string') {
      let reason;
      if (identitiesData.fan === null) {
        reason = 'check if valid cookie is set';
      }
      else {
        reason = 'invalid data';
      }
      throw new ParseError(`Failed to parse logged-in fan username: ${reason}.`, html);
    }

    return username;
  }
}
