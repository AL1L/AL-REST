"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _endpointLoader = require("./endpoint-loader");

var _endpointLoader2 = _interopRequireDefault(_endpointLoader);

var _endpoint = require("./endpoint");

var _endpoint2 = _interopRequireDefault(_endpoint);

var _request = require("../request");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EndpointManager = function () {
    function EndpointManager(server) {
        _classCallCheck(this, EndpointManager);

        this.server = server;
        /**
         * @type {Endpoint[]}
         */
        this._endpoints = [];
        this._loader = new _endpointLoader2.default(this);

        // server.on('request', async (r) => await this.callEndpoints(r));
    }

    _createClass(EndpointManager, [{
        key: "callEndpoints",


        /**
         * 
         * @param {Request} request 
         */
        value: async function callEndpoints(request) {
            for (var i = 0; i < this._endpoints.length; i++) {
                var endpoint = this._endpoints[i];
                var can = await endpoint.canHandle(request.method, request.url);
                if (can && request.open) {
                    try {
                        await endpoint.handle(request);
                    } catch (e) {
                        request.res.setStatus(500, e);
                        break;
                    }
                }
            }
        }
    }, {
        key: "registerEndpoint",
        value: function registerEndpoint(cls) {
            this._endpoints.push(new cls(this.server));
        }
    }, {
        key: "loader",
        get: function get() {
            return this._loader;
        }
    }]);

    return EndpointManager;
}();

exports.default = EndpointManager;