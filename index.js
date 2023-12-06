const http = require('http');
const fs = require('fs')

const myServer = http.createServer((req, res) => {
    // create log file
    const log = `${Date.now()}: ${req.url} New Req Received\n`
    fs.appendFile('log.txt', log, (err, data) => {
        switch (req.url) {
            case '/': res.end('Home Page')
                break;
            case '/about': res.end('I am Abhisek Dubey')
                break
            default: res.end('404 Page Not Found')
        }
    })
});

myServer.listen(8000, () => console.log('Server started!'));