require('dotenv').config()
const express = require('express')
require('express-async-errors')
const { AuthorizationCode } = require('simple-oauth2')
const app = express()

app.use(express.json())

app.use(express.static('build'))

const client = new AuthorizationCode({
    client: {
        id: process.env.CLIENT_ID,
        secret: process.env.CLIENT_SECRET
    },
    auth: {
        tokenHost: 'https://api.intra.42.fr',
        tokenPath: '/oauth/token',
        authorizePath: '/oauth/authorize'
    }
})

const authorizationUri = client.authorizeURL({
    redirect_uri: 'https://localhost:3001/auth/callback'
})

app.get('/auth', (request, response) => {
    response.redirect(authorizationUri)
})

app.get('/auth/callback', async (request, response) => {
    const { code } = request.query
    const options = {
        code,
        redirect_uri: 'https://localhost:3001/auth/callback'
    }

    console.log(`options`, options)
    try {
        const accessToken = await client.getToken(options)

        const htmlWithEmbeddedJWT = `
        <html>
            <script>
                window.localStorage.setItem('auth', '${accessToken.token.access_token}');
                window.location.href = '/';
            </script>
        </html>`;
        response.send(htmlWithEmbeddedJWT)
    } catch (e) {
        console.error('Access Token Error', e.message)
        response.status(401).json(e.message)
    }
})

module.exports = app