interface Tag {
  type: 'tag';
  name: string;
  value?: string;
  imageUrls?: string[];
}

export interface TagList {
  tags: Tag[];
  locations: Tag[];
}

export default Tag;
