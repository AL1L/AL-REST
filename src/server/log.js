
export default class Log {
    constructor(server) {
        this.server = server;
    }

    log(msg, prefix = '<INFO>') {
        console.log(`${prefix} ${msg}`);
    }

    info(msg) {
        this.log(msg, '<INFO>')
    }
}