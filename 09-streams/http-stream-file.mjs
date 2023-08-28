import http from 'http';
import fs from 'fs';

const PORT = 5000;

const server = http.createServer((req, res) => {
    const filePath = './files/index.html';
    // With Streams
    if (req.url === '/' && req.method === 'GET') {
        const readStream = fs.createReadStream(filePath);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html')
        readStream.pipe(res) // перенаправляем один поток (readStream) в другой поток res
    }
    
    // Without Streams
    if (req.url === '/no-stream' && req.method === 'GET') {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(err)
                res.statusCode = 500
                res.setHeader('Content-Type', 'text/plain')
                res.end('Server error while loading HTML')
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html')
                res.end(data)
            }
        })
    }
})

server.listen(PORT, () => {
    console.log(`Server was launched on port ${PORT}`)
})