
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const configFunc = require('../webpack.config');
const path = require('path');

const { NODE_ENV } = process.env;

module.exports = () => {
    
    const app = express();
    
    if (NODE_ENV !== 'production') {
        
        console.log('adding webpack dev');
        
        const config = configFunc();
        
        compiler = webpack(config);
        
        app.use(webpackMiddleware(compiler, {
            publicPath: config.output.publicPath,
            stats: {colors: true}
        }));
        
    } else {
        app.use(express.static(path.join(__dirname,'..','build')));
    }
    
    //app.use((req, res) => console.log(req));
    
    return app;
    
};
