// vue.config.js
'use strict'
const path = require('path')
const webpack = require('webpack')
module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                '/api/product/list': {
                    target: 'http://s831065.m.whd.weishangye.com',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api/product/list': '/openapi.php?act=getGoodsList'
                    }
                }
            }
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"development"',
                    API_HOST: '"/api"'
                }
            }),
        ]
    }
}