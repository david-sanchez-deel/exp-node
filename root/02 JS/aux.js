// Execution context (https://tc39.es/ecma262/#sec-execution-contexts)
// Notas realizadas para impartir el taller
/* 1. Una función tiene algo llamado el contexto de ejecución (El cual contiene a this)
2. Cuando una función llama a otra, el contexto se guarda en el stack de contextos de ejecución

function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
 */

// Trade off entre recursión e iterativo
// Recursión requiere mas memoria, pero el codigo es mas corto y facil de entender!!???
// Lo iterativo requiere menos memoria pero mas codigo, en ocasiones no es necesario optimizar por lo que la recursión esta bien
// Todo lo iterativo puede hacerse de formar recursiva, pero no al contrario.

// 5:10


// Global: Global es window
// Definimos a
function a () {
  console.log("Into", "this", this, "is global?", this=== global); 
}
// a() // Es this === global true? { "title": "Is this === global?", "options": [{ "title": "Yes", "answer": 0 }, { "title": "No", "answer": 0 }] }
global.ab = 3; // Que es global?
var ab = 2; // ab queda asignada al global o al this? o a ninguno*?
// console.log("1", global, this);
this.ab = 4;
// console.log("Global", "is global?", this=== global); // Es this un global?
a(); // cual será su this? Y su global?
const b = {
  a
}
b.a();
console.log('New global', globalThis);
// Question, Why this in a function is different that this in root? How to make both to use the same this? Lexical environment outer property


// 5:15

// Decorators
// Call Vs Bind Vs Apply

/* 
function slow(x) {
  console.log(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  const cache = new Map();

  return function(x) {
    if (cache.has(x)) {    // if there's such key in cache
      return cache.get(x); // read the result from it
    }

    const result = func(x);  // otherwise call func

    cache.set(x, result);  // and cache (remember) the result
    return result;
  };
}

slow = cachingDecorator(slow);
console.log('slow: ', slow(1));
console.log('slow: ', slow(1));
console.log('slow: ', slow(2));
console.log('slow: ', slow(1));

*/

/* 
// we'll make worker.slow caching
let worker = {
  name: 'Work',
  slow(x) {
    // scary CPU-heavy task here
    console.log("Called with " + x, this);
    return this.name; // (*)
  }
};

// same code as before
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    // Bind
    // func = func.bind(this);
    // Normal
    let result = func(x); // (**)
    // Call
    // let result = func.call(this, x); // (**)
    // let result = func.apply(this, [x]); // (**)

    cache.set(x, result);
    return result;
  };
}

console.log( worker.slow(1) ); // the original method works

worker.slow = cachingDecorator(worker.slow); // now make it caching

console.log( worker.slow(2) ); // Whoops! Error: Cannot read property 'someMethod' of undefined
 
*/

// 5:25
// Trick: Deep clone? :s
/* const a = {
  user: 'a'
};
const b = {
  user: 'a'
};
console.log(a == b);
console.log(a === b);
console.log(JSON.stringify(a) === JSON.stringify(b));
console.log(JSON.parse(JSON.stringify(a)) === JSON.parse(JSON.stringify(b)));
 */

 // Funciones
//  Function names, las funciones son objetos, y como objetos tienen propiedades
/* function sayHi(b, a = 2) {
  return a + b;
}

console.log(sayHi.name); // sayHi
console.log(sayHi.length); // 1 // Algunas veces cuando moqueamos cosas con sinon o spyOn de jest, nos damos cuenta qu nos dice que la longitud de parametros no es la misma, pero como?  // Rest parameters no cuuentan
 */

/* 
 // Closure All functions remember the Lexical Environment in which they were made
 function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();

console.log( counter() ); // 0
console.log( counter() ); // 1
console.log( counter() ); // 2 */

// Lexical environment
// Cualquier función en JS tiene un lexial env.
// 1. Environment Record – an object that stores all local variables as its properties (and some other information like the value of this).
// A reference to the outer lexical environment, the one associated with the outer code.

// 5:35

// Hoisting  hoisting” (raising)

/* console.log(a);
var a = 2; // Cuando el lex carga, queda como indefinida

console.log(b);
let b = 2; // Cuando el lex carga, queda como no inicializada. (Por eso el codigo es capaz d decirnos que no podemos usarla antes de ser inicializada)
 */
// var, global scope.  En funciones el var queda dentro de la función


/* if (true) {
  var test = true;
  let test2 = true;
}
console.log(test); { "title": "What's the value of test and test2?", "options": [{ "title": "true, true", "answer": 0 }, { "title": "true, not defined", "answer": 0 }, { "title": "not defined, not defined", "answer": 0 }, { "title": "shrug", "answer": 0 }] }
// Question: 
// As we can see, var pierces through if, for or other code blocks. That’s because a long time ago in JavaScript blocks had no Lexical Environments. And var is a remnant of that.

// Que pasa si metemos el var dentro de una función?
/* 
function tvar () {
  if (true) {
    var test = true;
    let test2 = true;
  } 
}
tvar(); */
// console.log(test);
// Hoisting de funciones: Con las funciones ellas pasan a estar listas de inmediato

// Debug with chrome and optimizations
// chrome://inspect/
// node --inspect script.js
// Notar que aquí la función G debería tener aun su lexical scope... con value definido, pero V8 mata la variable pues no es usada
/* setTimeout(() => {
  function f() {
    let value = Math.random();
  
    function g() {
      debugger; // in console: type alert(value); No such variable!
    }
  
    return g;
  }
  
  let g = f();
  g();
}, 20000);
 */

// 5:45 pm

// “immediately-invoked function expressions” (abbreviated as IIFE).
// hechas para solucionar problemas con var
/* (function() { 

  let message = "Hello";

  console.log(message); // Hello

})();

 */
