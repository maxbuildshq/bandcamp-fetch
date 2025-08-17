import type Label from './Label.ts';
import type UserKind from './UserKind.ts';

export default interface Artist extends UserKind {
  type: 'artist';
  label?: Label;
  genre?: string;
}

//export default Artist;
