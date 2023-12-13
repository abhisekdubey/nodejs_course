const fs = require('fs');

function logReqRes(filename) {
    return (req, res, next) => {
        fs.appendFile(filename, `Date - ${Date.now()} : IP - ${req.ip} : Method - ${req.method} : Path - ${req.path}\n`, (err, data) => {
            next()
        })
    }
}

module.exports = {
    logReqRes
}