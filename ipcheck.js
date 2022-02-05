const webclient = require('request')

exports.getGIP = () => new Promise((resolve, reject) => {
    webclient.get({
        url: 'https://ifconfig.io/ip'
    }, (err, response, body) => {
        if (err == null) {
            resolve(body)
        } else {
            reject(err)
        }
    })
})