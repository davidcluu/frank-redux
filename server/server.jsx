/**
 * Dependencies
 */

import path from 'path';

// Express App
import express from 'express';
import compression from 'compression';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';

// React/Redux Setup
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import Helmet from 'react-helmet';

import {Provider} from 'react-redux';
import {configureStore} from '../client/store';

// Webpack
import config from '../webpack.config.dev';

// Other Modules
import serverConfig from './config';
import userRoutes from './routes/user.routes';
import postsRoutes from './routes/posts.routes';
import {fetchComponentData} from './util/fetchData';
import routes from '../client/routes';


/**
 * App
 */

var app = express();


/**
 * Port
 */

app.set('port', serverConfig.port);


/**
 * Middleware
 */

if (process.env.NODE_ENV === 'development') {
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
}

/* Gzip Compression */
app.use(compression());

/* Handle POST Requests/URL Encoding */
app.use(bodyParser.json({
  limit: '20mb'
}));
app.use(bodyParser.urlencoded({
  limit: '20mb',
  extended: false
}));

/* Serve Static Public Content */
app.use(serveStatic(path.join(__dirname, '../dist')));


/**
 * API Route Handlers
 */

app.use('/api/user', userRoutes);
app.use('/api/posts', postsRoutes);


/**
 * View Pages Route Handlers
 */

const renderFullPage = (html, initialState) => {
  const head = Helmet.rewind();

  var css;
  var chunk;
  var vendorjs;
  var appjs;

  if (process.env.NODE_ENV === 'production') {
    const assetsManifest = JSON.parse(process.env.webpackAssets);
    const chunkManifest = JSON.parse(process.env.webpackChunkAssets);

    css = `<link rel="stylesheet" href="${assetsManifest['/app.css']}" />`;
    chunk =
      `//<![CDATA[
      window.webpackManifest = ${JSON.stringify(chunkManifest)};
      //]]>`;
    vendorjs = assetsManifest['/vendor.js'];
    appjs = assetsManifest['/app.js'];
  } else {
    css = '';
    chunk = '';
    vendorjs = '/vendor.js';
    appjs = '/app.js';
  }

  return `

<!DOCTYPE html>
<html>
  <head>
    ${head.title.toString()}
    ${head.meta.toString()}
    ${head.link.toString()}
    ${css}
  </head>
  <body>
    <div id="root">${html}</div>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      ${chunk}
    </script>
    <script src="${vendorjs}"></script>
    <script src="${appjs}"></script>
  </body>
</html>

  `.trim();
};

app.use((req, res, next) => {
  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      return res.status(500).send(error.message);
    } else if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const store = configureStore();

      return fetchComponentData(store, renderProps.components, renderProps.params)
        .then(() => {
          const initialView = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );
          const finalState = store.getState();

          res
            .set('Content-Type', 'text/html')
            .status(200)
            .end(renderFullPage(initialView, finalState));
        })
        .catch(err => next(err));
    }

    return res.status(404).send('Not Found');
  });
});


/**
 * Create Server and Listen
 */

/* eslint-disable no-console */

app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log('frank-redux server listening on port ' + app.get('port'));
  }
});
