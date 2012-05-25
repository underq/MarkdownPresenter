function fun(a, b)
{
  var v = 12;
  return arguments.caller; // throws a TypeError
}

function foo() {
    console.log( fun(1, 2) ); // doesn't expose v (or a or b)
}

foo();