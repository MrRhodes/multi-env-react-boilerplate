
const cluster = require('cluster');
const availableCores = require('os').cpus().length;

const createApp = require('./app');

const { MAX_CLUSTER = 1, NODE_ENV = 'development', CONFIG_ENV = 'development' } = process.env;

if (cluster.isMaster) {
    
    let coreCount = 1;
    
    if (NODE_ENV === 'production') {
        coreCount = Math.min(availableCores, MAX_CLUSTER);
    } else {
        console.log('Can only run on multiple cores in "production" env.');
    }
    
    console.log('Master cluster setting up ' + coreCount + ' workers...');
    
    cluster.on('online', worker => {
        console.log('Worker ' + worker.process.pid + ' is online');
    });
    
    cluster.on('exit', (worker, code, signal) => {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
    
    for (let i = 0; i < coreCount; i++) cluster.fork();
    
} else {
    
    const app = createApp(); // can inject a config here if needed. 👍
    
    const server = app.listen(3000, () => {
        console.log('Process ' + process.pid + ' is listening to all incoming requests');
    });
    
}
