require('dotenv').config()
const app = require('./app')
const https = require('https')
const fs = require('fs')
const PORT = process.env.PORT

const server = https.createServer({
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem'),
    passphrase: '42madrid'
}, app)

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})