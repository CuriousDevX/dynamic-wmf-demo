const authGatewayConfig = {
    development: {
        isAuthGatewayEnable: true,
        cookieDomain: '', // Localhost it should be empty
        cookieName: 'auth-cookie'
    },
    production: {
        isAuthGatewayEnable: true,
        cookieDomain: '',
        cookieName: 'auth-cookie'
    }
}

module.exports = authGatewayConfig
