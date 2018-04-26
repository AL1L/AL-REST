"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require("../request");

var _request2 = _interopRequireDefault(_request);

var _url = require("url");

var _endpoint = require("./endpoint");

var _endpoint2 = _interopRequireDefault(_endpoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultEndpoint = function (_Endpoint) {
    _inherits(DefaultEndpoint, _Endpoint);

    function DefaultEndpoint(endpointManager) {
        _classCallCheck(this, DefaultEndpoint);

        var _this = _possibleConstructorReturn(this, (DefaultEndpoint.__proto__ || Object.getPrototypeOf(DefaultEndpoint)).call(this, endpointManager));

        _this.meta({
            name: 'Default Endpoint',
            desc: "Handles any requests they aren't handled by any other endpoint."
        });
        return _this;
    }

    /**
     * Can the endpoint handle this request? 
     * (i dunno man, that request looks scary)
     * 
     * @param {string} method 
     * @param {Url} url 
     * @returns {boolean}
     */


    _createClass(DefaultEndpoint, [{
        key: "canHandle",
        value: async function canHandle(method, url) {
            return true;
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
            request.res.setStatus(404, 'Not found');
        }
    }]);

    return DefaultEndpoint;
}(_endpoint2.default);

exports.default = DefaultEndpoint;