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

	var _config = __webpack_require__(21);

	var _config2 = _interopRequireDefault(_config);

	var _user = __webpack_require__(22);

	var _user2 = _interopRequireDefault(_user);

	var _posts = __webpack_require__(26);

	var _posts2 = _interopRequireDefault(_posts);

	var _fetchData = __webpack_require__(28);

	var _routes = __webpack_require__(30);

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

	  var assetsManifest = JSON.parse(process.env.webpackAssets);
	  var chunkManifest = JSON.parse(process.env.webpackChunkAssets);

	  return ('\n\n<!DOCTYPE html>\n<html>\n  <head>\n    ' + head.title.toString() + '\n    ' + head.meta.toString() + '\n    ' + head.link.toString() + '\n    <link rel="stylesheet" href="' + assetsManifest['/app.css'] + '" />\n  </head>\n  <body>\n    <div id="root">' + html + '</div>\n    <script>\n      window.__INITIAL_STATE__ = ' + JSON.stringify(initialState) + ';\n      window.webpackManifest = ' + JSON.stringify(chunkManifest) + ';\n    </script>\n    <script src="' + assetsManifest['/vendor.js'] + '"></script>\n    <script src="' + assetsManifest['/app.js'] + '"></script>\n  </body>\n</html>\n\n  ').trim();
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
	    throw 'Error: No token';
	  }

	  return fetch(BASE_URL + endpoint, config).then(function (response) {
	    return response.text().then(function (text) {
	      return { text: text, response: response };
	    });
	  }).then(function (_ref) {
	    var text = _ref.text;
	    var response = _ref.response;

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
	      var endpoint = request.endpoint;
	      var method = request.method;
	      var types = request.types;

	      var _types = _slicedToArray(types, 3);

	      var requestType = _types[0];
	      var successType = _types[1];
	      var errorType = _types[2];


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
	      var user = _ref.user;
	      var response = _ref.response;

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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(2);

	var _user = __webpack_require__(23);

	var UserController = _interopRequireWildcard(_user);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var router = new _express.Router();

	router.route('/login').post(UserController.login);

	exports.default = router;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.login = login;

	var _lodash = __webpack_require__(24);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _jsonwebtoken = __webpack_require__(25);

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
/* 24 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(2);

	var _posts = __webpack_require__(27);

	var PostsController = _interopRequireWildcard(_posts);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var router = new _express.Router();

	router.use(PostsController.verifyToken);

	router.route('/allPosts').get(PostsController.allPosts);

	exports.default = router;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.verifyToken = verifyToken;
	exports.allPosts = allPosts;

	var _jsonwebtoken = __webpack_require__(25);

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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fetchComponentData = fetchComponentData;

	var _promiseUtils = __webpack_require__(29);

	function fetchComponentData(store, components, params) {
	  var needs = components.reduce(function (prev, current) {
	    return (current.need || []).concat((current.WrappedComponent && current.WrappedComponent.need !== current.need ? current.WrappedComponent.need : []) || []).concat(prev);
	  }, []);

	  return (0, _promiseUtils.sequence)(needs, function (need) {
	    return store.dispatch(need(params, store.getState()));
	  });
	}

/***/ },
/* 29 */
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(8);

	var _AppContainer = __webpack_require__(31);

	var _AppContainer2 = _interopRequireDefault(_AppContainer);

	var _App = __webpack_require__(32);

	var _App2 = _interopRequireDefault(_App);

	var _Index = __webpack_require__(35);

	var _Index2 = _interopRequireDefault(_Index);

	var _Login = __webpack_require__(37);

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
/* 31 */
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
/* 32 */
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

	var _Header = __webpack_require__(33);

	var _Header2 = _interopRequireDefault(_Header);

	var _Footer = __webpack_require__(34);

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

	        _this2.setState({ isMounted: true });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var dispatch = this.props.dispatch;


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
	          this.props.children
	        ),
	        _react2.default.createElement(_Footer2.default, null)
	      );
	    }
	  }]);

	  return App;
	}(_react.Component);

	App.propTypes = {
	  dispatch: _react2.default.PropTypes.func.isRequired,
	  isAuthenticated: _react2.default.PropTypes.bool.isRequired,
	  children: _react2.default.PropTypes.object.isRequired
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
/* 33 */
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
	  "header": "_1gojyfyWXhhfHNYDmYH54L"
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
	        'I am the header',
	        _react2.default.createElement(
	          'div',
	          { onClick: onLogoutClick },
	          'Logout'
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Footer = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _Footer = {
	  "footer": "_3rw87YEmmuMvlVQt192KZu"
	};

	var _Footer2 = _interopRequireDefault(_Footer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
	      return _react2.default.createElement(
	        'div',
	        { id: _Footer2.default.footer },
	        'I am the footer'
	      );
	    }
	  }]);

	  return Footer;
	}(_react.Component);

	exports.default = Footer;

/***/ },
/* 35 */
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

	var _Post = __webpack_require__(36);

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
	      var _props = this.props;
	      var isFetching = _props.isFetching;
	      var posts = _props.posts;


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
	  var isFetching = index.isFetching;
	  var posts = index.posts;


	  return {
	    isFetching: isFetching,
	    posts: posts
	  };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Index);

/***/ },
/* 36 */
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
	    key: 'upvote',
	    value: function upvote() {
	      this.setState({
	        upvoted: true,
	        downvoted: false
	      });
	    }
	  }, {
	    key: 'downvote',
	    value: function downvote() {
	      this.setState({
	        downvoted: true,
	        upvoted: false
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props$post = this.props.post;
	      var _id = _props$post._id;
	      var user = _props$post.user;
	      var comments = _props$post.comments;
	      var tags = _props$post.tags;
	      var image = _props$post.image;
	      var description = _props$post.description;
	      var score = _props$post.score;
	      var username = user.username;
	      var _state = this.state;
	      var upvoted = _state.upvoted;
	      var downvoted = _state.downvoted;


	      var shortenedDescription;
	      if (description.length > 100) {
	        shortenedDescription = description.substring(0, 100) + '...';
	      } else {
	        shortenedDescription = description;
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
	                      return _this2.upvote();
	                    }
	                  },
	                  '\u2227'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  null,
	                  score
	                ),
	                _react2.default.createElement(
	                  'div',
	                  {
	                    className: _Post2.default.downvote + ' ' + (downvoted && _Post2.default.selected),
	                    onClick: function onClick() {
	                      return _this2.downvote();
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
/* 37 */
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

	var _LoginForm = __webpack_require__(38);

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
	      var _props = this.props;
	      var dispatch = _props.dispatch;
	      var errorMessage = _props.errorMessage;


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
/* 38 */
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

/***/ }
/******/ ]);