import Endpoint from "../../src/server/endpoints/endpoint";
import { Url } from "url";
import Request from "../../src/server/request";

export default class HelloEndpoint extends Endpoint {

    constructor(em) {
        super(em);
        this.meta({
            name: 'Hello',
            desc: 'Hello, World!'
        });
    }

    /**
     * 
     * @param {string} method 
     * @param {Url} url 
     */
    canHandle(method, url) {
        // Will return only at root
        return url.path === '/';
        // Replace the line above with the one below
        // to make the endpoint work for any path
        /* return true; */
         
    }

    /**
     * 
     * @param {Request} request 
     */
    handle(request) {
        request.res.setMessage('Hello, world!');
    }
}