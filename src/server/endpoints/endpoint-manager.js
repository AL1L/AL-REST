import EndpointLoader from "./endpoint-loader";
import Endpoint from "./endpoint";
import Request from "../request";

export default class EndpointManager {
    constructor(server) {
        this.server = server;
        /**
         * @type {Endpoint[]}
         */
        this._endpoints = [];
        this._loader = new EndpointLoader(this);

        // server.on('request', async (r) => await this.callEndpoints(r));
    }

    get loader() {
        return this._loader;
    }

    /**
     * 
     * @param {Request} request 
     */
    async callEndpoints(request) {
        for (let i = 0; i < this._endpoints.length; i++) {
            const endpoint = this._endpoints[i];
            const can = await endpoint.canHandle(request.method, request.url);
            if(can && request.open) {
                try {
                    await endpoint.handle(request);
                } catch(e) {
                    request.res.setStatus(500, e);
                    console.error(`Error while handleing endpoint ${endpoint._meta.name}`);
                    console.error(e);
                    break;
                }
            }
            
        }
    }

    registerEndpoint(cls) {
        this._endpoints.push(new cls(this.server));
    }
}