// Timeouts
// Why callback is not being garbage collected? Because node store a reference to it
// setTimeout(new Function("console.log('Hello')"), 1000);


// Express functions
/* let user = {
  firstName: "John",
  sayHi() {
    console.log(`Hello, ${this.firstName}!`);
  }
};
let f = user.sayHi;
setTimeout(f, 1000);  */
// question, how to fix it?

// 5:55 pm

// Bind
// En ocasiones necesitamos pasar un bind a muchas funciones, Como en sails js cuando quieres trabajar controladores como clases. Por lo que quieres hacer un bindAll
// _.bindAll(object, methodNames)

// Funciones parciales
/* function mul(a, b) {
  return a * b;
}
let double = mul.bind(null, 2);
console.log(double(2)); */
// Event loop
// setTimeout(() => alert("World"));


// Prototypes
// Flexibilidad en el codigo, puedes crear funciones en tiempo de ejecución, o incluso cambiarlas! Un gran poder conlleva una gran responsabilidad
/* let animal = {
  eats: true
};

animal.__proto__ = { hid: 1};

let rabbit = {
  jumps: true
};

rabbit.__proto__ = animal;
console.log('Eats', rabbit.eats)
console.log('Hod', rabbit.hid)
animal.__proto__.hid = 3;
console.log('Hod', rabbit.hid)
// Importante saber eso por la cantidad de bugs que pueden ocurrir
// Object.keys only returns own keys
console.log(Object.keys(rabbit)); // jumps

// for..in loops over both own and inherited keys
for(let prop in rabbit) console.log(prop); // jumps, then eats */


// Constructor and initial prototype
/* console.log(Object.getPrototypeOf({}), Object.getPrototypeOf({}).__proto__,  String.prototype)
String.prototype.toLowerCase = () => 'Jaimito';
console.log('ASD'.toLowerCase()) */

// Las funciones tambien tienen prototipos
// Los prototipos de las funciones tienen una propiedad llamada constructor que es la función en si misma.
// polyfilling? Se logra cambiando los prototypes! No se recomienda hacer esto ,pero a veces no queda otra opción
// Las clases? son funciones, y se comportan de la misma forma pero se escriben de forma diferente. Ahora, no es lo mismo una fnción a una clase, por ejemplo las clases deben ser usadas con New, el to string es diferente y tiene ciertas propiedades diferentes, los metodos de la clase no son enumerables, clases son siempre estrictas
// Cambiar el prototipo de algo es una operación intensiva que mata todas las optimizaciones que hace el motor, por lo que no se recomienda hacerlo de forma frecuente.


// Clases
/* 

class Example {
  _test4 = 2;
  #test = 2;
  test2 = 1;
  static test5 = 2;

  get test() {
    return this.#test;
  }

  constructor() {
    this.test3 = 3;
  }
}
console.log(new Example(), Example); */

// Exceptions (Puede ser otra sesión de manejo de errores)
// process.on("uncaughtException")

// 6pm.
// Estudiar:
// Callbacks
// Promesas
// async / await 
// Vs entre ellas, por qué callback? Cuando promesas? Hablar sobre la ivnersión del control, no queremos que los otros nos controlen
// Fetch no es una promesa, pero retorna un objeto que se comporta como tal, por lo que pueden crearse objetos que sean promesas y muchas otras cosas
// Generators https://javascript.info/generators
// Async Generators https://javascript.info/async-iterators-generators (Utiles en paginación por token)
// Proxy https://javascript.info/proxy
// Advance: https://javascript.info/reference-type https://javascript.info/currying-partials
// Homework:
// Rest, Spread https://javascript.info/rest-parameters-spread (And arguments keyword! with arrow funcs)
// New Function https://javascript.info/new-function
// Flag properties https://javascript.info/property-descriptors https://javascript.info/property-accessors
// Programación orientada a objetos, clases abstractas, interfaces.
// Sobre escritura de metodos, herencia en clases, uso de super (https://javascript.info/class-inheritance)
// Callbacks: Callback Hell
// Promesas Promise.all, Promise.race, then, catch, finally

// Reto:
// 1. Con base en lo visto, que bug puede darse con este código?
// La idea del código es que dado un valor en key, este pueda guardarse y luego imprimirse en la consola
/* let key = 'key';
const obj = {};
obj[key] = "some value";
console.log(obj[key]); // Debería imprimir el valor ingresado

// 2. Como solucionar el bug?
let obj = Object.create(null); // Cambiando la definición por esto
// a. Como lograr herencia multiple o algo parecido?

// Robar puntos:
Usando http-server de node, replicar el comportamiento de express:
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
});
app.use(...);
app.listen(3000)

Una vez este listo, publicarlo en el repo y anunciarlo al grupo, quien encuentre un bug o pueda hacer que el comportamiento de la función cambie se roba los puntos del otro.

Que debe tenerse en cuenta:
1. Manejo de errores
2. Manejo de contexto
3. Manejo de variables y validaciones

Que no puede hacerse:
1. NO pueden redefinirse componentes de la solución del compañero
2. NO pueden hacer trampa
3. No pueden hacer lo que no se puede hacer
4. Ambos compañeros deben de estar de acuerdo en que se perdió o gano.

Como saber si gane?
1. Si usando el código del compañero (.get o .use o .listen) se logra un comportamiento no esperado por el creador.

Ganador: Los puntos del otro + 1.
Perdedor: Perder todos los puntos.

Que se necesita para participar?
Debe crear su solución y ejemplo de uso en su carpeta en este repo para poder robar los puntos de otra persona.

Fecha limite para códigos: Prox lunes.
Fecha limite para dañar soluciones:  Prox miercoles
 
*/

