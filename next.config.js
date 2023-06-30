const CopyWebPackPlugin = require('copy-webpack-plugin')
const path = require('path')


/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:
    {
        serverActions: true,
        serverComponentsExternalPackages: ['sequelize']
    },
    webpack: (config, { isServer }) => {
        config.plugins.push(
            new CopyWebPackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'node_modules/flowbite/dist/flowbite.min.js'),
                        to: path.resolve(__dirname, 'public/js')
                    }
                ]
            })
        )

        return config
    }
}

module.exports = nextConfig
