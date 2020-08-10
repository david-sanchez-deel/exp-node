// JS: ECMAScript 7, 8, 9, NEXT. ?? ?

// Strict https://javascript.info/strict-mode

// Variables
// Primitives
// string, number, boolean, null, undefined, Symbol, bigInt
const bigInt = 1234567890123456789012345678901234567890n;
// console.log('bigInt: ', bigInt, typeof bigInt);
// console.log('typeof "": ', typeof "");
// console.log("typeof 4: ", typeof 4);
// console.log("typeof undefined: ", typeof undefined);
// console.log("typeof true: ", typeof true);
// console.log("typeof Symbol(4): ", typeof Symbol(4));
// console.log("typeof null: ", typeof null); // La mayoria dice: null
// Why? Bug in old JS. Fix it would kill JS. "That’s an officially recognized error in typeof behavior, coming from the early days of JavaScript and kept for compatibility. Definitely, null is not an object. It is a special value with a separate type of its own."

// No primitives: object
// console.log("typeof function", typeof function(){});
// console.log(typeof new Date());

// Operators
// console.log("2**2: ", 2 ** 2);
// console.log('"1"+2: ', "1" + 2);
// console.log('1+"2": ', 1 + "2");
// console.log('2 + 2 + "1": ', 2 + 2 + "1");
// console.log('1-"2": ', 1 - "2");
// console.log("+true: ", +true);
// console.log("+false: ", +false);
// console.log('+"": ', +"");
// console.log('+"1"+(+"2"): ', +"1" + +"2");

// , operator
// (a = 1 + 2), 3 + 4; // a = 3
// a = (1 + 2, 3 + 4); // a = 7

// Booleans
// console.log('False', !!'0', Boolean('0'), !!+0);
// console.log('True', !!'1', Boolean('1'), !!+1);

// Switch
// Good to use to replace if else operations over the same property
/* role = 'admin';
switch (role) {
  case 'admin':
    console.log('Case admin');
    break; // What happen if I remove this?
  case 'recruiter':
    console.log('Case recruiter');
    break;
  default:
    console.log('Case default');
} */

// Comparison
// console.log("true === 1: ", true == 1);
// console.log('false == 0: ', false == 0);
// console.log('"1" == 1: ', "1" == 1);
// console.log('"01" == 1: ', "01" == 1);
// console.log('Boolean(0): ', Boolean(0));
// console.log('Boolean("0"): ', Boolean("0"));
// console.log('Boolean(0) == Boolean("0"): ', Boolean(0) == Boolean("0"));
// console.log('0 == "0": ', 0 == "0"); // Question

// Functions
// Local variables (Let Scope)

/* let message = 'A';
function showMessage1() {
    let message = "Hello, I'm JavaScript!"; // local variable, What if I remove the let keyword?
    console.log('intern message: ', message);
}
showMessage1();
console.log('message: ', message); */

// Local variables (Var Scope)
/* console.log('---- Local variables, var scope');
message = 'B';
function showMessage2() {
    var message = "Hello, I'm JavaScript!"; // Var should be global, no?
    console.log('1, intern message2: ', message);
}
showMessage2();
console.log('2, message: ', message); */


// Default values
/* function showMessageDefault(text = "asd") {
    console.log(text );
}
showMessageDefault();
 */

 // Variables
/* let a2  =2; // Use this if const is not possible
a2 =3;
a2 = 4; // Some languages does not support this
var b = 2;  // Avoid this
b = 3;
const c = 2; // Always try to use this. */
// c = 3; // Error

// Reference && Value
/* const d = {}; // 
d.a = 2; */
// const d = Object.freeze({});

// Notes
// 1. const COLOR_RED = "#F00"; // Important for global constants, I don't use it
// 2. Names matter, NEVER use a2, a, aux, i, j as names

// Ternary
// console.log('ternary', 'odd' ? 'Yep' : 'Nop');
//const a = 'odd' ? 'Yep' : (true ? 1 : (a ? 2: 4)); NOT

