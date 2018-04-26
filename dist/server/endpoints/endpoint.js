"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require("../request");

var _request2 = _interopRequireDefault(_request);

var _url = require("url");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Endpoint = function () {
    function Endpoint(endpointManager) {
        _classCallCheck(this, Endpoint);

        this.endpointManager = endpointManager;
        this.meta({
            name: 'Undefined',
            desc: null
        });
    }

    _createClass(Endpoint, [{
        key: "meta",


        /**
         * Set endpoint meta
         * @param {object} meta 
         * @param {string} meta.name
         * @param {string} meta.desc
         */
        value: function meta(_meta) {
            this._meta = _meta;
        }

        /**
         * Can the endpoint handle this request? 
         * (i dunno man, that request looks scary)
         * 
         * @param {Url} url 
         * @param {string} method 
         * @returns {boolean}
         */

    }, {
        key: "canHandle",
        value: async function canHandle(method, url) {
            throw new Error("[" + this.__proto__.constructor.name + "#canHandle] Not implemented");
        }

        /**
         * Handles requests
         * (It don't look scary to me)
         * 
         * @param {Request} request 
         */

    }, {
        key: "handle",
        value: async function handle(request) {
            throw new Error("[" + this.__proto__.constructor.name + "#handle] Not implemented");
        }
    }, {
        key: "em",
        get: function get() {
            return this.endpointManager;
        }
    }]);

    return Endpoint;
}();

exports.default = Endpoint;