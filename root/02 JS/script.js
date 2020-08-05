// WeakSet o WeakMap. --> Andres Esteban.
// garbage collector

// Execution context (https://tc39.es/ecma262/#sec-execution-contexts)
// 1. Una función tiene algo llamado el contexto de ejecución (El cual contiene a this)
// 2. Cuando una función llama a otra, el contexto se guarda en el stack de contextos de ejecución

/* function pow(x, n) {
    let result = 1;
  
    for (let i = 0; i < n; i++) {
      result *= x;
    }
  
    return result;
  } */

// Trade off entre recursión e iterativo
// Todo lo iterativo puede hacerse de formar recursiva, pero no al contrario.


// window
// global
// console.log(global == globalThis); 
// { outer: null}
/* function a () { 
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
 */
// Question, Why this in a function is different that this in root? How to make both to use the same this? Lexical environment outer property


// Decorators
// Call Vs Bind Vs Apply
/* let worker = {
    name: 'Work',
    slow(x) {
      console.log("Called with " + x);
      return this.name; // (*)
    }
  };

function cachingDecorator(func) {
    const cache = new Map();
  
    return function(x) {
      if (cache.has(x)) {    // if there's such key in cache
        return cache.get(x); // read the result from it
      }
  
      // let result = func.call(this, x); // (**)
      // let result = func.apply(this, [x]); // (**)
      //func = func.bind(this);
      const result = func(x);  // otherwise call func


      cache.set(x, result);  // and cache (remember) the result
      return result;
    };
  }
console.log( worker.slow(1) ); // the original method works
worker.slow = cachingDecorator(worker.slow); // now make it caching
console.log( worker.slow(2) );

 */
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

console.log(JSON.parse(JSON.stringify(a)) === JSON.parse(JSON.stringify(b))); */

// Funciones
//  Function names, las funciones son objetos, y como objetos tienen propiedades
/* function sayHi(b, a = 2) {
    return a + b;
  }
// console.log(sayHi.name); // sayHi
console.log(sayHi.length); */


// Closure All functions remember the Lexical Environment in which they were made
/* function makeCounter() {
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
// Cualquier función en JS tiene un lexical env.
// 1. Environment Record – an object that stores all local variables as its properties (and some other information like the value of this).
// A reference to the outer lexical environment, the one associated with the outer code.

// Hoisting  "hoisting” (raising)
// no inicsz..., indefinida, definida
/* function tvar () {
    if (true) {
      var test = true;
      let test2 = true;
    } 
  }
  tvar();
  console.log(test); */
/*   setTimeout(() => {
    function f() {
      let value = Math.random();
    
      function g() {
        debugger; // in console: type alert(value); No such variable!
      }
    
      return g;
    }
    
    let g = f();
    g();
  }, 20000); */

// “immediately-invoked function expressions” (abbreviated as IIFE).
/* 
(function () {
    var message = "Hello";
    console.log(message); // Hello
})(); */

// Timeouts
// setTimeout(new Function("console.log('Hello')"), 1000); // No lo hagas! eval()

/* let user = {
    firstName: "John",
    sayHi() {
      console.log(`Hello, ${this.firstName}!`);
    }
  };
  setTimeout(() => user.sayHi(), 1000);
  setTimeout(user.sayHi.bind(this)(), 1000); */

// Bind
// _.bindAll(object, methodNames)


// Funciones parciales
/* function mul(a, b) {
    console.log('b: ', b);
    console.log('a: ', a);
    return a * b;
}
const mul2 = mul.bind(null, 2);

console.log(mul2(3)); */

//          Prototypes
// JavaScript --> Object

/* let animal = {
    eats: true
  };
animal.__proto__ = { hid: 1};

let rabbit = {
    jumps: true
  };
rabbit.__proto__ = animal;

console.log(Object.keys(rabbit)); */

// for..in loops over both own and inherited keys
/* for(let prop in rabbit) {
    if (rabbit.hasOwnProperty(prop)){
    console.log(prop); // jumps, then eats
    }
}
 */
// console.log(Object.getPrototypeOf({}), Object.getPrototypeOf({}).__proto__, String.prototype)
/* String.prototype.toLowerCase = () => 'Jaimito';
console.log('Asd'.toLowerCase()); */

// Las funciones también tienen prototipos
/* function a () {

}
console.log(a.__proto__.constructor) */

// Class
// Java: private, protected, public, default
/* class Example {
    _test4 = 2;
    test2 = 1;
    #test = 2;
    static test5 = 2;

    get test() {
        return this.#test;
      }

      constructor() {
        this.test3 = 3;
      }
}
console.log(Example, new Example(), new Example().test); */

// Exceptions (Puede ser otra sesión de manejo de errores)
// process.on("uncaughtException", () => asd)

// Estudiar:
// Callbacks
// Promesas
// Vs entre ellas, por qué callback? Cuando promesas? Hablar sobre la ivnersión del control, no queremos que los otros nos controlen
// async / await 
// Fetch no es una promesa, pero retorna un objeto que se comporta como tal, por lo que pueden crearse objetos que sean promesas y muchas otras cosas
// Generators https://javascript.info/generators
// Async Generators https://javascript.info/async-iterators-generators (Utiles en paginación por token)
// Proxy https://javascript.info/proxy
// Advance: https://javascript.info/reference-type https://javascript.info/currying-partials

// Homework:
// (...) Rest, Spread https://javascript.info/rest-parameters-spread (And arguments keyword! with arrow funcs)
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
*/
// a. Como lograr herencia multiple o algo parecido?

// Robar puntos:
// Usando http-server de node, replicar el comportamiento de express:
/* const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
});
app.use(...);
app.listen(3000) */

// Una vez este listo, publicarlo en el repo y anunciarlo al grupo, quien encuentre un bug o pueda hacer que el comportamiento de la función cambie se roba los puntos del otro.

/* Que debe tenerse en cuenta:
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