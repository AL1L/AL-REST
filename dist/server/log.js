'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Log = function () {
    function Log(server) {
        _classCallCheck(this, Log);

        this.server = server;
    }

    _createClass(Log, [{
        key: 'log',
        value: function log(msg) {
            var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '<INFO>';

            console.log(prefix + ' ' + msg);
        }
    }, {
        key: 'info',
        value: function info(msg) {
            this.log(msg, '<INFO>');
        }
    }]);

    return Log;
}();

exports.default = Log;