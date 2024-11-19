import bcfetch from '../../dist/mjs/index.js';

const params = {
  genre: 'ambient',
  albumImageFormat: 2,
  artistImageFormat: 'bio_featured'
};

bcfetch.discovery.discover(params).then((result) => {
  console.log(JSON.stringify(result, null, 2));
  if (result.continuation) {
    console.log('Fetching more by continuation...');
    bcfetch.discovery.discover(result.continuation).then((moreResults) => {
      console.log(JSON.stringify(moreResults, null, 2));
    });
  }
});
