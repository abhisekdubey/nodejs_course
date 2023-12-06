const http = require('http');
const fs = require('fs')
const url = require('url');

const myServer = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return res.end()
    // create log file
    const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`
    // url parse
    const myUrl = url.parse(req.url, true)
    console.log(myUrl);
    fs.appendFile('log.txt', log, (err, data) => {
        switch (myUrl.pathname) {
            case '/':
                if (req.method === "GET") res.end('Home Page')
                break;
            case '/about':
                const username = myUrl.query.myname;
                res.end(`Hi ${username}`)
                break
            case '/signup':
                if (req.method === 'GET') res.end('This is a sign up form')
                else if (req.method === 'POST') {
                    // DB Query
                    res.end('Success')
                }
            default: res.end('404 Page Not Found')
        }
    })
});

myServer.listen(8000, () => console.log('Server started!'));