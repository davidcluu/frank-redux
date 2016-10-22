process.env.webpackAssets = JSON.stringify(require('./dist/manifest.json'));
process.env.webpackChunkAssets = JSON.stringify(require('./dist/chunk-manifest.json'));

require('./dist/server.bundle.js');
