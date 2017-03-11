
const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const paths = {
    app: path.join(__dirname, './application'),
    source: path.join(__dirname, './application/src'),
    build: path.join(__dirname, './build'),
    assets: path.join(__dirname, './application/assets')
};

const config = {
    greeting: 'Hello World 🌎'
};

const plugins = [
    
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'vendor-[hash].js',
    }),
    
    new HtmlWebpackPlugin({
        template: path.join(paths.app, 'index.html'),
        path: paths.build,
        filename: 'index.html',
    }),
    
    new webpack.DefinePlugin({
        config: JSON.stringify(config)
    }),
    
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin()
    
];


const rules = [
    
    {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
    }
    
];



module.exports = {
    
    devtool: isProduction ? 'eval' : 'source-map',
    context: paths.source,
    
    entry: {
        js: [
            './index.jsx',
            // 'webpack-hot-middleware/client'
        ],
        vendor: [
            // 'babel-polyfill',
            // 'es6-promise',
            // 'immutable',
            // 'isomorphic-fetch',
            'react-dom',
            // 'react-redux',
            // 'react-router',
            'react',
            // 'redux-thunk',
            // 'redux',
        ],
    },
    
    output: {
        path: paths.build,
        publicPath: '/',
        filename: 'app-[hash].js',
    },
    
    resolve: {
        extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            paths.source,
        ],
    },
    
    module: { rules },
    plugins,
    
    devServer: {
        contentBase: './source',
        historyApiFallback: true,
        port: 3000,
    }
    
};
