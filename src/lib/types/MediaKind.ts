import type Artist from './Artist.ts';
import type Label from './Label.ts';
import type UserKind from './UserKind.ts';

interface MediaKind {
  id?: number;
  name: string;
  url?: string;
  imageUrl?: string;
  releaseDate?: string;
  artist?: Omit<Artist, 'type'>;
  label?: Omit<Label, 'type'>;
  publisher?: UserKind;
  raw?: {
    basic: string,
    extra: string
  };
}

export default MediaKind;
