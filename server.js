'use strict';

let app = require('../app');
let http = require('http');
const port = '3030';
server.listen(port);
app.set('port', port);
let server = http.createServer(app);
server.listen(port);
server.on('error', function (err) {
    const bind = typeof port === 'string' ? `Pipe ${ port }` : `Port ${ port }`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});