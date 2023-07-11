const CopyWebPackPlugin = require('copy-webpack-plugin')
const path = require('path')


/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:
    {
        serverActions: true,
        serverComponentsExternalPackages: ['sequelize']
    }
}

module.exports = nextConfig
