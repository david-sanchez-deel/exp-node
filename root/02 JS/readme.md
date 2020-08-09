# Topics (From https://javascript.info)

1. Execution context (https://tc39.es/ecma262/#sec-execution-contexts)
2. Recursion Vs Iteration
3. global vs this vs globalThis
4. Decorators: Using call vs bind vs apply
5. Deep clone with JSON.stringify parse
6. Functions: properties, name, length
7. Lexical environment
8. Hoisting
9. var vs let vs const. Scope!
10. Debug with NodeJS and Chrome (--inspect). V8 optimizations
11. IIFE
12. Advance use of this (bind of objects)
13. Advance use of prototypes
14. Constructor functions
15. Class

## Homework
1. Callbacks vs promises vs async/await
2. Generators https://javascript.info/generators
3. Async Generators https://javascript.info/async-iterators-generators
4. Proxy https://javascript.info/proxy
5. Advance: https://javascript.info/reference-type https://javascript.info/currying-partials
6. Rest, Spread https://javascript.info/rest-parameters-spread
7. New Function https://javascript.info/new-function
8. Flag properties https://javascript.info/property-descriptors https://javascript.info/property-accessors
9. POO and super (https://javascript.info/class-inheritance)

## Challenge
1. What's the bug here? This code should print the value of "obj" after assign it from the variable "key"
```
let key = 'key';
const obj = {};
obj[key] = "some value";
console.log(obj[key]);
```

2. How to solve it? Do this works? Why?
```let obj = Object.create(null);```

3. How to archive multiple inheritance? (Mixing)

## Pointhief

Using `http-server` from node, replicate the behavior of express:
```
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
});
app.use(...);
app.listen(3000)
```
Once ready, publish it into this repo and announce it to the group. Who finds you a bug or can change the expected behavior will steal your points.

### Be aware of
1. Exceptions management
2. Context management
3. Variables and checks

### Why is not allowed to do?
1. DO NOT redefine the components of the solution
2. DO NOT cheat

### How to know I win?
1. Both people should be agree on the result.
2. If using the code of the other one (`.get` or `.use` or `.listen`), you are able to change its behavior.

**Winner:** All the points from the other one
**Loser:** 0 points is your new score (You can not lose your assistance points)

## How to participate?
Create your solution and write an example using it, then you will be able to participate.

Due date for code: 10/8/2020
Due date to hack:  13/8/2020
