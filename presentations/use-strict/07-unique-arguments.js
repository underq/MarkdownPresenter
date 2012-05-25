var assert = require('assert');

var a = 0, b = 0, c = 0, d = 0, e = 0;

function sum5(a, b, c, b, e) {
    return a+b+c+d+e;
}

assert.equal( 17, sum5(1,5,3,2,6) );