import Endpoint from "./endpoint";
import fs from 'fs';
import EndpointManager from "./endpoint-manager";
import path from "path";


export default class EndpointLoader {
    constructor(endpointManager) {
        /**
         * @type {EndpointManager} endpointManager
         */
        this.endpointManager = endpointManager;
    }

    loadDirectory(dirPath) {
		fs.readdir(dirPath, (error, files) => {
            if(files == null) {
                console.error(error);
                return;
            }
			files.forEach((file) => {
				const module = require(path.join('../../../', path.join(dirPath, file))).default;

				if (this.validateClass(module)) {
					this.endpointManager.registerEndpoint(module);
				}
			});
		});
    }

    validateClass(cls) {
        return cls.prototype instanceof Endpoint;
    }
}