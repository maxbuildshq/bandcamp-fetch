import type Artist from './Artist.ts';
import type UserKind from './UserKind.ts';

export default interface Label extends UserKind {
  type: 'label';
  labelId?: number;
}

export type LabelArtist = Omit<Artist, 'type'>;

//export default Label;
