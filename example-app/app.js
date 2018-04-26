import Server from "../server/server";

const server = new Server('data/server.js');

server.em.loader.loadDirectory('example-app/endpoints')

server.start();