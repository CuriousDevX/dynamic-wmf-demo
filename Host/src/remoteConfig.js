const config = {
    development: {
        host: 'http://localhost:3000',
        isAuthGatewayEnable: true,
        cookieDomain: '',
        cookieName: 'auth-cookie',
        proxy: 'http://localhost:8000'
    },
    production: {
        host: 'http://localhost:3000',
        isAuthGatewayEnable: true,
        cookieDomain: '',
        cookieName: 'auth-cookie',
        proxy: 'http://localhost:8000'
    }
}

module.exports = config
