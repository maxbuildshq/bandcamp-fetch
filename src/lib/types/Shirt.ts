import type Artist from './Artist.ts';
import type Label from './Label.ts';
import type UserKind from './UserKind.ts';

interface Shirt {
  type: 'shirt';
  name: string;
  url?: string;
  imageUrl?: {
    primary: string;
    secondary?: string;
  };
  releaseDate?: string;
  artist?: Omit<Artist, 'type'>;
}

export default Shirt;
