const assert = require('assert').strict;

function test(strings, ...parameters) {
  let result= strings.reduce((p, a, i) => {
      let add = '';
      if (i === 0) {
          add = parameters[0].name;
        } else if (parameters.length > i) {
            add = `"${parameters[i]}"`;
        }
        return p + a + add;
    }, '').replace(/\n/g, ' ');
  let expectedResult = parameters.pop();
  try {
    const operation = parameters.shift()
    assert(operation(...parameters) === expectedResult);
    result = '[-] ' + result;
  } catch {
    result = '[X] ' + result;
  }
  console.log(result);
}

function sum(a, b) {
    return a + b;
}

test`
Given a ${sum} operation
When ${2} and ${4} are the parameters
Then it should return ${6}
`;