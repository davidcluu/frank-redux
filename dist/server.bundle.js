/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * Dependencies
	                                                                                                                                                                                                                                                                               */

	// Express App


	// React/Redux Setup


	// Webpack


	// Other Modules


	var _path = __webpack_require__(1);

	var _path2 = _interopRequireDefault(_path);

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _compression = __webpack_require__(3);

	var _compression2 = _interopRequireDefault(_compression);

	var _serveStatic = __webpack_require__(4);

	var _serveStatic2 = _interopRequireDefault(_serveStatic);

	var _bodyParser = __webpack_require__(5);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(7);

	var _reactRouter = __webpack_require__(8);

	var _reactHelmet = __webpack_require__(9);

	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

	var _reactRedux = __webpack_require__(10);

	var _store = __webpack_require__(11);

	var _webpackConfig = __webpack_require__(21);

	var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

	var _config = __webpack_require__(30);

	var _config2 = _interopRequireDefault(_config);

	var _user = __webpack_require__(31);

	var _user2 = _interopRequireDefault(_user);

	var _posts = __webpack_require__(35);

	var _posts2 = _interopRequireDefault(_posts);

	var _fetchData = __webpack_require__(37);

	var _routes = __webpack_require__(39);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * App
	 */

	var app = (0, _express2.default)();

	/**
	 * Port
	 */

	app.set('port', _config2.default.port);

	/**
	 * Middleware
	 */

	if (process.env.NODE_ENV === 'development') {
	  var webpack = __webpack_require__(22);
	  var webpackDevMiddleware = __webpack_require__(49);

	  var compiler = webpack(_webpackConfig2.default);
	  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: _webpackConfig2.default.output.publicPath }));
	}

	/* Gzip Compression */
	app.use((0, _compression2.default)());

	/* Handle POST Requests/URL Encoding */
	app.use(_bodyParser2.default.json({
	  limit: '20mb'
	}));
	app.use(_bodyParser2.default.urlencoded({
	  limit: '20mb',
	  extended: false
	}));

	/* Serve Static Public Content */
	app.use((0, _serveStatic2.default)(_path2.default.join(__dirname, '../dist')));

	/**
	 * API Route Handlers
	 */

	app.use('/api/user', _user2.default);
	app.use('/api/posts', _posts2.default);

	/**
	 * View Pages Route Handlers
	 */

	var renderFullPage = function renderFullPage(html, initialState) {
	  var head = _reactHelmet2.default.rewind();

	  var css;
	  var chunk;
	  var vendorjs;
	  var appjs;

	  if (process.env.NODE_ENV === 'production') {
	    var assetsManifest = JSON.parse(process.env.webpackAssets);
	    var chunkManifest = JSON.parse(process.env.webpackChunkAssets);

	    css = '<link rel="stylesheet" href="' + assetsManifest['/app.css'] + '" />';
	    chunk = '//<![CDATA[\n      window.webpackManifest = ' + JSON.stringify(chunkManifest) + ';\n      //]]>';
	    vendorjs = assetsManifest['/vendor.js'];
	    appjs = assetsManifest['/app.js'];
	  } else {
	    css = '';
	    chunk = '';
	    vendorjs = '/vendor.js';
	    appjs = '/app.js';
	  }

	  return ('\n\n<!DOCTYPE html>\n<html>\n  <head>\n    ' + head.title.toString() + '\n    ' + head.meta.toString() + '\n    ' + head.link.toString() + '\n    ' + css + '\n  </head>\n  <body>\n    <div id="root">' + html + '</div>\n    <script>\n      window.__INITIAL_STATE__ = ' + JSON.stringify(initialState) + ';\n      ' + chunk + '\n    </script>\n    <script src="' + vendorjs + '"></script>\n    <script src="' + appjs + '"></script>\n  </body>\n</html>\n\n  ').trim();
	};

	app.use(function (req, res, next) {
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (error, redirectLocation, renderProps) {
	    if (error) {
	      return res.status(500).send(error.message);
	    } else if (redirectLocation) {
	      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    } else if (renderProps) {
	      var _ret = function () {
	        var store = (0, _store.configureStore)();

	        return {
	          v: (0, _fetchData.fetchComponentData)(store, renderProps.components, renderProps.params).then(function () {
	            var initialView = (0, _server.renderToString)(_react2.default.createElement(
	              _reactRedux.Provider,
	              { store: store },
	              _react2.default.createElement(_reactRouter.RouterContext, renderProps)
	            ));
	            var finalState = store.getState();

	            res.set('Content-Type', 'text/html').status(200).end(renderFullPage(initialView, finalState));
	          }).catch(function (err) {
	            return next(err);
	          })
	        };
	      }();

	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    }

	    return res.status(404).send('Not Found');
	  });
	});

	/**
	 * Create Server and Listen
	 */

	/* eslint-disable no-console */

	app.listen(_config2.default.port, function (error) {
	  if (!error) {
	    console.log('frank-redux server listening on port ' + app.get('port'));
	  }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("serve-static");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("react-helmet");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.configureStore = configureStore;

	var _redux = __webpack_require__(12);

	var _reduxThunk = __webpack_require__(13);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reactRouterRedux = __webpack_require__(14);

	var _postsApi = __webpack_require__(15);

	var _postsApi2 = _interopRequireDefault(_postsApi);

	var _reactRouter = __webpack_require__(8);

	var _reducers = __webpack_require__(16);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function configureStore() {
	  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  return (0, _redux.createStore)(_reducers2.default, initialState, (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default, (0, _reactRouterRedux.routerMiddleware)(_reactRouter.browserHistory), _postsApi2.default)));
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("react-router-redux");

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var BASE_URL = '/api/posts/';

	function callAPI(endpoint, method) {
	  var token = localStorage.getItem('id_token') || null;
	  var config = {};

	  if (token) {
	    config = {
	      method: method,
	      headers: { 'x-access-token': token }
	    };
	  } else {
	    return Promise.reject('No token');
	  }

	  return fetch(BASE_URL + endpoint, config).then(function (response) {
	    return response.text().then(function (text) {
	      return { text: text, response: response };
	    });
	  }).then(function (_ref) {
	    var text = _ref.text,
	        response = _ref.response;

	    if (!response.ok) {
	      return Promise.reject(text);
	    }

	    return text;
	  }).catch(function () {});
	}

	function requestAPI(requestType) {
	  return {
	    type: requestType
	  };
	}

	var CALL_API = exports.CALL_API = Symbol('Call API');

	exports.default = function (store) {
	  return function (next) {
	    return function (action) {
	      var request = action[CALL_API];

	      if (typeof request === 'undefined') {
	        return next(action);
	      }

	      var dispatch = store.dispatch;
	      var endpoint = request.endpoint,
	          method = request.method,
	          types = request.types;

	      var _types = _slicedToArray(types, 3),
	          requestType = _types[0],
	          successType = _types[1],
	          errorType = _types[2];

	      dispatch(requestAPI(requestType));

	      return callAPI(endpoint, method).then(function (response) {
	        return next({
	          response: JSON.parse(response),
	          type: successType
	        });
	      }, function (error) {
	        return next({
	          error: error.message || 'Error',
	          type: errorType
	        });
	      });
	    };
	  };
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(12);

	var _AuthReducer = __webpack_require__(17);

	var _AuthReducer2 = _interopRequireDefault(_AuthReducer);

	var _IndexReducer = __webpack_require__(19);

	var _IndexReducer2 = _interopRequireDefault(_IndexReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _redux.combineReducers)({
	  auth: _AuthReducer2.default,
	  index: _IndexReducer2.default
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AuthActions = __webpack_require__(18);

	var isAuthenticated;
	if (typeof localStorage === 'undefined') {
	  isAuthenticated = false;
	} else if (localStorage.getItem('id_token')) {
	  isAuthenticated = true;
	} else {
	  isAuthenticated = false;
	}

	var initialState = {
	  isFetching: false,
	  isAuthenticated: isAuthenticated
	};

	var auth = function auth() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];

	  switch (action.type) {
	    case _AuthActions.INIT_AUTH:
	      return Object.assign({}, state, {
	        isAuthenticated: action.isAuthenticated
	      });
	    case _AuthActions.LOGIN_REQUEST:
	      return Object.assign({}, state, {
	        isFetching: true,
	        isAuthenticated: false,
	        user: action.creds
	      });
	    case _AuthActions.LOGIN_SUCCESS:
	      return Object.assign({}, state, {
	        isFetching: false,
	        isAuthenticated: true,
	        errorMessage: ''
	      });
	    case _AuthActions.LOGIN_FAILURE:
	      return Object.assign({}, state, {
	        isFetching: false,
	        isAuthenticated: false,
	        errorMessage: action.message
	      });
	    case _AuthActions.LOGOUT_SUCCESS:
	      return Object.assign({}, state, {
	        isFetching: true,
	        isAuthenticated: false
	      });
	    default:
	      return state;
	  }
	};

	exports.default = auth;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LOGOUT_SUCCESS = exports.LOGOUT_REQUEST = exports.LOGIN_FAILURE = exports.LOGIN_SUCCESS = exports.LOGIN_REQUEST = exports.INIT_AUTH = undefined;
	exports.initAuth = initAuth;
	exports.loginUser = loginUser;
	exports.logoutUser = logoutUser;

	var _reactRouterRedux = __webpack_require__(14);

	/* Init */

	var INIT_AUTH = exports.INIT_AUTH = 'INIT_AUTH';

	function checkToken() {
	  var isAuthenticated;
	  if (localStorage.getItem('id_token')) {
	    isAuthenticated = true;
	  } else {
	    isAuthenticated = false;
	  }

	  return {
	    type: INIT_AUTH,
	    isFetching: false,
	    isAuthenticated: isAuthenticated
	  };
	}

	function initAuth() {
	  return function (dispatch) {
	    dispatch(checkToken());
	    return Promise.resolve();
	  };
	}

	/* Login */

	var LOGIN_REQUEST = exports.LOGIN_REQUEST = 'LOGIN_REQUEST';
	var LOGIN_SUCCESS = exports.LOGIN_SUCCESS = 'LOGIN_SUCCESS';
	var LOGIN_FAILURE = exports.LOGIN_FAILURE = 'LOGIN_FAILURE';

	function requestLogin(creds) {
	  return {
	    type: LOGIN_REQUEST,
	    isFetching: true,
	    isAuthenticated: false,
	    creds: creds
	  };
	}

	function receiveLogin(user) {
	  return {
	    type: LOGIN_SUCCESS,
	    isFetching: false,
	    isAuthenticated: true,
	    id_token: user.id_token
	  };
	}

	function loginError(message) {
	  return {
	    type: LOGIN_FAILURE,
	    isFetching: false,
	    isAuthenticated: false,
	    message: message
	  };
	}

	function loginUser(creds) {
	  var config = {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	    body: 'username=' + creds.username + '&password=' + creds.password
	  };

	  return function (dispatch) {
	    dispatch(requestLogin(creds));

	    return fetch('/api/user/login', config).then(function (response) {
	      return response.json().then(function (user) {
	        return { user: user, response: response };
	      });
	    }).then(function (_ref) {
	      var user = _ref.user,
	          response = _ref.response;

	      if (!response.ok) {
	        dispatch(loginError(user.error));
	      } else {
	        if (typeof localStorage !== 'undefined') {
	          localStorage.setItem('id_token', user.id_token);
	        }
	        dispatch(receiveLogin(user));
	        dispatch((0, _reactRouterRedux.push)('/'));
	      }
	    }).catch(function () {});
	  };
	}

	/* Logout */

	var LOGOUT_REQUEST = exports.LOGOUT_REQUEST = 'LOGOUT_REQUEST';
	var LOGOUT_SUCCESS = exports.LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

	function requestLogout() {
	  return {
	    type: LOGOUT_REQUEST,
	    isFetching: true,
	    isAuthenticated: true
	  };
	}

	function receiveLogout() {
	  return {
	    type: LOGOUT_SUCCESS,
	    isFetching: false,
	    isAuthenticated: false
	  };
	}

	function logoutUser() {
	  return function (dispatch) {
	    dispatch(requestLogout());
	    if (typeof localStorage !== 'undefined') {
	      localStorage.removeItem('id_token');
	    }
	    dispatch(receiveLogout());
	    dispatch((0, _reactRouterRedux.push)('/login'));
	  };
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _IndexActions = __webpack_require__(20);

	var initialState = {
	  isFetching: false,
	  posts: []
	};

	var posts = function posts() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];

	  switch (action.type) {
	    case _IndexActions.POSTS_REQUEST:
	      return Object.assign({}, state, {
	        isFetching: true
	      });
	    case _IndexActions.POSTS_SUCCESS:
	      return Object.assign({}, state, {
	        isFetching: false,
	        posts: action.response
	      });
	    case _IndexActions.POSTS_FAILURE:
	      return Object.assign({}, state, {
	        isFetching: false,
	        error: action.error
	      });
	    default:
	      return state;
	  }
	};

	exports.default = posts;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.POSTS_FAILURE = exports.POSTS_SUCCESS = exports.POSTS_REQUEST = undefined;
	exports.fetchPosts = fetchPosts;

	var _postsApi = __webpack_require__(15);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var POSTS_REQUEST = exports.POSTS_REQUEST = 'POSTS_REQUEST';
	var POSTS_SUCCESS = exports.POSTS_SUCCESS = 'POSTS_SUCCESS';
	var POSTS_FAILURE = exports.POSTS_FAILURE = 'POSTS_FAILURE';

	function fetchPosts() {
	  return _defineProperty({}, _postsApi.CALL_API, {
	    endpoint: 'allPosts',
	    method: 'GET',
	    types: [POSTS_REQUEST, POSTS_SUCCESS, POSTS_FAILURE]
	  });
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var path = __webpack_require__(1);

	var webpack = __webpack_require__(22);
	var ExtractTextPlugin = __webpack_require__(23);
	var ManifestPlugin = __webpack_require__(24);
	var ChunkManifestPlugin = __webpack_require__(25);
	var cssnext = __webpack_require__(26);
	var postcssFocus = __webpack_require__(27);
	var postcssReporter = __webpack_require__(28);
	var cssnano = __webpack_require__(29);

	module.exports = {
	  entry: {
	    app: ['./client/index.jsx'],
	    vendor: ['react', 'react-dom', 'jquery', 'velocity']
	  },

	  output: {
	    path: __dirname,
	    filename: 'app.js',
	    publicPath: 'http://0.0.0.0:8000/'
	  },

	  resolve: {
	    extensions: ['', '.js', '.jsx'],
	    modules: ['client', 'node_modules'],
	    alias: {
	      jquery: path.resolve('client/vendor/jquery'),
	      velocity: path.resolve('client/vendor/velocity')
	    }
	  },

	  module: {
	    loaders: [{
	      test: /\.css$/,
	      exclude: /node_modules/,
	      loader: 'style-loader!css-loader?localIdentName=[hash:base64]&modules&importLoaders=1!postcss-loader'
	    }, {
	      test: /\.scss$/,
	      loader: 'style-loader!css-loader?localIdentName=[hash:base64]&modules&importLoaders=1!postcss-loader!sass'
	    }, {
	      test: /\.css$/,
	      include: /node_modules/,
	      loaders: ['style-loader', 'css-loader']
	    }, {
	      test: /\.jsx*$/,
	      exclude: /node_modules/,
	      loader: 'babel',
	      query: {
	        presets: ['es2015', 'react']
	      }
	    }, {
	      test: /\.(jpe?g|gif|png|svg)$/i,
	      loader: 'url-loader?limit=10000'
	    }, {
	      test: /\.json$/,
	      loader: 'json-loader'
	    }]
	  },

	  plugins: [new webpack.ProvidePlugin({
	    $: 'jquery',
	    'window.jQuery': 'jquery'
	  }), new webpack.DefinePlugin({
	    'process.env': {
	      NODE_ENV: JSON.stringify('production')
	    }
	  }), new webpack.optimize.CommonsChunkPlugin({
	    name: 'vendor',
	    minChunks: Infinity,
	    filename: 'vendor.js'
	  }), new ExtractTextPlugin('app.[chunkhash].css', { allChunks: true }), new ManifestPlugin({
	    basePath: '/'
	  }), new ChunkManifestPlugin({
	    filename: 'chunk-manifest.json',
	    manifestVariable: 'webpackManifest'
	  }), new webpack.optimize.UglifyJsPlugin({
	    compressor: {
	      warnings: false
	    }
	  })],

	  postcss: function postcss() {
	    return [postcssFocus(), cssnext({
	      browsers: ['last 2 versions', 'IE > 10']
	    }), cssnano({
	      autoprefixer: false
	    }), postcssReporter({
	      clearMessages: true
	    })];
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("extract-text-webpack-plugin");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("webpack-manifest-plugin");

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("chunk-manifest-webpack-plugin");

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("postcss-cssnext");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("postcss-focus");

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("postcss-reporter");

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("cssnano");

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var config = {
	  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/frank-redux',
	  port: process.env.PORT || 3000
	};

	exports.default = config;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(2);

	var _user = __webpack_require__(32);

	var UserController = _interopRequireWildcard(_user);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var router = new _express.Router();

	router.route('/login').post(UserController.login);

	exports.default = router;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.login = login;

	var _lodash = __webpack_require__(33);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _jsonwebtoken = __webpack_require__(34);

	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var users = [{
	  _id: 1,
	  username: 'test',
	  password: 'test'
	}];

	function getUserScheme(req) {
	  var username = req.body.username;
	  var userSearch = { username: username };

	  return {
	    username: username,
	    userSearch: userSearch
	  };
	}

	function createToken(user) {
	  return _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), 'testSecret', {
	    expiresIn: 60 * 60 * 5
	  });
	}

	function login(req, res) {
	  var userScheme = getUserScheme(req);

	  if (!userScheme.username || !req.body.password) {
	    res.status(400).send({
	      error: 'The Username and Password fields must be nonempty'
	    });

	    return;
	  }

	  var user = _lodash2.default.find(users, userScheme.userSearch);

	  if (!user || user.password !== req.body.password) {
	    res.status(401).send({
	      error: 'The Username or Password do not match'
	    });

	    return;
	  }

	  res.status(201).send({
	    id_token: createToken(user)
	  });
	}

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(2);

	var _posts = __webpack_require__(36);

	var PostsController = _interopRequireWildcard(_posts);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var router = new _express.Router();

	router.use(PostsController.verifyToken);

	router.route('/allPosts').get(PostsController.allPosts);

	exports.default = router;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.verifyToken = verifyToken;
	exports.allPosts = allPosts;

	var _jsonwebtoken = __webpack_require__(34);

	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var posts = [{
	  _id: 1,
	  user: {
	    username: 'username'
	  },
	  comments: [],
	  tags: ['clothing', 'hair', 'woman'],
	  image: 'https://s-media-cache-ak0.pinimg.com/originals/57/ec/d6/57ecd6482ca632318baf5ea8d5168b09.jpg',
	  description: '\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n    Praesent faucibus mi volutpat sem varius, ac condimentum ipsum fermentum.\n    Phasellus condimentum tortor et dolor imperdiet, in facilisis urna mollis.\n    Quisque fringilla dapibus augue, sed volutpat felis consequat eget.\n    Nullam quis tortor tempus, mollis velit sed, facilisis nibh.\n    Praesent non massa vel tortor mollis venenatis.\n    Phasellus neque metus, imperdiet eu ante vel, rhoncus convallis nulla.\n    Praesent lectus nulla, laoreet quis gravida ac, maximus eget odio.\n    Nullam ipsum metus, venenatis sit amet lorem non, volutpat iaculis lacus.\n    ',
	  score: 100
	}];

	function verifyToken(req, res, next) {
	  var token = req.headers['x-access-token'];

	  if (token) {
	    _jsonwebtoken2.default.verify(token, 'testSecret', function (err, user) {
	      if (err) {
	        res.status(401).send({
	          error: err
	        });
	      } else {
	        req.user = user;
	        next();
	      }
	    });
	  } else {
	    res.status(400);
	  }
	}

	function allPosts(req, res) {
	  res.status(200).send(posts);
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fetchComponentData = fetchComponentData;

	var _promiseUtils = __webpack_require__(38);

	function fetchComponentData(store, components, params) {
	  var needs = components.reduce(function (prev, current) {
	    return (current.need || []).concat((current.WrappedComponent && current.WrappedComponent.need !== current.need ? current.WrappedComponent.need : []) || []).concat(prev);
	  }, []);

	  return (0, _promiseUtils.sequence)(needs, function (need) {
	    return store.dispatch(need(params, store.getState()));
	  });
	}

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.sequence = sequence;
	function sequence(items, consumer) {
	  var results = [];
	  var runner = function runner() {
	    var item = items.shift();
	    if (item) {
	      return consumer(item).then(function (result) {
	        results.push(result);
	      }).then(runner);
	    }

	    return Promise.resolve(results);
	  };

	  return runner();
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(8);

	var _AppContainer = __webpack_require__(40);

	var _AppContainer2 = _interopRequireDefault(_AppContainer);

	var _App = __webpack_require__(41);

	var _App2 = _interopRequireDefault(_App);

	var _Index = __webpack_require__(45);

	var _Index2 = _interopRequireDefault(_Index);

	var _Login = __webpack_require__(47);

	var _Login2 = _interopRequireDefault(_Login);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _AppContainer2.default },
	  _react2.default.createElement(
	    _reactRouter.Route,
	    { component: _App2.default },
	    _react2.default.createElement(_reactRouter.IndexRoute, { component: _Index2.default })
	  ),
	  _react2.default.createElement(_reactRouter.Route, { path: 'login', component: _Login2.default })
	);

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactHelmet = __webpack_require__(9);

	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: 0 */


	var AppContainer = function (_Component) {
	  _inherits(AppContainer, _Component);

	  function AppContainer(props) {
	    _classCallCheck(this, AppContainer);

	    var _this = _possibleConstructorReturn(this, (AppContainer.__proto__ || Object.getPrototypeOf(AppContainer)).call(this, props));

	    _this.state = { isMounted: false };
	    return _this;
	  }

	  _createClass(AppContainer, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setState({ isMounted: true });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_reactHelmet2.default, {
	          defaultTitle: 'Test',
	          titleTemplate: '%s - Test',
	          meta: [{ charset: 'utf-8' }, { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' }, { name: 'viewport', content: 'width=device-width,height=device-height,initial-scale=1.0,user-scalable=0,minimum-scale=1.0,maximum-scale=1.0' }, { name: 'keywords', content: '' }, { name: 'author', content: '' }, { name: 'robots', content: 'index, follow' }, { name: 'revisit-after', content: '1 days' }],
	          link: [{ rel: 'author', href: 'humans.txt' }]
	        }),
	        this.props.children
	      );
	    }
	  }]);

	  return AppContainer;
	}(_react.Component);

	AppContainer.propTypes = {
	  children: _react2.default.PropTypes.object.isRequired
	};

	exports.default = AppContainer;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(10);

	var _reactRouterRedux = __webpack_require__(14);

	var _AuthActions = __webpack_require__(18);

	var _Header = __webpack_require__(42);

	var _Header2 = _interopRequireDefault(_Header);

	var _Footer = __webpack_require__(43);

	var _Footer2 = _interopRequireDefault(_Footer);

	var _App = {
	  "app": "_2bj__J7svKUVdeR5Mq__H_",
	  "container": "_1kWctN4pAdp-p32CbmgOD7"
	};

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = function (_Component) {
	  _inherits(App, _Component);

	  function App(props) {
	    _classCallCheck(this, App);

	    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	    _this.state = { isMounted: false };
	    return _this;
	  }

	  _createClass(App, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      var dispatch = this.props.dispatch;


	      dispatch((0, _AuthActions.initAuth)()).then(function () {
	        var isAuthenticated = _this2.props.isAuthenticated;


	        if (!isAuthenticated) {
	          dispatch((0, _reactRouterRedux.push)('/login'));
	        }
	      });

	      this.setState({ isMounted: true });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          dispatch = _props.dispatch,
	          children = _props.children,
	          location = _props.location;
	      var pathname = location.pathname;


	      return _react2.default.createElement(
	        'div',
	        { id: _App2.default.app },
	        _react2.default.createElement(_Header2.default, {
	          onLogoutClick: function onLogoutClick() {
	            return dispatch((0, _AuthActions.logoutUser)());
	          }
	        }),
	        _react2.default.createElement(
	          'div',
	          { className: _App2.default.container },
	          children
	        ),
	        _react2.default.createElement(_Footer2.default, {
	          pathname: pathname
	        })
	      );
	    }
	  }]);

	  return App;
	}(_react.Component);

	App.propTypes = {
	  dispatch: _react2.default.PropTypes.func.isRequired,
	  isAuthenticated: _react2.default.PropTypes.bool.isRequired,
	  children: _react2.default.PropTypes.object.isRequired,
	  location: _react2.default.PropTypes.object.isRequired
	};

	function mapStateToProps(state) {
	  var auth = state.auth;
	  var isAuthenticated = auth.isAuthenticated;


	  return {
	    isAuthenticated: isAuthenticated
	  };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(App);

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Header = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _Header = {
	  "header": "_1gojyfyWXhhfHNYDmYH54L",
	  "logo": "aH8URw6l9v-WpVuVTmyIw",
	  "image": "_2Y-PDFOg-Ye_rYwZh1knS4",
	  "logout": "_1pzjsNyjR4i0bgs9p0kUTx",
	  "button": "_1IbGoA4nBN7ZDSbwL5MaMI"
	};

	var _Header2 = _interopRequireDefault(_Header);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Header = exports.Header = function (_Component) {
	  _inherits(Header, _Component);

	  function Header(props) {
	    _classCallCheck(this, Header);

	    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

	    _this.state = { isMounted: false };
	    return _this;
	  }

	  _createClass(Header, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setState({ isMounted: true });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var onLogoutClick = this.props.onLogoutClick;


	      return _react2.default.createElement(
	        'div',
	        { id: _Header2.default.header },
	        _react2.default.createElement(
	          'div',
	          { className: _Header2.default.logo },
	          _react2.default.createElement(
	            'div',
	            { className: _Header2.default.image },
	            'Frank'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _Header2.default.logout },
	          _react2.default.createElement(
	            'div',
	            { className: _Header2.default.button, onClick: onLogoutClick },
	            'Logout'
	          )
	        )
	      );
	    }
	  }]);

	  return Header;
	}(_react.Component);

	Header.propTypes = {
	  onLogoutClick: _react2.default.PropTypes.func.isRequired
	};

	exports.default = Header;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Footer = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(8);

	var _NavButton = __webpack_require__(44);

	var _NavButton2 = _interopRequireDefault(_NavButton);

	var _Footer = {
	  "footer": "_3rw87YEmmuMvlVQt192KZu",
	  "button": "_1nUNRJVG3e2v0Owq-O_h7S",
	  "home": "TF0s1EWG0Cr1wZA_sWbmA",
	  "selected": "h-fFtUG7gJfF6JcxHScMB",
	  "submit": "_3etm1bRAZKGjSlG34Epimu",
	  "search": "_37gavtZI5cPq4KTmMug2NV",
	  "history": "_2akF7dorJzJSilTC9E3QRR",
	  "a": "ZAUD_wVl0Ha9-xo9pZNMx",
	  "b": "_3bDPTs8k_VNgtQkUHs9GTM",
	  "c": "_3nMo029OUKTBg_yFGQiHs7"
	};

	var _Footer2 = _interopRequireDefault(_Footer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: 0 */

	var Footer = exports.Footer = function (_Component) {
	  _inherits(Footer, _Component);

	  function Footer(props) {
	    _classCallCheck(this, Footer);

	    var _this = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));

	    _this.state = { isMounted: false };
	    return _this;
	  }

	  _createClass(Footer, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setState({ isMounted: true });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var pathname = this.props.pathname;


	      var homeLink = '/';
	      var isHome = pathname === homeLink;

	      var isSubmit = false;
	      var isSearch = false;
	      var isHistory = false;

	      return _react2.default.createElement(
	        'div',
	        { id: _Footer2.default.footer },
	        _react2.default.createElement(_NavButton2.default, {
	          defaultClasses: _Footer2.default.button + ' ' + _Footer2.default.home,
	          selectedClass: _Footer2.default.selected,
	          currPath: pathname,
	          path: '/',
	          svg: '\n            <svg width="18" height="16" viewBox="0 3 18 16" xmlns="http://www.w3.org/2000/svg">\n              <path d="M15.923 11.182H18L9 3l-9 8.182h2.077V18h13.846v-6.818zm-9 2.045h4.154V18H6.923v-4.773z" fill-rule="evenodd"/>\n            </svg>\n          '
	        }),
	        _react2.default.createElement(_NavButton2.default, {
	          defaultClasses: _Footer2.default.button + ' ' + _Footer2.default.submit,
	          selectedClass: _Footer2.default.selected,
	          currPath: pathname,
	          path: '/submit',
	          svg: '\n            <svg width="15" height="15" viewBox="66 3 15 15" xmlns="http://www.w3.org/2000/svg">\n              <path d="M73.17 10.505H68v-.334H73.17V5h.335V10.17h5.171v.335h-5.171v5.171h-.334v-5.171z" stroke-width="3" fill="none" fill-rule="evenodd" stroke-linecap="square"/>\n            </svg>\n          '
	        }),
	        _react2.default.createElement(_NavButton2.default, {
	          defaultClasses: _Footer2.default.button + ' ' + _Footer2.default.search,
	          selectedClass: _Footer2.default.selected,
	          currPath: pathname,
	          path: '/search',
	          svg: '\n            <svg width="24" height="23" viewBox="-1 -1 24 23" xmlns="http://www.w3.org/2000/svg">\n              <path d="M12.93 11.686l.008.008 4.528 3.936.566.492-.995 1.145-.566-.492-4.528-3.936-.084-.075c-2.098 1.618-5.093 1.604-7.147-.18C2.367 10.544 2.138 6.97 4.2 4.6c2.062-2.372 5.634-2.642 7.978-.604 2.25 1.955 2.552 5.325.753 7.69zm-1.373-.69c1.512-1.74 1.343-4.36-.376-5.855-1.718-1.494-4.338-1.295-5.85.444-1.51 1.74-1.343 4.36.376 5.855 1.72 1.493 4.34 1.295 5.85-.444z" stroke-linecap="square" fill-rule="evenodd"/>\n            </svg>\n          '
	        }),
	        _react2.default.createElement(_NavButton2.default, {
	          defaultClasses: _Footer2.default.button + ' ' + _Footer2.default.history,
	          selectedClass: _Footer2.default.selected,
	          currPath: pathname,
	          path: '/history',
	          svg: '\n            <svg width="22" height="22" viewBox="195 -1 22 22" xmlns="http://www.w3.org/2000/svg">\n              <g fill="none" fill-rule="evenodd">\n                <path class="' + _Footer2.default.a + '" d="M199.622 12.974c1.643 3.522 5.83 5.046 9.352 3.404 3.522-1.643 5.046-5.83 3.404-9.352-1.643-3.522-5.83-5.046-9.352-3.404-1.057.493-1.934 1.215-2.6 2.08" stroke-width="2"/>\n                <path class="' + _Footer2.default.b + '" d="M199.03 8.278l-.898-3.834 4.578 2.435z"/>\n                <path class="' + _Footer2.default.c + '" d="M205.5 8.5v2M205.5 11h2" stroke-width="2" stroke-linecap="square"/>\n              </g>\n            </svg>\n          '
	        })
	      );
	    }
	  }]);

	  return Footer;
	}(_react.Component);

	Footer.propTypes = {
	  pathname: _react2.default.PropTypes.string.isRequired
	};

	exports.default = Footer;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NavButton = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NavButton = exports.NavButton = function (_Component) {
	  _inherits(NavButton, _Component);

	  function NavButton(props) {
	    _classCallCheck(this, NavButton);

	    var _this = _possibleConstructorReturn(this, (NavButton.__proto__ || Object.getPrototypeOf(NavButton)).call(this, props));

	    _this.state = { isMounted: false };
	    return _this;
	  }

	  _createClass(NavButton, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setState({ isMounted: true });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          defaultClasses = _props.defaultClasses,
	          selectedClass = _props.selectedClass,
	          currPath = _props.currPath,
	          path = _props.path,
	          svg = _props.svg;

	      var isCurrentPath = currPath === path;

	      return _react2.default.createElement(
	        'div',
	        { className: defaultClasses + ' ' + (isCurrentPath && selectedClass) },
	        _react2.default.createElement(_reactRouter.Link, { to: path, dangerouslySetInnerHTML: { __html: svg } })
	      );
	    }
	  }]);

	  return NavButton;
	}(_react.Component);

	NavButton.propTypes = {
	  defaultClasses: _react2.default.PropTypes.string.isRequired,
	  selectedClass: _react2.default.PropTypes.string.isRequired,
	  currPath: _react2.default.PropTypes.string.isRequired,
	  path: _react2.default.PropTypes.string.isRequired,
	  svg: _react2.default.PropTypes.string.isRequired
	};

	exports.default = NavButton;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Index = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(10);

	var _IndexActions = __webpack_require__(20);

	var _Post = __webpack_require__(46);

	var _Index = {
	  "index": "WqAGihcM094aYCek790sd",
	  "title": "MifLSNMZX4_x3qBkB2vBA"
	};

	var _Index2 = _interopRequireDefault(_Index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Index = exports.Index = function (_Component) {
	  _inherits(Index, _Component);

	  function Index(props) {
	    _classCallCheck(this, Index);

	    var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

	    _this.state = { isMounted: false };
	    return _this;
	  }

	  _createClass(Index, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var dispatch = this.props.dispatch;


	      this.setState({ isMounted: true });

	      dispatch((0, _IndexActions.fetchPosts)());
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          isFetching = _props.isFetching,
	          posts = _props.posts;


	      var postNodes = posts.map(function (post) {
	        return _react2.default.createElement(_Post.Post, {
	          post: post
	        });
	      });

	      return _react2.default.createElement(
	        'div',
	        { id: _Index2.default.index },
	        _react2.default.createElement(
	          'div',
	          { className: _Index2.default.title },
	          'TRENDING'
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          postNodes
	        ),
	        isFetching && _react2.default.createElement(
	          'div',
	          null,
	          'Fetching'
	        )
	      );
	    }
	  }]);

	  return Index;
	}(_react.Component);

	Index.PropTypes = {
	  dispatch: _react.PropTypes.func.isRequired,
	  isFetching: _react.PropTypes.bool.isRequired,
	  posts: _react.PropTypes.array.isRequired
	};

	function mapStateToProps(state) {
	  var index = state.index;
	  var isFetching = index.isFetching,
	      posts = index.posts;


	  return {
	    isFetching: isFetching,
	    posts: posts
	  };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Index);

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Post = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(10);

	var _reactRouter = __webpack_require__(8);

	var _Post = {
	  "post": "_2_0YQS_5GzQfuKTQttRT6J",
	  "container": "_3emuwj8GhLsaoIC0UGMD5a",
	  "info": "_2l2E-LzvsqwXZgOnswLwXZ",
	  "username": "uNfUTZKjkXkCNhWF8BKN-",
	  "preview": "_23gSwzx2GBgTndI4a9-Vp7",
	  "left": "_2XeM_eNDKlG2MC4KCTWBYh",
	  "description": "_1U4MO_-mIyxDF0J-FeN9LP",
	  "right": "_3TMvA1HDM4AYKp_nlOz5iW",
	  "upvote": "_2rOIFvr88JVcKtGTiURdI-",
	  "selected": "_1Wa2JA6ScEZJjh5gnVPS59",
	  "downvote": "_1LyFBrcIzBGSYO2qdaotbX",
	  "separator": "_3o8VJ8lEdWjdI65cLI-Y_r",
	  "links": "_2Zq9XYKgjUI4QXlsWlQgE9",
	  "viewComments": "eCTnpHe-p6Raj6yzzXLuD",
	  "tag": "t3BWgQrPUUtHugbHOpLvb"
	};

	var _Post2 = _interopRequireDefault(_Post);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Post = exports.Post = function (_Component) {
	  _inherits(Post, _Component);

	  function Post(props) {
	    _classCallCheck(this, Post);

	    var _this = _possibleConstructorReturn(this, (Post.__proto__ || Object.getPrototypeOf(Post)).call(this, props));

	    _this.state = { isMounted: false };
	    return _this;
	  }

	  _createClass(Post, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var upvoted = false;
	      var downvoted = false;

	      this.setState({
	        isMounted: true,
	        upvoted: upvoted,
	        downvoted: downvoted
	      });
	    }
	  }, {
	    key: 'onUpvoteClick',
	    value: function onUpvoteClick() {
	      var upvoted = this.state.upvoted;


	      this.setState({
	        upvoted: !upvoted,
	        downvoted: false
	      });
	    }
	  }, {
	    key: 'onDownvoteClick',
	    value: function onDownvoteClick() {
	      var downvoted = this.state.downvoted;


	      this.setState({
	        downvoted: !downvoted,
	        upvoted: false
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var post = this.props.post;
	      var _id = post._id,
	          user = post.user,
	          comments = post.comments,
	          tags = post.tags,
	          image = post.image,
	          description = post.description,
	          score = post.score;
	      var username = user.username;
	      var _state = this.state,
	          upvoted = _state.upvoted,
	          downvoted = _state.downvoted;


	      var shortenedDescription;
	      if (description.length > 100) {
	        shortenedDescription = description.substring(0, 100) + '...';
	      } else {
	        shortenedDescription = description;
	      }

	      var adjustedScore;
	      if (upvoted) {
	        adjustedScore = score + 1;
	      } else if (downvoted) {
	        adjustedScore = score - 1;
	      } else {
	        adjustedScore = score;
	      }

	      var tagList = tags.map(function (tag) {
	        return _react2.default.createElement(
	          'span',
	          null,
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/?search=' + tag, className: _Post2.default.tag },
	            '#' + tag
	          )
	        );
	      });

	      return _react2.default.createElement(
	        'div',
	        { className: _Post2.default.post },
	        _react2.default.createElement(
	          'div',
	          { className: _Post2.default.container },
	          _react2.default.createElement('img', { src: image, alt: 'test' }),
	          _react2.default.createElement(
	            'div',
	            { className: _Post2.default.info },
	            _react2.default.createElement(
	              'div',
	              { className: _Post2.default.username },
	              username
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: _Post2.default.preview },
	              _react2.default.createElement(
	                'div',
	                { className: _Post2.default.left },
	                _react2.default.createElement(
	                  'div',
	                  { className: _Post2.default.description },
	                  shortenedDescription
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: _Post2.default.right },
	                _react2.default.createElement(
	                  'div',
	                  {
	                    className: _Post2.default.upvote + ' ' + (upvoted && _Post2.default.selected),
	                    onClick: function onClick() {
	                      return _this2.onUpvoteClick();
	                    }
	                  },
	                  '\u2227'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  null,
	                  adjustedScore
	                ),
	                _react2.default.createElement(
	                  'div',
	                  {
	                    className: _Post2.default.downvote + ' ' + (downvoted && _Post2.default.selected),
	                    onClick: function onClick() {
	                      return _this2.onDownvoteClick();
	                    }
	                  },
	                  '\u2228'
	                )
	              )
	            ),
	            _react2.default.createElement('div', { className: _Post2.default.separator }),
	            _react2.default.createElement(
	              'div',
	              { className: _Post2.default.links },
	              _react2.default.createElement(
	                _reactRouter.Link,
	                { to: '/?id=' + _id, className: _Post2.default.viewComments },
	                'VIEW ' + comments.length + ' COMMENTS'
	              ),
	              tagList
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Post;
	}(_react.Component);

	Post.PropTypes = {
	  dispatch: _react.PropTypes.func.isRequired,
	  post: _react.PropTypes.object.isRequired
	};

	function mapStateToProps() {
	  return {};
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Post);

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Login = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(10);

	var _reactRouter = __webpack_require__(8);

	var _AuthActions = __webpack_require__(18);

	var _LoginForm = __webpack_require__(48);

	var _LoginForm2 = _interopRequireDefault(_LoginForm);

	var _Login = {
	  "login": "_2ajl6W_ZtgfbshCyLYct-3",
	  "container": "_2m2-zSu0xMmDdXkZY_Njck",
	  "signup": "_1GRtSck8DMN4dt5JPHaHoC"
	};

	var _Login2 = _interopRequireDefault(_Login);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Login = exports.Login = function (_Component) {
	  _inherits(Login, _Component);

	  function Login(props) {
	    _classCallCheck(this, Login);

	    var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

	    _this.state = { isMounted: false };
	    return _this;
	  }

	  _createClass(Login, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setState({ isMounted: true });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          dispatch = _props.dispatch,
	          errorMessage = _props.errorMessage;


	      return _react2.default.createElement(
	        'div',
	        { id: _Login2.default.login },
	        _react2.default.createElement(
	          'div',
	          { className: _Login2.default.container },
	          _react2.default.createElement(_LoginForm2.default, {
	            onLoginClick: function onLoginClick(creds) {
	              return dispatch((0, _AuthActions.loginUser)(creds));
	            },
	            errorMessage: errorMessage
	          })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _Login2.default.signup },
	          'First time here? ',
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/login' },
	            'Create an Account!'
	          )
	        )
	      );
	    }
	  }]);

	  return Login;
	}(_react.Component);

	Login.propTypes = {
	  dispatch: _react.PropTypes.func.isRequired,
	  errorMessage: _react.PropTypes.string
	};

	function mapStateToProps(state) {
	  var auth = state.auth;
	  var errorMessage = auth.errorMessage;


	  return {
	    errorMessage: errorMessage
	  };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Login);

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LoginForm = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(10);

	var _LoginForm = {
	  "loginForm": "_1vJIObd7jSxd9a029_Jlxo",
	  "errorMessage": "_3MT_QoZ8GAxfT4_QtwCy5j",
	  "active": "_1RPBpUdF9D7eYKvhP9b4kJ"
	};

	var _LoginForm2 = _interopRequireDefault(_LoginForm);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LoginForm = exports.LoginForm = function (_Component) {
	  _inherits(LoginForm, _Component);

	  function LoginForm(props) {
	    _classCallCheck(this, LoginForm);

	    var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));

	    _this.state = { isMounted: false };
	    return _this;
	  }

	  _createClass(LoginForm, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setState({ isMounted: true });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var errorMessage = this.props.errorMessage;


	      return _react2.default.createElement(
	        'div',
	        { id: _LoginForm2.default.loginForm },
	        _react2.default.createElement('input', {
	          type: 'text',
	          ref: 'username',
	          placeholder: 'USERNAME',
	          autoComplete: 'off'
	        }),
	        _react2.default.createElement('input', {
	          type: 'password',
	          ref: 'password',
	          placeholder: 'PASSWORD',
	          autoComplete: 'off'
	        }),
	        errorMessage && _react2.default.createElement(
	          'div',
	          { className: _LoginForm2.default.errorMessage },
	          errorMessage
	        ),
	        _react2.default.createElement(
	          'button',
	          { onClick: function onClick() {
	              return _this2.handleClick();
	            } },
	          'LOGIN'
	        )
	      );
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick() {
	      var onLoginClick = this.props.onLoginClick;


	      var username = this.refs.username;
	      var password = this.refs.password;
	      var creds = {
	        username: username.value.trim(),
	        password: password.value.trim()
	      };

	      onLoginClick(creds);
	    }
	  }]);

	  return LoginForm;
	}(_react.Component);

	LoginForm.propTypes = {
	  onLoginClick: _react.PropTypes.func.isRequired,
	  errorMessage: _react.PropTypes.string
	};

	exports.default = (0, _reactRedux.connect)()(LoginForm);

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ }
/******/ ]);