"use strict";

var assert = require('assert');

function fun() { return this; }

assert.equal(fun(), undefined);
assert.equal(fun.call(2), 2);
assert.equal(fun.apply(null), null);
assert.equal(fun.call(undefined), undefined);
assert.equal(fun.bind(true)(), true);