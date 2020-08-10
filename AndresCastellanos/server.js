const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    req.on('error', err => {
        console.error(err);
        res.statusCode = 400;
        res.end('400: Bad Request');
        return;
    });

    res.on('error', err => {
        console.error(err);
    });

    fs.readFile('./public' + req.url, (err, data) => {
        if (err) {
            if (req.url === '/' && req.method === 'GET') {
                res.end('Welcome Home');
            } else if (req.url === '/tcs' && req.method === 'GET') {
                res.end('HI RCSer');
            } else {
                res.statusCode = 404;
                res.end('404: File Not Found');
            }
        } else {
            res.setHeader('Content-Type', 'application/octet-stream');
            res.end(data);
        }
    });

});

server.listen(8080, () => {
    console.log('Hello world');
});