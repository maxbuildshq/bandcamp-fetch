import type Album from './Album.ts';
import type MediaKind from './MediaKind.ts';

export default interface Track extends MediaKind {
  type: 'track';
  duration?: number;
  seekPosition?: number;
  streamUrl?: string;
  streamUrlHQ?: string;
  album?: Omit<Album, 'type'>;
  position?: number;
  lyrics?: string;
}

//export default Track;
