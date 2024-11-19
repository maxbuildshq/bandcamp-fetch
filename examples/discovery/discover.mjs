import bcfetch from '../../dist/mjs/index.js';

const params = {
  genre: 'ambient',
  albumImageFormat: 2,
  artistImageFormat: 'bio_featured'
};

void (async () => {
  const result = await bcfetch.discovery.discover(params);
  console.log(JSON.stringify(result, null, 2));
  if (result.continuation) {
    console.log('Fetching more by continuation...');
    const moreResults = await bcfetch.discovery.discover(result.continuation);
    console.log(JSON.stringify(moreResults, null, 2));
  }
  console.log('Fetching shirts...');
  params.category = 5;
  const shirtResults = await bcfetch.discovery.discover(params);
  console.log(JSON.stringify(shirtResults, null, 2));
})();
