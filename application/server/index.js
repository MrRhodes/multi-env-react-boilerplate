
const cluster = require('cluster');
const numWorkers = require('os').cpus().length;

const app = require('./app');

if (false) {
    
    // app.use(webpackMiddleware()).listen();
        
} else {
    
    if (cluster.isMaster) {
        
        console.log('Master cluster setting up ' + numWorkers + ' workers...');
        
        cluster.on('online', worker => {
            console.log('Worker ' + worker.process.pid + ' is online');
        });
        
        cluster.on('exit', (worker, code, signal) => {
            console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
            console.log('Starting a new worker');
            cluster.fork();
        });
        
        for (let i = 0; i < numWorkers; i++) cluster.fork();
        
    } else {
        
        const server = app().listen(3000, () => {
            console.log('Process ' + process.pid + ' is listening to all incoming requests');
        });
        
    }

}