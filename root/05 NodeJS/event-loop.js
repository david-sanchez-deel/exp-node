// NodeJS works in 1 thread. Just 1 thread!!!!. ONE THREAD!.
//  Event loop is the mechanism used by NodeJS to work. Using libuv (https://libuv.org/)
// ----- Hello world
/* console.log('Hello'); */

// ----- Call stack definition
/* setTimeout(() => { // This callback is moved to the call stack
    console.log(1, 'Timeout');
}, 1000);

console.log(2, 'Hello'); */

// ----- Call stack definition timeout == 0
/* setTimeout(() => { // This callback is moved to the call stack
    console.log(1, 'Timeout');
}, 0);

console.log(2, 'Hello'); */

// ----- Complex code
/* 
const fs = require('fs');
// 1. Go to Call stack, event loop execute it. is async... Go to Worker Pool and wait.
// Call Stack: [], Api: [readFile]

fs.readFile('./data.txt', (err, data) => {
    // 3. readFile finish, callback added to the Call stack, event loop execute it. 
    // Call Stack: [], Api: {setTimeout}
    console.log(1, 'File:', data);
    // 4. setTimeout, callback added to the Call stack, event loop execute it. is async... Go to Worker Pool
    // Call Stack: [], Api: {setTimeout, setTimeout}
    setTimeout(() => {
        // 5. setTimeout executed by api. Added to call stack, event loop executes it.
        // Call Stack: [], Api: {setTimeout}
        console.log(2, 'Timeout');
    }, 4000);
});

// 2. Go to Call stack, event loop execute it.
// Call Stack: [], Api Stack: [readFile] --> 'hello'
console.log(3, 'Hello');

// 3. setTimeout go to Call stack, event loop execute it. is async... Go to Worker Pool
// Call Stack: [], Api: {readFile, setTimeout}
setTimeout(() => {
    // 6
    console.log(4, 'Timeout');
}, 5000);


// Microtask, NodeJS does not have any reference to it. Docs found for browsers
 */
async function promiseHello() {
    console.log('Async');
    await require('util').promisify(setTimeout)(1000);
    console.log('Async End');
} 
setTimeout(() => { console.log(1, 'Timeout'); }, 0);
new Promise((resolve) => {
    console.log('Promise');
    resolve();
});
console.log('Hello');
promiseHello();
console.log('End');
/* Event loop check list
   ┌───────────────────────────┐
┌─>│           timers          │ --> setTimeout, setInterval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │ --> I/O callbacks operations
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │  --> setImmediate
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
   */

// Process
/* setTimeout(() => {
    console.log("Timeout");
}, 0);
setTimeout(() => {
    console.log("Timeout");
}, 0);
  
setImmediate(() => console.log("Inmediate"));
 */
// Deterministic
/* const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});
 */
// process.nextTick() - How to handle callbacks using nextTicket (Do not use it, use setImmeadiate) 
// let bar;
/* 

// this has an asynchronous signature, but calls callback synchronously
function someAsyncApiCall(callback)
// { callback(); }
// { process.nextTick(callback)}

// the callback is called before `someAsyncApiCall` completes.
someAsyncApiCall(() => {
  // since someAsyncApiCall hasn't completed, bar hasn't been assigned any value
  console.log('bar', bar); // undefined
});

bar = 1; */

// process.nextTick() fires immediately on the same phase
// setImmediate() fires on the following iteration or 'tick' of the event loop



// Performance:
// Event loop is not perfect matching regexp expressions or json expressions


/* // Regexp exp:
let filePath = '/a/b/c"';
filePath = '/'.repeat(100) + '\n';
// Util tools: https://github.com/substack/safe-regex
// https://www.cs.bham.ac.uk/~hxt/research/rxxr2/
// REDOS
if (filePath.match(/(\/.+)+$/)) {
    console.log('valid path');
}
else {
    console.log('invalid path');
}
 */
// In server, do not use
/* Encryption:
    crypto.randomBytes (synchronous version)
    crypto.randomFillSync
    crypto.pbkdf2Sync
    You should also be careful about providing large input to the encryption and decryption routines.
Compression:
    zlib.inflateSync
    zlib.deflateSync
File system:
    Do not use the synchronous file system APIs. For example, if the file you access is in a distributed file system like NFS, access times can vary widely.
Child process:
    child_process.spawnSync
    child_process.execSync
    child_process.execFileSync
*/


// JSON Performance problem
/* var obj = { a: 1 };
var niter = 20;

var before, str, pos, res, took;

for (var i = 0; i < niter; i++) {
  obj = { obj1: obj, obj2: obj }; // Doubles in size each iter
}

before = process.hrtime();
str = JSON.stringify(obj);
took = process.hrtime(before);
console.log('JSON.stringify took ' + took);

before = process.hrtime();
pos = str.indexOf('nomatch');
took = process.hrtime(before);
console.log('Pure indexof took ' + took);

before = process.hrtime();
res = JSON.parse(str);
took = process.hrtime(before);
console.log('JSON.parse took ' + took);
 */

// Partitioning
n = 1000;
sum = 0;
/*  
for (let i = 0; i < n; i++)
  sum += i;
let avg = sum / n;
console.log('avg: ' + avg);
  */
// Partitioning
/* function asyncAvg(n, avgCB) {
    // Save ongoing sum in JS closure.
    var sum = 0;
    function help(i, cb) {
      sum += i;
      if (i == n) {
        cb(sum);
        return;
      }
  
      // "Asynchronous recursion".
      // Schedule next operation asynchronously.
      setImmediate(help.bind(null, i+1, cb));
    }
  
    // Start the helper, with CB to call avgCB.
    help(1, function(sum){
        var avg = sum/n;
        avgCB(avg);
    });
  }
  
  asyncAvg(n, function(avg){
    console.log('avg of 1-n: ' + avg);
  }); */

// offloading
// https://nodejs.org/api/child_process.html
// https://nodejs.org/api/cluster.html


// https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
// Recommended: https://nodejs.org/en/docs/guides/dont-block-the-event-loop/