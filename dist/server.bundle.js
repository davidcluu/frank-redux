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


	var _http = __webpack_require__(1);

	var _http2 = _interopRequireDefault(_http);

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _express = __webpack_require__(3);

	var _express2 = _interopRequireDefault(_express);

	var _compression = __webpack_require__(4);

	var _compression2 = _interopRequireDefault(_compression);

	var _serveStatic = __webpack_require__(5);

	var _serveStatic2 = _interopRequireDefault(_serveStatic);

	var _bodyParser = __webpack_require__(6);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(8);

	var _reactRouter = __webpack_require__(9);

	var _reactHelmet = __webpack_require__(10);

	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

	var _reactRedux = __webpack_require__(11);

	var _store = __webpack_require__(12);

	var _fetchData = __webpack_require__(19);

	var _config = __webpack_require__(21);

	var _config2 = _interopRequireDefault(_config);

	var _routes = __webpack_require__(22);

	var _routes2 = _interopRequireDefault(_routes);

	var _user = __webpack_require__(30);

	var _user2 = _interopRequireDefault(_user);

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
	app.use(_bodyParser2.default.json({ limit: '20mb' }));
	app.use(_bodyParser2.default.urlencoded({ limit: '20mb', extended: false }));

	/* Serve Static Public Content */
	app.use((0, _serveStatic2.default)(_path2.default.join(__dirname, '../dist')));

	/**
	 * API Route Handlers
	 */

	app.use('/api/user', _user2.default);

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
	      res.status(500).send(error.message);
	    } else if (redirectLocation) {
	      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
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
	          }).catch(function (error) {
	            return next(error);
	          })
	        };
	      }();

	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    } else {
	      res.status(404).send('Not Found');
	    }
	  });
	});

	/**
	 * Create Server and Listen
	 */

	app.listen(_config2.default.port, function (error) {
	  if (!error) {
	    console.log('frank-redux server listening on port ' + app.get('port'));
	  }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("serve-static");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("react-helmet");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.configureStore = configureStore;

	var _redux = __webpack_require__(13);

	var _reduxThunk = __webpack_require__(14);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reactRouterRedux = __webpack_require__(15);

	var _reactRouter = __webpack_require__(9);

	var _reducers = __webpack_require__(16);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function configureStore() {
	  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  return (0, _redux.createStore)(_reducers2.default, (0, _redux.applyMiddleware)(_reduxThunk2.default, (0, _reactRouterRedux.routerMiddleware)(_reactRouter.browserHistory)));
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("react-router-redux");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(13);

	var _AuthReducer = __webpack_require__(17);

	var _AuthReducer2 = _interopRequireDefault(_AuthReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _redux.combineReducers)({
	  auth: _AuthReducer2.default
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(13);

	var _AuthActions = __webpack_require__(18);

	// TODO: Check if JWT token is expired
	var initialState = {
	  isFetching: false,
	  isAuthenticated: typeof localStorage === 'undefined' ? false : localStorage.getItem('id_token') ? true : false
	};

	var auth = function auth() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];

	  switch (action.type) {
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
	exports.LOGOUT_SUCCESS = exports.LOGOUT_REQUEST = exports.LOGIN_FAILURE = exports.LOGIN_SUCCESS = exports.LOGIN_REQUEST = undefined;
	exports.loginUser = loginUser;
	exports.logoutUser = logoutUser;

	var _reactRouterRedux = __webpack_require__(15);

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
	        return Promise.reject(user);
	      } else {
	        if (typeof localStorage !== 'undefined') {
	          localStorage.setItem('id_token', user.id_token);
	        }
	        dispatch(receiveLogin(user));
	        dispatch((0, _reactRouterRedux.push)('/'));
	      }
	    }).catch(function (err) {});
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
	exports.fetchComponentData = fetchComponentData;

	var _promiseUtils = __webpack_require__(20);

	function fetchComponentData(store, components, params) {
	  var needs = components.reduce(function (prev, current) {
	    return (current.need || []).concat((current.WrappedComponent && current.WrappedComponent.need !== current.need ? current.WrappedComponent.need : []) || []).concat(prev);
	  }, []);

	  return (0, _promiseUtils.sequence)(needs, function (need) {
	    return store.dispatch(need(params, store.getState()));
	  });
	}

/***/ },
/* 20 */
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

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(9);

	var _AppContainer = __webpack_require__(23);

	var _AppContainer2 = _interopRequireDefault(_AppContainer);

	var _App = __webpack_require__(24);

	var _App2 = _interopRequireDefault(_App);

	var _Index = __webpack_require__(27);

	var _Index2 = _interopRequireDefault(_Index);

	var _Login = __webpack_require__(28);

	var _Login2 = _interopRequireDefault(_Login);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Import required modules
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(11);

	var _reactHelmet = __webpack_require__(10);

	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//import styles from './App.scss';

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
	          meta: [{ charset: 'utf-8' }, { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' }, { name: 'viewport', content: 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0' }, { name: 'keywords', content: '' }, { name: 'author', content: '' }, { name: 'robots', content: 'index, follow' }, { name: 'revisit-after', content: '1 days' }],
	          link: [{ rel: 'author', href: 'humans.txt' }]
	        }),
	        this.props.children
	      );
	    }
	  }]);

	  return AppContainer;
	}(_react.Component);

	exports.default = AppContainer;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(11);

	var _reactRouterRedux = __webpack_require__(15);

	var _reactHelmet = __webpack_require__(10);

	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

	var _AuthActions = __webpack_require__(18);

	var _Header = __webpack_require__(25);

	var _Header2 = _interopRequireDefault(_Header);

	var _Footer = __webpack_require__(26);

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
	      var _props = this.props;
	      var dispatch = _props.dispatch;
	      var isAuthenticated = _props.isAuthenticated;


	      if (!isAuthenticated) {
	        dispatch((0, _reactRouterRedux.push)('/login'));
	      }

	      this.setState({ isMounted: true });
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
	  dispatch: _react.PropTypes.func.isRequired,
	  isAuthenticated: _react.PropTypes.bool.isRequired,
	  errorMessage: _react.PropTypes.string
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Header = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(7);

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

	exports.default = Header;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Footer = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(7);

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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Index = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//import styles from './Index.scss';

	var Index = exports.Index = function (_Component) {
	  _inherits(Index, _Component);

	  function Index(props) {
	    _classCallCheck(this, Index);

	    var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

	    _this.state = { isMounted: false };
	    return _this;
	  }

	  _createClass(Index, [{
	    key: 'handleClick',
	    value: function handleClick() {
	      $('.hello').velocity({
	        'color': '#ff0000'
	      });
	    }
	  }, {
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
	        _react2.default.createElement(
	          'div',
	          { className: 'hello', onClick: this.handleClick },
	          'I am the index'
	        )
	      );
	    }
	  }]);

	  return Index;
	}(_react.Component);

	exports.default = Index;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Login = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(11);

	var _AuthActions = __webpack_require__(18);

	var _LoginForm = __webpack_require__(29);

	var _LoginForm2 = _interopRequireDefault(_LoginForm);

	var _Login = {
	  "login": "_2ajl6W_ZtgfbshCyLYct-3",
	  "container": "_2m2-zSu0xMmDdXkZY_Njck"
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
	        )
	      );
	    }
	  }]);

	  return Login;
	}(_react.Component);

	Login.propTypes = {
	  dispatch: _react.PropTypes.func.isRequired,
	  isAuthenticated: _react.PropTypes.bool.isRequired,
	  errorMessage: _react.PropTypes.string
	};

	function mapStateToProps(state) {
	  var auth = state.auth;
	  var isAuthenticated = auth.isAuthenticated;
	  var errorMessage = auth.errorMessage;


	  return {
	    isAuthenticated: isAuthenticated,
	    errorMessage: errorMessage
	  };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Login);

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LoginForm = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(11);

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
	          { onClick: function onClick(event) {
	              return _this2.handleClick(event);
	            } },
	          'LOGIN'
	        )
	      );
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick(event) {
	      var username = this.refs.username;
	      var password = this.refs.password;
	      var creds = {
	        username: username.value.trim(),
	        password: password.value.trim()
	      };
	      this.props.onLoginClick(creds);
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(3);

	var _user = __webpack_require__(31);

	var UserController = _interopRequireWildcard(_user);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var router = new _express.Router();

	router.route('/login').post(UserController.login);

	exports.default = router;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.login = login;

	var _lodash = __webpack_require__(32);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _jsonwebtoken = __webpack_require__(33);

	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// TODO: Replace with database, add hashing + salting
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
	  return _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), 'testSecret', { expiresIn: 60 * 60 * 5 });
	}

	function login(req, res) {
	  var userScheme = getUserScheme(req);

	  if (!userScheme.username || !req.body.password) {
	    return res.status(400).send({
	      error: "The Username and Password fields must be nonempty"
	    });
	  }

	  var user = _lodash2.default.find(users, userScheme.userSearch);

	  if (!user || user.password !== req.body.password) {
	    return res.status(401).send({
	      error: "The Username or Password don't match"
	    });
	  }

	  res.status(201).send({
	    id_token: createToken(user)
	  });
	}

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ }
/******/ ]);