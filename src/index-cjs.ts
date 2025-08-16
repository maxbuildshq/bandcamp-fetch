import { default as main } from './index.ts';
import * as bcfetch from './index.ts';

export = Object.assign(main, { ...bcfetch });
