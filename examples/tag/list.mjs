import bcfetch from '../../dist/mjs/index.js';

bcfetch.tag.list().then((results) => {
  console.log(JSON.stringify(results, null, 2));
});