// Function scopes (By block)
// console.log('sum', sum(2, 2));
/* function sum(a, b) {
    return a + b;
} */

/* console.log('sum', sum(2, 2));
let sum = function(a, b) {
    return a + b;
  }; */

// Arrow functions
/* this.message = 3;
console.log('this.message1: ', this.message);
function sum2 () {
    this.message = 2;
    console.log('this.message2: ', this.message);
}
sum2() */

/* this.message = 3;
console.log('this.message3: ', this.message);
sum3 = () => {
    this.message = 2;
    console.log('this.message4: ', this.message);
}
sum3()
console.log('this.message5: ', this.message);
 */
/* const c1 = () => {
    console.log('c1: ', c1);
    return true;
}
const c2 = () => {
    console.log('c2: ', c2);
    return false;
}

console.log('COr', c2() || c1());
console.log('CAnd', c2() && c1());
console.log('CShort', c1() && console.log( 'Short' ));
 */

// Garbage collector
// https://javascript.info/garbage-collection
// Numbers https://javascript.info/number

// Nullish Only in Node >= 14
/* a = undefined;
b = 2;
console.log('a ?? b: ', a ?? b);
a = 3;
b = undefined;
console.log('a ?? b: ', a ?? b);

console.log('a || b: ', 0 || 100);
console.log('a ?? b: ', 0 ?? 100); */

// Iterations

/* index= 0;
for (;;) {
  if (index == 1) {
    break;
  }
  index+= 1;
}
for (index = 0, index2= 2;index == 1; index += 1) {
} */

// Enumerables Vs Iterables
/* const ina = [1, 2, 3] // { 0: 1, 1: 2, 2: 3, length: ''}
const inb = { 2: 1, 3: 2, 4: 3};
// Enumerable
for (let e in ina) {
    console.log('In array', e);
}
for (let e in inb) {
console.log('In object', e);
}
console.log('ina', ina.propertyIsEnumerable(0), ina.propertyIsEnumerable('length'));
console.log(Object.getOwnPropertyNames(ina))
ina.length = 1;
console.log('ina: ', ina); */


// Iterable
// Discussion
// Brevity ?  i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
// One-letter variables ? Nop
// Use abbreviations? Only well known abbreviations
// Reuse variables? Nop
// Boolean? Use isXX, canXX, hasXXX
// Function? Use verbs. Unit functions, not more than its name
// Play with scopes!! Override variables from different scopes
// Functions with side effects. Pure functions!


/* // Objects
let user = new Object(); // "object constructor" syntax
user = {};  // "object literal" syntax
console.log('new Object(): ', new Object() === {}, new Object() == {}); */

/* user = {
    [Symbol(2)]: 3,
    var1: 1,
    var2: 2,
    var3:3
  }
  console.log(user);
  delete user.var1;
  user.var2 = undefined;
  console.log(user)

console.log('var1' in user, 'var2' in user); */


/* user = {
    name: "John",
    age: 30,
  
    sayHi() { 
    // sayHi: function () {
      // "this" is the "current object"
      console.log('name', this.name);
    }
  };

  user.sayHi();  */
/* 
user = { name: "John" };
admin = { name: "Admin" };

function sayHi() {
  console.log('this1: ', this); // Here: If not defined this is the global context
  console.log( this.name );
}
user.f = sayHi;
admin.f = sayHi;


user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)
this.name = 'Name'; // HEre, this is what you define
console.log('this2: ', this);
sayHi(); */

/* user = { // belongs to another code
    name: "John"
  };
  id = Symbol("id");
  user[id] = 1;

  console.log('user: ', user, user[Symbol("id")], JSON.stringify(user)); */
// Symbol.for('id') acts as a global symbol, so this may be used


// Clone
// Object.assign();
// DEep clonse?  _.cloneDeep(obj) Lodash?

