'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _response = require('./response');

var _response2 = _interopRequireDefault(_response);

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

var _formidable = require('formidable');

var _formidable2 = _interopRequireDefault(_formidable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var http = require('http');
var url = require('url');

var Request = function () {

  /**
   * 
   * @param {http.IncomingMessage} incomingMessage 
   * @param {http.ServerResponse} serverResponse 
   */
  function Request(server, incomingMessage, serverResponse) {
    var _this = this;

    _classCallCheck(this, Request);

    /**
     * Server object
     * @type {Server} server
     */
    this.server = server;
    /**
     * Incoming Message object from http
     * @type {http.IncomingMessage} incomingMessage
     */
    this.incomingMessage = incomingMessage;
    /**
     * Server Response object from http
     * @type {http.ServerResponse} serverResponse
     */
    this.serverResponse = serverResponse;
    /**
     * Request headers
     * @type {http.IncomingHttpHeaders} headers
     */
    this.headers = incomingMessage.headers;
    /**
     * Request http version
     * @type {string} httpVersion
     */
    this.httpVersion = incomingMessage.httpVersion;
    /**
     * Request method
     * @type {string} method
     */
    this.method = incomingMessage.method.toUpperCase();
    /**
     * Raw request headers
     * @type {string[]} rawHeaders
     */
    this.rawHeaders = incomingMessage.rawHeaders;
    /**
     * Request socket
     * @type {Socket} socket
     */
    this.socket = incomingMessage.socket;
    /**
     * Request url
     * @type {url.Url} url
     */
    this.url = url.parse(incomingMessage.url);
    /**
     * Request query arguments
     * @type {object} query
     */
    this.query = url.parse(incomingMessage.url, true).query;
    /**
     * @type {Response} _response
     */
    this._response = new _response2.default(serverResponse);
    this._open = true;
    this.serverResponse.on('close', function () {
      return _this.close();
    });
    this.serverResponse.on('finish', function () {
      return _this.close();
    });
    this.incomingMessage.on('aborted', function () {
      return _this.close();
    });
    this.incomingMessage.on('close', function () {
      return _this.close();
    });

    var form = new _formidable2.default.IncomingForm();
    form.parse(this.incomingMessage, function (err, fields, files) {
      _this.form = form;
      _this.fields = fields;
      _this.files = files;
      /**
       * Request event, called when a client makes a request.
       * 
       * @event Server#request
       * @type {Request}
       */
      _this.server.emit('request', request);
      _this.sendResponse();
    });
  }

  /**
   * Incoming Message object from http. Alias of Request#incomingMessage
   * @type {http.IncomingMessage} req
   */


  _createClass(Request, [{
    key: 'sendResponse',


    /**
     * Close and send response to client.
     */
    value: function sendResponse() {
      this.close();
      var body = this._response.build();
      this.serverResponse.writeHead(body.code, http.STATUS_CODES[body.code]);
      this.serverResponse.write(JSON.stringify(body), 'utf8');
      this.serverResponse.end();
    }

    /**
     * Closes the request to modifications.
     */

  }, {
    key: 'close',
    value: function close() {
      if (this._open) this._open = false;
      if (this._response.open) this._response._close();
    }
  }, {
    key: 'req',
    get: function get() {
      return this.incomingMessage;
    }

    /**
     * Response class
     * @type {Response} response
     * @returns {Response} response
     */

  }, {
    key: 'response',
    get: function get() {
      return this._response;
    }

    /**
     * Response class
     * @type {Response} response
     * @returns {Response} response
     */
    ,
    set: function set(res) {
      if (this._open) this._response = res;
    }

    /**
     * If the request and response is still open and avalible to modify.
     * @type {boolean} open
     * @readonly
     */

  }, {
    key: 'res',
    get: function get() {
      return this.response;
    }
  }, {
    key: 'open',
    get: function get() {
      return this._response.open && this._open;
    }
  }]);

  return Request;
}();

exports.default = Request;