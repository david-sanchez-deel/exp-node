// 1. Nodemon (https://www.npmjs.com/package/nodemon): Install dependency as dev dependency, configure file. Hello world
// 2. Modules (https://javascript.info/modules-intro) (https://javascript.info/import-export) (https://javascript.info/modules-dynamic-imports)  
// 3. Event emitter
/* const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('hello', (data) => {
    console.log('Someone says hello with', data)
})

setTimeout(() => {
    console.log('Say Hi!');
    emitter.emit('hello', { name: 'David' });
}, 1000); */
// 4. process API (https://nodejs.org/api/process.html) is an event emitter.
/* 
process.on('uncaughtException', (err, origin) => {
    console.log('Critical error');
    console.log('origin: ', origin);
    console.log('err: ', err);
  });

setTimeout(() => {
    console.log('This will still run.');
}, 500);

throw new Error(); */
// process.argv
// console.log('Arguments', process.argv);
// console.log(process.cwd());
// console.log(process.env);
// process.exit(1);
// process.kill(90)
// console.log(process.memoryUsage());

// 3. Dotenv (https://www.npmjs.com/package/dotenv), as registry, create .env
