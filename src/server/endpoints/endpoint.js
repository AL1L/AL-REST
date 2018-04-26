import Request from "../request";
import { Url } from "url";

export default class Endpoint {

    constructor(endpointManager) {
        this.endpointManager = endpointManager;
        this.meta({
            name: 'Undefined',
            desc: null
        });
    }

    get em() {
        return this.endpointManager;
    }

    /**
     * Set endpoint meta
     * @param {object} meta 
     * @param {string} meta.name
     * @param {string} meta.desc
     */
    meta(meta) {
        this._meta = meta;
    }

    /**
     * Can the endpoint handle this request? 
     * (i dunno man, that request looks scary)
     * 
     * @param {Url} url 
     * @returns {boolean}
     */
    canHandle(url) {
        throw new Error(`[${this.__proto__.constructor.name}#canHandle] Not implemented`);
    }

    /**
     * Handles requests
     * (It don't look scary to me)
     * 
     * @param {Request} request 
     */
    handle(request) {
        throw new Error(`[${this.__proto__.constructor.name}#handle] Not implemented`);
    }
}