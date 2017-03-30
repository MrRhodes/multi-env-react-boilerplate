
const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
    NODE_ENV: nodeEnv = 'development',
    APP_ENV: appEnv = 'development'
} = process.env;

const isProduction = nodeEnv === 'production';
const { join, resolve } = path;

const paths = {
    app: join(__dirname, './src/app'),
    //source: path.join(__dirname, './application/src'),
    build: join(__dirname, './build'),
    //assets: path.join(__dirname, './application/assets')
};

const config = {
    API_ENDPOINT: 'Hello World 🌎'
};



module.exports = () => {
    
    console.log('Using webpack config for', appEnv);
    
    return {
        
        //devtool: isProduction ? 'eval' : 'source-map',
        context: paths.app,
        
        entry: {
            app: [
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
            filename: '[name].pack.js'
        },
        
        resolve: {
            extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
            modules: [
                resolve(__dirname, 'node_modules'),
                paths.app,
            ],
        },
        
        module: {
            rules: [{
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            }]
        },
        
        plugins: [
            
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: Infinity // optimise this. kay..?
            }),
            
            new HtmlWebpackPlugin({
                template: join(paths.app, 'index.html'),
                path: paths.build,
                filename: 'index.html',
            }),
            
            new webpack.DefinePlugin({
                config: JSON.stringify(config),
                NODE_ENV: JSON.stringify(nodeEnv),
                APP_ENV: JSON.stringify(appEnv)
            }),
            
            // new webpack.HotModuleReplacementPlugin(),
            // new webpack.NoEmitOnErrorsPlugin()
            
        ]
        
        // devServer: {
        //     contentBase: './source',
        //     historyApiFallback: true,
        //     port: 3000,
        // }
        
    };
    
};
