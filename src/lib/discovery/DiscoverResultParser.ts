import Album from '../types/Album.js';
import Artist from '../types/Artist.js';
import { DiscoverOptions, DiscoverParams, DiscoverResult } from '../types/Discovery.js';
import { ImageFormat } from '../types/Image.js';
import { ParseError } from '../utils/Parse.js';

interface DiscoverResultParseOptions {
  imageBaseUrl: string;
  albumImageFormat: ImageFormat | null;
  artistImageFormat: ImageFormat | null;
}

export default class DiscoverResultParser {

  static parseDiscoverResult(json: any, opts: DiscoverResultParseOptions, params: DiscoverParams, availableOptions: DiscoverOptions): DiscoverResult {
    if (typeof json === 'object' && Array.isArray(json.results)) {
      const items = json.results.filter(
        (item: any) => item.result_type === 'a').map((item: any) => {
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
          album.imageUrl = `${opts.imageBaseUrl}/img/a${item.item_image_id}_${opts.albumImageFormat.id}.jpg`;
        }
        if (item.featured_track) {
          album.featuredTrack = {
            name: item.featured_track.title,
            streamUrl: item.featured_track.stream_url
          };
        }
        if (item.band_bio_image_id && opts.artistImageFormat) {
          artist.imageUrl = `${opts.imageBaseUrl}/img/${item.band_bio_image_id}_${opts.artistImageFormat.id}.jpg`;
        }
        return album;
      }) as Album[];

      return {
        items,
        total: json.result_count,
        params
      };
    }

    throw new ParseError('Failed to parse discover results: data is missing or has invalid \'results\' field.', json);
  }
}
