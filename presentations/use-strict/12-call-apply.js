var foo = 1;

var obj1 = {
  foo: 2,
  bar: function(a, b, c) {
          return a+b+c + this.foo;
  }
};

var obj2 = {
  foo: 3,
  bar: function(a, b, c) {
          return obj1.bar.call(this, a, b, c);
  }
}

console.log( obj2.bar(1,2,3) );