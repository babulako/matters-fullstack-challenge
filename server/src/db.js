const ipfs = require('ipfs');
const orbit = require('orbit-db');

const initDB = () => (
  ipfs.create({ repo: './ipfs' })
    .then(orbit.createInstance)
    .then((ob) => ob.docs('articles'))
    .then((articles) => {
      articles.load();
      return { articles };
    })
);

module.exports = initDB;
