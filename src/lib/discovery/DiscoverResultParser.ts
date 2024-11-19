import type Album from '../types/Album.js';
import type Artist from '../types/Artist.js';
import { type DiscoverOptions, type DiscoverResult, type SanitizedDiscoverParams } from '../types/Discovery.js';
import { type ImageFormat } from '../types/Image.js';
import type Shirt from '../types/Shirt.js';
import { ParseError } from '../utils/Parse.js';

interface DiscoverResultParseOptions {
  imageBaseUrl: string;
  albumImageFormat: ImageFormat | null;
  artistImageFormat: ImageFormat | null;
  merchImageFormat: ImageFormat | null;
}

export default class DiscoverResultParser {

  static parseDiscoverResult(json: any, opts: DiscoverResultParseOptions, params: SanitizedDiscoverParams, availableOptions: DiscoverOptions): DiscoverResult {
    if (typeof json === 'object' && Array.isArray(json.results)) {
      
      const items = (json.results as any[]).reduce<Array<Album | Shirt>>((result, item: any) => {
        switch (item.result_type) {
          case 'a': {
            const album = this.#parseAlbum(item, opts, availableOptions);
            result.push(album);
            break;
          }
          case 's': {
            const shirt = this.#parseShirt(item, opts);
            result.push(shirt);
            break;
          }
        }
        return result;
      }, []);

      const parsed: DiscoverResult = {
        items,
        total: json.result_count,
        params
      };

      if (json.cursor) {
        parsed.continuation = {
          ...params,
          cursor: json.cursor
        };
        if (opts.albumImageFormat) {
          parsed.continuation.albumImageFormat = opts.albumImageFormat;
        }
        if (opts.artistImageFormat) {
          parsed.continuation.artistImageFormat = opts.artistImageFormat;
        }
        if (opts.merchImageFormat) {
          parsed.continuation.merchImageFormat = opts.merchImageFormat;
        }
      }

      return parsed;
    }

    throw new ParseError('Failed to parse discover results: data is missing or has invalid \'results\' field.', json);
  }

  static #parseAlbum(item: any, opts: DiscoverResultParseOptions, availableOptions: DiscoverOptions) {
    const artist: Artist = {
      type: 'artist',
      name: item.album_artist || item.band_name
    };
    const album: Album = {
      type: 'album',
      name: item.title,
      artist,
      location: item.band_location
    };
    const genre = item.band_genre_id !== undefined ?
      availableOptions.genres.find((genre) => item.band_genre_id === genre.id) : null;
    if (genre?.name) {
      album.genre = genre.name;
    }
    if (item.url_hints) {
      artist.url = item.band_url;
    }
    if (artist.url) {
      album.url = item.item_url;
    }
    if (item.item_image_id && opts.albumImageFormat) {
      album.imageUrl = this.#getImageURL(item.item_image_id, opts.imageBaseUrl, opts.albumImageFormat, 'a');
    }
    if (item.featured_track) {
      album.featuredTrack = {
        name: item.featured_track.title,
        streamUrl: item.featured_track.stream_url
      };
    }
    if (item.band_bio_image_id && opts.artistImageFormat) {
      artist.imageUrl = this.#getImageURL(item.band_bio_image_id, opts.imageBaseUrl, opts.artistImageFormat);
    }
    return album;
  }

  static #parseShirt(item: any, opts: DiscoverResultParseOptions) {
    const shirt: Shirt = {
      type: 'shirt',
      name: item.title,
    };
    if (item.item_url) {
      shirt.url = item.item_url;
    }
    if (item.item_image_id && opts.merchImageFormat) {
      shirt.imageUrl = {
        primary: this.#getImageURL(item.item_image_id, opts.imageBaseUrl, opts.merchImageFormat)
      };
      if (item.tshirt_secondary_image_id) {
        shirt.imageUrl.secondary = this.#getImageURL(item.tshirt_secondary_image_id, opts.imageBaseUrl, opts.merchImageFormat)
      }
    }
    if (item.release_date) {
      shirt.releaseDate = item.release_date;
    }
    if (item.band_name) {
      const artist: Artist = {
        type: 'artist',
        name: item.band_name
      };
      if (item.band_url) {
        artist.url = item.band_url;
      }
      if (item.band_bio_image_id && opts.artistImageFormat) {
        artist.imageUrl = this.#getImageURL(item.band_bio_image_id, opts.imageBaseUrl, opts.artistImageFormat);
      }
      shirt.artist = artist;
    }
    return shirt;
  }

  static #getImageURL(imageId: string, imageBaseUrl: string, format: ImageFormat, prefix = '') {
    return `${imageBaseUrl}/img/${prefix}${imageId}_${format.id}.jpg`;
  }
}
