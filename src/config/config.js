const dbSettings = {
    db: 'second-microservice',
    user: 'appuser',
    pw: 'appuser',
    hostname: '127.0.0.1',
    port: '27017'    
}

const serverSettings = {
    port: 8080
}

module.exports = Object.assign({}, { dbSettings, serverSettings })