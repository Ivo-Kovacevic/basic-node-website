const http = require('http');
const url = require('url');
const fs = require('fs');

const port = 8080;

const server = http.createServer((req, res) => {

    const q = url.parse(req.url, true);
    let filename;
    
    if(q.pathname === '/') {
        filename = 'index.html';
    } else {
        filename = q.pathname.slice(1) + '.html';
    }
    
    fs.readFile(filename, (err, data) => {
        if (err) {
            fs.readFile('404.html', (error404, data404) => {
                if (error404) {
                    res.writeHead(500, {'Content-Type': 'text/html'});
                    res.end('500 Internal Server Error')
                } else {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.write(data404);
                    res.end();
                }
            });
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data);
            res.end();
        }
    });
});

server.listen(port, (error) => {
    if (error) {
        console.log('Error', error);
    } else {
        console.log(`Server is listening on port ${port}`)
    }
})