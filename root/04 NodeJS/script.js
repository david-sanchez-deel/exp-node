// 1. Nodemon (https://www.npmjs.com/package/nodemon): Install dependency as dev dependency, configure file. Hello world
// 2. Modules (https://javascript.info/modules-intro) (https://javascript.info/import-export) (https://javascript.info/modules-dynamic-imports)  
/* if(require.main == module) {
    console.log('Executed');
}
const b = require('./a');
console.log('b: ', b); */

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

// 4. http, promisify
// const util = require('util');

// Deprecate
/* function a() {
    console.log('Hi');
}
a();
a = util.deprecate(a, 'deprecated!');
a(); */

// DeepStrictEqual
/* console.log(1, util.isDeepStrictEqual({ a: 2}, {b: 3}));
console.log(2, util.isDeepStrictEqual({ a: 2}, {a: 2})); // What's faster? JSON.stringify or strictEqual?
 */
// Promisify - Talk first about callbacks
/* const readFileSync = util.promisify(require('fs').readFile);
(async () => {
    console.log('file', (await readFileSync('./a.js')).toString());
})(); */
/* 
const setTimeoutSync = util.promisify(setTimeout);
(async () => {
    await setTimeoutSync(1000);
    console.log('Hi after timeout');
})(); */

/* function execute (data, cb) {
    console.log('execute', data);
    cb(null, data)
}
 */
// Normal promisify
/*(async () => {
    console.log('a');
    await util.promisify(execute)('Pss');
    console.log('b');
})();
  */
 // custom promisify
/* execute[util.promisify.custom] = (data) => {
return console.log('execute2', data);
};

(async () => {
    console.log('a');
    await util.promisify(execute)('Pss');
    console.log('b');
})(); */