import Server from "./server/server";
import Log from "./server/log";
import Request from "./server/request";
import Response from "./server/response";
import EndpointManager from "./server/endpoints/endpoint-manager";
import EndpointLoader from "./server/endpoints/endpoint-loader";
import Endpoint from "./server/endpoints/endpoint";

module.exports = {
    server: {
        Server: Server,
        Log: Log,
        Request: Request,
        Response: Response
    },
    endpoints: {
        EndpointManager: EndpointManager,
        EndpointLoader: EndpointLoader,
        Endpoint: Endpoint
    }
}
