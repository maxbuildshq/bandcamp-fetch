import { load as cheerioLoad } from 'cheerio';
import {type TagList} from '../types/Tag.ts';
import type Tag from '../types/Tag.ts';

export default class TagListParser {
  static parseTags(html: string): TagList {
    const $ = cheerioLoad(html);

    const _findTag = (value: string, name: string, tags: Omit<Tag, 'type'>[]) => {
      return tags.find((t) => t.value === value && t.name === name);
    };

    const _parseCloud = (selector: string) => {
      const cloud = $(selector);
      const tagsInCloud: Tag[] = [];
      cloud.find('a.g-pill').each((_index, link) => {
        const linkEl = $(link);
        const name = linkEl.text().trim();
        const href = linkEl.attr('href');
        const match = href ? (/\/discover\/(.+)\?/).exec(href) : null;
        const value = match && match[1] ? match[1] : null;
        if (value && !_findTag(value, name, tagsInCloud)) { // Skip blank or repeating tags
          tagsInCloud.push({
            type: 'tag',
            name,
            value
          });
        }
      });
      return tagsInCloud;
    };

    return {
      tags: _parseCloud('.discover-tags-pills .discover-tags-group'),
      locations: _parseCloud('.discover-locations-pills .discover-locations-group')
    };
  }
}
