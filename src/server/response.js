import { isArray, isNumber } from 'util';

const http = require('http');
const _ = require('lodash');

export default class Response {

    constructor(serverResponse) {
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

    setCode(code = 200) {
        if(!isNumber(code)) {
            return;
        }
        this._code = parseInt(code);
    }

    setMessage(msg = 'Ok') {
        this._message = msg.toString();
    }

    setStatus(code, msg) {
        this.setCode(code);
        this.setMessage(msg);
    }

    /**
     * 
     * @param {string} [namespace='data']
     */
    setNamespace(namespace = 'data') {
        namespace = namespace.toString().toLowerCase();
        if (namespace === 'code' || namespace === 'message' || namespace === 'debug') {
            return;
        }
        this._namespace = namespace;
    }

    bindNamespace(path) {
        path = path.toString().toLowerCase();
        namespace = this._namespace.toString().toLowerCase();
        if (namespace.trim() === '' || path.trim() == '') {
            return `${namespace}${path}`;
        } else {
            return `${namespace}.${path}`;
        }
    }

    debug(debug) {
        this._debug = debug;
    }

    set(path, value) {
        this._paths[this.bindNamespace(path)] = value;
    }

    get(path) {
        return this._paths[this.bindNamespace(path)];
    }

    contains(path) {
        return this._paths.hasOwnProperty(this.bindNamespace(path));
    }

    push(path, value) {
        if (!this.contains(path)) {
            this.set(path, []);
        } else if (!isArray(this.get(path))) {
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
    build(asString = false) {
        const obj = {
            code: this._code,
            message: this._message
        };

        const paths = Object.keys(this._paths);
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i].toString().toLowerCase();
            const value = this._paths[path];

            if (value === undefined) {
                continue;
            }
            if (path.startsWith('code.') || path === 'code' ||
                path.startsWith('message.') || path === 'message' ||
                path.startsWith('debug.') || path === 'debug') {
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

    get open() {
        return this._open;
    }

    _close() {
        this._open = false;
    }
}