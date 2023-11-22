var path = require('path')
const { dependencies } = require('./package.json')
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin

const { override, babelInclude } = require('customize-cra')

const ignoreWarnings = (value) => (config) => {
    config.ignoreWarnings = value
    return config
}

module.exports = function (config, env) {
    // Ignores sourcemap warnings caused by CRA
    // More info : https://github.com/facebook/create-react-app/pull/11752
    config.ignoreWarnings = [/Failed to parse source map/]

    // Add data-host="true" attribute to all Host styles, so we can understand which styles we should remove while unloading a remote component.
    config.module.rules[1].oneOf.forEach((rule) => {
        // Check if 'use' property exists and if any of the loaders in the 'use' array includes 'style-loader'
        if (rule.use && Array.isArray(rule.use) && rule.use.some((loader) => typeof loader === 'string' && loader.includes('style-loader'))) {
            // Find the index of the style-loader within the rule's loaders
            const styleLoaderIndex = rule.use.findIndex((loader) => typeof loader === 'string' && loader.includes('style-loader'))

            // Update the style-loader configuration
            rule.use[styleLoaderIndex] = {
                loader: rule.use[styleLoaderIndex],
                options: {
                    insert: function (element) {
                        element.setAttribute('data-host', 'true')
                        document.head.appendChild(element)
                    }
                }
            }
        }
    })

    config.plugins.push(
        new ModuleFederationPlugin(
            (module.exports = {
                name: 'host',
                exposes: {
                    './AuthProvider': './src/authGateway/AuthGateway',
                    './preventCSSCollision': './src/shared/preventCSSCollision'
                },
                filename: 'remoteEntry.js',
                shared: {
                    ...dependencies,
                    react: {
                        eager: true,
                        singleton: true,
                        requiredVersion: dependencies.react
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

    // If public path '/' everything works on host application but remote applications standalone throws errors.
    // config.output.publicPath = '/'
    //
    // Uncaught SyntaxError: Unexpected token '<'
    // ChunkLoadError: Loading chunk vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_css-loader_dist_runtime_sour-9f8e14 failed.

    // // If public path 'auto' when browsing sub routes of remote components on host application is ok but when you on sub route end refresh, throws errors
    // config.output.publicPath = 'auto'
    //
    // // Uncaught SyntaxError: Unexpected token '<' (at bundle.js:1:1)

    return Object.assign(config, override(babelInclude([path.resolve('src')]))(config, env))
}
