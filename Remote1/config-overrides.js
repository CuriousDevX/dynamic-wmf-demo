var path = require('path')
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin
const { dependencies } = require('./package.json')
const { override, babelInclude } = require('customize-cra')

module.exports = function (config, env) {
    // Ignores sourcemap warnings caused by CRA
    // More info : https://github.com/facebook/create-react-app/pull/11752
    config.ignoreWarnings = [/Failed to parse source map/]

    config.plugins.push(
        new ModuleFederationPlugin(
            (module.exports = {
                name: 'remote1',
                exposes: {
                    './Remote1': './src/Remote1'
                },
                filename: 'remoteEntry.js',
                shared: {
                    ...dependencies,
                    react: {
                        eager: true,
                        singleton: true,
                        requiredVersion: dependencies['react']
                    },
                    'react-dom': {
                        eager: true,
                        singleton: true,
                        requiredVersion: dependencies['react-dom']
                    },
                    'react-router-dom': {
                        eager: true,
                        singleton: true,
                        requiredVersion: dependencies['react-router-dom']
                    }
                }
            })
        )
    )

    // Client publicPath should be auto to handle sub paths
    config.output.publicPath = 'auto'

    return Object.assign(config, override(babelInclude([path.resolve('src')]))(config, env))
}
