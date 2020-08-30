/**
 * JWT https://tools.ietf.org/html/rfc7519
 * A Jwt has a Header: { "alg": "HS256", "typ": "JWT" }
 * A claim (or payload)   {"iss":"joe", "exp":1300819380, "http://example.com/is_root":true}
 * A signature (Header + payload) using alg
 * The parts are being concatenated by "."
 * 
 * Three different king of  JWT Claim Names: Registered Claim Names, Public Claim Names, and Private Claim Names.
 * Registered: iss (issuer), sub (subject), aud: string | string[] (audience), exp, "nbf" (Not Before), "iat" (Issued at), jti.
 * Public (a value that contains a Collision-Resistant Name)

How to implement it for authorization

**/
const fs = require('fs');
const { Console } = require('console');
// console is global, performs "push" operations to stdout and stderr streams
const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');
// Custom simple logger
// Default console: new Console({ stdout: process.stdout, stderr: process.stderr });
const logger = new Console({ stdout: output, stderr: errorOutput });
// use it like console
const count = 5;
logger.log('count: %d', count);

logger.count();
logger.count();

console.time();
console.timeEnd();
console.trace();
console.table();

// Streams used by console.log
process.stdout
process.stderr

// are sync, why? To avoid concurrency problems. 2 writes at the same time
// Files: synchronous on Windows and POSIX
// TTYs (Terminals): asynchronous on Windows, synchronous on POSIX
// Pipes (and sockets): synchronous on Windows, asynchronous on POSIX

// TTY? : node -p -e "Boolean(process.stdout.isTTY)"


// https://www.npmjs.com/package/winston
// https://www.npmjs.com/package/pino
// https://github.com/pinojs/pino/blob/HEAD/docs/asynchronous.md


// Add logger to project