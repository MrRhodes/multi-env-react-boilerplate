
const express = require('express');

module.exports = () => {
    
    const app = express();
    
    app.all('/*', (req, res) => {
        res.send('process ' + process.pid + ' says hello!').end();
    });
    
    return app;
    
};
