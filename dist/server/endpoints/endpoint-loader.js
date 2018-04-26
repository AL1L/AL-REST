"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _endpoint = require("./endpoint");

var _endpoint2 = _interopRequireDefault(_endpoint);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _endpointManager = require("./endpoint-manager");

var _endpointManager2 = _interopRequireDefault(_endpointManager);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EndpointLoader = function () {
    function EndpointLoader(endpointManager) {
        _classCallCheck(this, EndpointLoader);

        /**
         * @type {EndpointManager} endpointManager
         */
        this.endpointManager = endpointManager;
    }

    _createClass(EndpointLoader, [{
        key: "loadDirectory",
        value: function loadDirectory(dirPath) {
            var _this = this;

            _fs2.default.readdir(dirPath, function (error, files) {
                if (files == null) {
                    console.error(error);
                    return;
                }
                files.forEach(function (file) {
                    var module = require(_path2.default.join('../../../', _path2.default.join(dirPath, file))).default;

                    if (_this.validateClass(module)) {
                        _this.endpointManager.registerEndpoint(module);
                    }
                });
            });
        }
    }, {
        key: "validateClass",
        value: function validateClass(cls) {
            return cls.prototype instanceof _endpoint2.default;
        }
    }]);

    return EndpointLoader;
}();

exports.default = EndpointLoader;