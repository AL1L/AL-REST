import Log from './log';
import Request from './request';
import EndpointManager from "./endpoints/endpoint-manager";

const fs = require('fs');
const http = require('http');
const https = require('https');
const net = require('net');
const EventEmitter = require('events');

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
export default class Server extends EventEmitter {
    /**
     * @param {string} configPath path to the config file
     */
    constructor(configPath) {
        super();
        /**
         * Logger object
         * @type {Log} log
         */
        this.log = new Log(this);
        /**
         * Is the server open
         * @type {boolean} open
         */
        this.open = false;
        /**
         * Path to server config file
         * @type {string} configPath
         */
        this.configPath = configPath;
        /**
         * Server config object
         * @type {object} config
         */
        this.config = JSON.parse(fs.readFileSync('data/server.json', 'utf8'));
        /**
         * Server endpoint manager class
         * @type {EndpointManager} endpointManager
         */
        this.endpointManager = new EndpointManager(this);

        this.on('ready', () => this.open = true);
        this.on('stopped', () => this.open = false);
    }

    get em() {
        return this.endpointManager;
    }

    /**
     * Starts the server. Listen to the ready event for when the server starts.
     * The server cannot start if it is already started or there is no server to start (Server#open & Server#http).
     */
    start() {
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
        this.http = http.createServer().listen(this.config.port, this.config.host, () => {
            this.log.info(`Listening on http://${this.config.host}:${this.config.port}`);

            /**
             * Ready event, called when server has started and is ready to recive requests
             *
             * @event Server#start
             */
            this.emit('ready');
        });

        this.http.on('request', (req, res) => {
            const request = new Request(this, req, res);
        });
        /**
         * Express server object
         * @type {net.Server} express
         */
        this.https = https.createServer().listen(this.config.ssl_port, this.config.ssl_host, () => {
            this.log.info(`Listening on http://${this.config.ssl_host}:${this.config.ssl_port}`);

            /**
             * SSL Ready event, called when ssl server has started and is ready to recive requests
             *
             * @event Server#sslstart
             */
            this.emit('sslready');
        });

        this.https.on('request', (req, res) => {
            const request = new Request(this, req, res);
        });
        return true;
    }

    /**
     * Stop the server. Listen to stopped event for when the server stops.
     * The server cannot stop if it is not open (Server#open).
     *
     * @returns {boolean} If the server could be stopped.
     */
    stop() {
        if (!this.open) {
            return false;
        }
        this.emit('stop');
        this.http.close(() => {
            this.log.info(`Server stopped`);
            this.emit('stopped');
        });
        return true;
    }

    /**
     * Restart the server
     */
    restart() {
        this.stop();
        this.start();
    }
}