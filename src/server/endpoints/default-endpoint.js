import Request from "../request";
import { Url } from "url";
import Endpoint from "./endpoint";

export default class DefaultEndpoint extends Endpoint {

    constructor(endpointManager) {
        super(endpointManager);
        this.meta({
            name: 'Default Endpoint',
            desc: "Handles any requests they aren't handled by any other endpoint."
        });
    }

    /**
     * Can the endpoint handle this request? 
     * (i dunno man, that request looks scary)
     * 
     * @param {Url} url 
     * @returns {boolean}
     */
    canHandle(url) {
        return true;
    }

    /**
     * Handles requests
     * (It don't look scary to me)
     * 
     * @param {Request} request 
     */
    handle(request) {
        request.res.setStatus(404, 'Not found');
    }
}