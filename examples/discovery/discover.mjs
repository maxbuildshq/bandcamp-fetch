import bcfetch from '../../dist/mjs/index.js';

const params = {
  genre: 'ambient',
  albumImageFormat: 2,
  artistImageFormat: 'bio_featured'
};

bcfetch.discovery.discover(params).then((result) => {
  console.log(JSON.stringify(result, null, 2));
});
