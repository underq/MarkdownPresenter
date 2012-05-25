"use strict";

function f(a) {
    a = 42;
    console.log(a, arguments[0]);
}
f(3);