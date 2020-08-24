// https://nodejs.org/api/cluster.html
// npx artillery quick -d 10 -r 1000 -k http://localhost:8000



const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  let numReqs = 0;
  let numReqsByWorker = {};
  setInterval(() => {
    console.log(`numReqs = ${numReqs}`, numReqsByWorker);
  }, 1000);
  function messageHandler(id, msg) {
    if (msg.cmd && msg.cmd === 'notifyRequest') {
      numReqs += 1;
      numReqsByWorker[id] = (numReqsByWorker[id] || 0) + 1;
    }
  }

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  for (const id in cluster.workers) {
    cluster.workers[id].on('message', messageHandler.bind(null, id));
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
    process.send({ cmd: 'notifyRequest' });
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}

/**
 * Summary report @ 14:21:54(-0500) 2020-08-24
  Scenarios launched:  10000
  Scenarios completed: 10000
  Requests completed:  10000
  Mean response/sec: 222.27
  Response time (msec):
    min: 3.2
    max: 1655.8
    median: 9.4
    p95: 25.9
    p99: 90.9
  Scenario counts:
    0: 10000 (100%)
  Codes:
    200: 10000

Without it:
Summary report @ 14:23:06(-0500) 2020-08-24
  Scenarios launched:  10000
  Scenarios completed: 10000
  Requests completed:  10000
  Mean response/sec: 328.73
  Response time (msec):
    min: 2.6
    max: 1056.7
    median: 8.1
    p95: 29.5
    p99: 154.8
  Scenario counts:
    0: 10000 (100%)
  Codes:
    200: 10000

 */

// How it works?
// Non windows:
/**
 * The first one (and the default one on all platforms except Windows), is the round-robin approach, where the master process listens on a port, accepts new connections and distributes them across the workers in a round-robin fashion, with some built-in smarts to avoid overloading a worker process.
 * The second approach is where the master process creates the listen socket and sends it to interested workers. The workers then accept incoming connections directly.



*/