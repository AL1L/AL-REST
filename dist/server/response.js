'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('util');

var _constants = require('constants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var http = require('http');
var _ = require('lodash');

var Response = function () {
    function Response(serverResponse) {
        _classCallCheck(this, Response);

        this._code = 200;
        this._message = 'Ok';
        this._debug = null;
        this._paths = {};
        this._namespace = '';
        this._serverResponse = serverResponse;
        this.getHeaders = serverResponse.getHeaders;
        this.setHeader = serverResponse.setHeader;
        this.getHeader = serverResponse.getHeader;
        this.removeHeader = serverResponse.removeHeader;
        this.hasHeader = serverResponse.hasHeader;
        this._open = true;

        this.setHeader('content-type', 'application/json');
    }

    _createClass(Response, [{
        key: 'setCode',
        value: function setCode() {
            var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;

            if (!(0, _util.isNumber)(code)) {
                return;
            }
            this._code = parseInt(code);
        }
    }, {
        key: 'setMessage',
        value: function setMessage() {
            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Ok';

            this._message = msg.toString();
        }
    }, {
        key: 'setStatus',
        value: function setStatus(code, msg) {
            this.setCode(code);
            this.setMessage(msg);
        }

        /**
         * 
         * @param {string} [namespace='data']
         */

    }, {
        key: 'setNamespace',
        value: function setNamespace() {
            var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'data';

            namespace = namespace.toString().toLowerCase();
            if (namespace === 'code' || namespace === 'message' || namespace === 'debug') {
                return;
            }
            this._namespace = namespace;
        }
    }, {
        key: 'bindNamespace',
        value: function bindNamespace(path) {
            path = path.toString().toLowerCase();
            namespace = namespace.toString().toLowerCase();
            if (namespace.trim() === '' || path.trim() == '') {
                return '' + namespace + path;
            } else {
                return namespace + '.' + path;
            }
        }
    }, {
        key: 'debug',
        value: function debug(_debug) {
            this._debug = _debug;
        }
    }, {
        key: 'set',
        value: function set(path, value) {
            this._paths[this.bindNamespace(path)] = value;
        }
    }, {
        key: 'get',
        value: function get(path) {
            return this._paths[this.bindNamespace(path)];
        }
    }, {
        key: 'contains',
        value: function contains(path) {
            return this._paths.hasOwnProperty(this.bindNamespace(path));
        }
    }, {
        key: 'push',
        value: function push(path, value) {
            if (!this.contains(path)) {
                this.set(path, []);
            } else if (!(0, _util.isArray)(this.get(path))) {
                return false;
            }
            this.get(path).push(value);
            return true;
        }

        /**
         * Build response
         * @param {boolean} asString 
         * @returns {object} An object
         */

    }, {
        key: 'build',
        value: function build() {
            var asString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var obj = {
                code: this._code,
                message: this._message
            };

            var paths = Object.keys(this._paths);
            for (var i = 0; i < paths.length; i++) {
                var path = paths[i].toString().toLowerCase();
                var value = this._paths[path];

                if (value === undefined) {
                    continue;
                }
                if (path.startsWith('code.') || path === 'code' || path.startsWith('message.') || path === 'message' || path.startsWith('debug.') || path === 'debug') {
                    continue;
                }
                _.set(obj, path, value);
            }

            if (this._debug !== null) {
                obj.debug = this._debug;
            }

            if (asString) {
                return JSON.stringify(obj);
            }
            return obj;
        }
    }, {
        key: '_close',
        value: function _close() {
            this._open = false;
        }
    }, {
        key: 'open',
        get: function get() {
            return this._open;
        }
    }]);

    return Response;
}();

exports.default = Response;