'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

var _endpointManager = require('./endpoints/endpoint-manager');

var _endpointManager2 = _interopRequireDefault(_endpointManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fs = require('fs');
var http = require('http');
var net = require('net');
var EventEmitter = require('events');

/**
 * Event and class based http server
 * 
 * @extends EventEmitter
 * @fires start
 * @fires Server#ready
 * @fires Server#stop
 * @fires Server#stopped
 * @fires Server#request
 */

var Server = function (_EventEmitter) {
    _inherits(Server, _EventEmitter);

    /**
     * @param {string} configPath path to the config file
     */
    function Server(configPath) {
        _classCallCheck(this, Server);

        /**
         * Logger object
         * @type {Log} log
         */
        var _this = _possibleConstructorReturn(this, (Server.__proto__ || Object.getPrototypeOf(Server)).call(this));

        _this.log = new _log2.default(_this);
        /**
         * Is the server open
         * @type {boolean} open
         */
        _this.open = false;
        /**
         * Path to server config file
         * @type {string} configPath
         */
        _this.configPath = configPath;
        /**
         * Server config object
         * @type {object} config
         */
        _this.config = JSON.parse(fs.readFileSync('data/server.json', 'utf8'));
        /**
         * Server endpoint manager class
         * @type {EndpointManager} endpointManager
         */
        _this.endpointManager = new _endpointManager2.default(_this);

        _this.on('ready', function () {
            return _this.open = true;
        });
        _this.on('stopped', function () {
            return _this.open = false;
        });
        return _this;
    }

    _createClass(Server, [{
        key: 'start',


        /**
         * Starts the server. Listen to the ready event for when the server starts.
         * The server cannot start if it is already started or there is no server to start (Server#open & Server#http).
         */
        value: function start() {
            var _this2 = this;

            if (this.http != null || this.open) {
                return false;
            }

            /**
             * Starting event, called when Server#start() is called.
             *
             * @event Server#start
             */
            this.emit('start');
            /**
             * Express server object
             * @type {net.Server} express
             */
            this.http = http.createServer().listen(this.config.port, this.config.host, function () {
                _this2.log.info('Listening on http://' + _this2.config.host + ':' + _this2.config.port);

                /**
                 * Ready event, called when server has started and is ready to recive requests
                 *
                 * @event Server#start
                 */
                _this2.emit('ready');
            });

            this.http.on('request', function (req, res) {
                var request = new _request2.default(req, res);
                /**
                 * Request event, called when a client makes a request.
                 * 
                 * @event Server#request
                 * @type {Request}
                 */
                _this2.emit('request', request);
                request.sendResponse();
            });
            return true;
        }

        /**
         * Stop the server. Listen to stopped event for when the server stops.
         * The server cannot stop if it is not open (Server#open).
         *
         * @returns {boolean} If the server could be stopped.
         */

    }, {
        key: 'stop',
        value: function stop() {
            var _this3 = this;

            if (!this.open) {
                return false;
            }
            this.emit('stop');
            this.http.close(function () {
                _this3.log.info('Server stopped');
                _this3.emit('stopped');
            });
            return true;
        }

        /**
         * Restart the server
         */

    }, {
        key: 'restart',
        value: function restart() {
            this.stop();
            this.start();
        }
    }, {
        key: 'em',
        get: function get() {
            return this.endpointManager;
        }
    }]);

    return Server;
}(EventEmitter);

exports.default = Server;