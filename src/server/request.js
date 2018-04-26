import Response from './response';

const http = require('http');
const url = require('url');

export default class Request {

    /**
     * 
     * @param {http.IncomingMessage} incomingMessage 
     * @param {http.ServerResponse} serverResponse 
     */
    constructor(incomingMessage, serverResponse) {
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
        this.method = incomingMessage.method;
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
        this._response = new Response(serverResponse);
        this._open = true;
        this.serverResponse.on('close', () => this.close());
        this.serverResponse.on('finish', () => this.close());
        this.incomingMessage.on('aborted', () => this.close());
        this.incomingMessage.on('close', () => this.close());
    }

    /**
     * Incoming Message object from http. Alias of Request#incomingMessage
     * @type {http.IncomingMessage} req
     */
    get req() {
        return this.incomingMessage;
    }

    /**
     * Response class
     * @type {Response} response
     * @returns {Response} response
     */
    get response() {
        return this._response;
    }

    /**
     * Response class
     * @type {Response} response
     * @returns {Response} response
     */
    get res() {
        return this.response;
    }

    set response(res) {
        if(this._open)
            this._response = res;
    }

    /**
     * If the request and response is still open and avalible to modify.
     * @type {boolean} open
     * @readonly
     */
    get open() {
        return this._response.open && this._open;
    }

    /**
     * Close and send response to client.
     */
    sendResponse() {
        this.close();
        const body = this._response.build();
        this.serverResponse.writeHead(body.code, http.STATUS_CODES[body.code]);
        this.serverResponse.write(JSON.stringify(body), 'utf8')
        this.serverResponse.end();
    }

    /**
     * Closes the request to modifications.
     */
    close() {
        if(this._open)
            this._open = false;
        if(this._response.open)
            this._response._close();
    }
}