import Server from "./src/server/server";
import Log from "./src/server/log";
import Request from "./src/server/request";
import Response from "./src/server/response";
import EndpointManager from "./src/server/endpoints/endpoint-manager";
import EndpointLoader from "./src/server/endpoints/endpoint-loader";
import Endpoint from "./src/server/endpoints/endpoint";

module.exports = {
    server: {
        Server = Server,
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