// Constructor functions
/* function User(name = 'noname') {
    this.name = name;
    this.isAdmin = false;
    console.log('Called with new', new.target);
}
  
user = new User("Jack");
User('Sparrow');
 */
/* 
user = {
    name: "John",
    money: 1000,
    [Symbol.toPrimitive](hint) {
        console.log(`hint: ${hint}`);
        if (hint === 'number') {
          return this.money;
        }
        if (hint === 'string') {
          return this.name;
        }
        return this.money;
      }
}  
console.log(String(user)); // hint: string -> {name: "John"}
console.log(+user); // hint: number -> 1000
console.log(user + 500); // hint: default -> 1500 */
// toString -> valueOf for “string” hint.
// valueOf -> toString otherwise.
/* 
// Optional chaining
user = {}; // the user happens to be without address
console.log(user.address?.street); // Error!

// If primitives are just a value, why I can call ''.toLowerCase();
a.toLowerCase(); // a es primitiva, crea un objeto String(a).toLowerCase(); --> a
 */
/* a = [];
b = [];
for (i = 0; i < 1000;i+=1) {
  a.push(i)
  b.push(i)
}
console.time('a');
for (i = 0; i < 1000;i+=1) {
a.concat(b); // Take less time
}
console.timeEnd('a');
console.time('a');
for (i = 0; i < 1000;i+=1) {
  [...a, ...b];
}
console.timeEnd('a'); */
/* let arr = [1, 2];

let arrayLike = {
    0: "something",
    1: "else",
    [Symbol.isConcatSpreadable]: true,
    length: 2
  };
  console.log( arr.concat(arrayLike) ); */


// Sort Compare to string by default
// ['1', '15'].sort();
// Reduce ReduceRight. filter.map...iug
// Ho to check if something is an array  ? Array.isArray({})
// Object.keys, values, entries
// Iterators
/* let range = {
    from: 1,
    to: 5
  };
  
  // 1. call to for..of initially calls this
range[Symbol.iterator] = function() {

    // ...it returns the iterator object:
    // 2. Onward, for..of works only with this iterator, asking it for next values
    return {
      current: this.from,
      last: this.to,
  
      // 3. next() is called on each iteration by the for..of loop
      next() {
        // 4. it should return the value as an object {done:.., value :...}
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  };

  for (let num of range) {
    console.log(num); // 1, then 2, 3, 4, 5
  } */


// Map and Set https://javascript.info/map-set What's the deal?

// Dates 0 is January 1st of 1970 UTC+0? Why
// DAtes are always numbers, dates has timezone, dates has autocorrection
// console.log(new Date(2017, 13));

//  Date.now() Vs new Date().getTime()

function diffSubtract(date1, date2) {
    return date2 - date1;
  }
  
  function diffGetTime(date1, date2) {
    return date2.getTime() - date1.getTime();
  }

  function bench(f) {
    let date1 = new Date(0);
    let date2 = new Date();
  
    let start = Date.now();
    for (let i = 0; i < 100000; i++) f(date1, date2);
    return Date.now() - start;
  }

  console.log( 'Total time for diffSubtract: ' + bench(diffSubtract) );
  console.log( 'Total time for diffGetTime: ' + bench(diffGetTime) );
  let time1 = 0;
  let time2 = 0;
  // run bench(upperSlice) and bench(upperLoop) each 10 times alternating
for (let i = 0; i < 10; i++) {
    time1 += bench(diffSubtract);
    time2 += bench(diffGetTime);
  }
  
  console.log( 'Total time for diffSubtract: ' + time1 );
  console.log( 'Total time for diffGetTime: ' + time2 );
  
// for...in used mostly for objects, avoid the use in arrays, can numerate properties that are not frmo the array itself

// WeakMap
let john = { name: "John" };
let weakMap = new WeakMap();
weakMap.set(john, "...");
john = null; // overwrite the reference

// Challenge, how to check this?
// WeakSet

// https://javascript.info