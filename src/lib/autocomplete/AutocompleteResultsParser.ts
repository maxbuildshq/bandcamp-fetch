import { AutoCompleteTag, AutocompleteLocation } from '../types/Autocomplete.js';
import { ParseError } from '../utils/Parse.js';

export default class AutocompleteResultsParser {

  static parseTags(json: any): AutoCompleteTag[] {
    if (Array.isArray(json)) {
      return json.map<AutoCompleteTag>((tagData: any) => ({
        type: 'tag',
        count: tagData.count,
        value: tagData.norm_name,
        name: tagData.display_name
      }));
    }
    throw new ParseError('Failed to parse autocomplete tags: JSON invalid or missing \'matching_tags\'.', json);
  }

  static parseLocations(json: any): AutocompleteLocation[] {
    if (Array.isArray(json?.results)) {
      const arr = json.results as Array<any>;
      return arr.map<AutocompleteLocation>((locationData: any) => ({
        type: 'location',
        value: parseInt(locationData.id, 10),
        name: locationData.name,
        fullName: locationData.fullname
      }));
    }
    throw new ParseError('Failed to parse autocomplete locations: JSON invalid or missing \'results\'.', json);
  }
}
