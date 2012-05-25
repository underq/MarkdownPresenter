Strict JavaScript
===============

Why we should always `use strict`

by Howard Abrams

>> Hi, I'm Howard Abrams, and wanted to know the changes I could
>> expect if I turned on the `use strict` feature.  I guess I'm not
>> alone, so I put together this presentation.
>>
>> This is not just an *overview*, as it goes into a bit of details.
>> 
>> I assume the reader is very familiar with JavaScript, but not with the
>> new ECMAScript, version 5 standard, or the `use strict` feature.

!

What's This?
------------

We are now starting to get the following errors from running `jshint`:

    routes/q-example.js: line 30, col 5, 
               Missing "use strict" statement.

Guess we should look into this feature...

>> What do you mean you aren't using the [jshint][4] program? It is a
>> fantatic way of noticing problems or issues with your
>> application. You should really follow all of its advice, so that
>> when something shows up, you'll notice it.
>>
>> Perhaps you add it as a hook to your Git checkins or part of your
>> automated build process that compresses your JavaScript.

!

What is it?
-----------

According to [Jeff Walden][2]:

> Strict mode is arguably the most interesting new feature in ECMAScript 5.

**Note:** It changes the *behavior*!

(Oh, ECMAScript == JavaScript)

>> Strict mode isn’t just a subset: it intentionally has different semantics from normal code.
>> 
>> This is why I really just didn't want to *turn it on* in production
>> without first understanding what I was getting myself into.

!

Why strict?
---------

Strict mode helps out in a couple ways:

  * Catches some common coding bloopers.
  * Prevents relatively "unsafe" actions.
  * Disables features that are confusing.
  * Allows engines to optimize JavaScript.

See [John Resig's article][1] for details.

>> It *prevents* unsafe actions by throwing errors when something bad
>> is *caught*.
>> 
>> Throwing errors is a good thing as it allows the programmer to
>> catch the problem before a user discovers it.

!

Find the Bug
------------

    function foo (managerPolicyName) {
        if (!managerPolicyName) {
            managerPolcyName = "some default";
        }
        console.log("Results:", managerPolicyName);
    }
    foo();

Results: `undefined`   Why?

!

Fix the Bug
-----------

Turning on strict mode:

    "use strict";  // Notice this is a string!?
    function foo (managerPolicyName) {   // ...

Returns:

    managerPolcyName = "some default";
              ^
    ReferenceError: managerPolcyName is not defined
        at foo (global-variables.js:5:19)

!

Convert Mistake to Error
----------------------------

1. Can't accidentally create global variables
2. Bad assignments now throw an exception
3. Can't `delete` undeletable properties
4. Object property names must be unique
5. Function argument names be unique
6. Can't use octal syntax

See [this article][2], but I'll go over each of these.

>> Some assignments would fail, but fail *silently*. Now, these will throw an exception instead of continuing.

!

Ignored Assignments
------------

How would this code behave with and without strict mode?

    var obj = { 
        get x() { 
            return 17; 
        }
    };
    obj.x = 5;
    console.log(obj.x);

!

Ignored Assignments, 2
-------------------

Violations to the `preventExtensions` function are now
not ignored, they throw an error:

    var fixed = {};
    Object.preventExtensions(fixed);
    fixed.newProp = "ohai";

!

Bad Deletes aren't Ignored
-------------------

Now, this is a bad idea:

    delete Object.prototype;

Most JS engines just ignore this code.

>> Sure, you would never do anything as stupid as this, right?
>> But stupid behavior is normally not tolerated in a computer language.
>> However, since JavaScript was a language for the masses, they decided
>> to just ignore bad code like this instead of stopping a page from executing.

!

Unique Object Properties
------------------------

Each property, when defining an object, *should be* unique:

    var wine = {
        name: "Barefoot Red",
        age: "cellar",
        classification: "chianti",
        year: 2002,
        age: 8
    }

>> Without out a compiler, many *dynamic languages* suffer from typos.
>> Here, I meant to have two different properties, `age` and `aged`,
>> but a simple typo made this unclear.

!

Unique Object Properties, 2
------------------------

Use `customer.age` or `customer.age()`!?

    var customer = {
      name: "Captain Kangaroo",
      age: 84,
      birthday: new Date("June 27, 1927"),
      place: "Lynbrook, New York",
      age: function() { 
        return new Date().getFullYear() - 
            this.birthday.getFullYear(); 
      }
    }


>> A property and a function are defined similarly, but called differently.
>> Normally, this is not an issue, but not unless you did both.
>>
>> In this case, `customer.age` returns a function. Not what you would expect.

!

Unique Argument Names
---------------------

Assuming a global variable `d` defined elsewhere, this is clearly a typo:

    function sum5(a, b, c, b, e) {
        return a+b+c+d+e;
    }
    sum5(1,5,3,2,6);  // Doesn't returns 17

>> While `jshint` warns of this feature, the `use strict` throws an
>> error during execution, so you can use both.

!

No More Octal
-------------

Some think a `0` in front of a number doesn't change the value of the number:

	var sum = 015 +
	          197 +
	          142;

>> Since octal numbers behave differently than what many JavaScript
>> programmers expect, the `strict` mode just removes them, and throws
>> an error.

!

Clear Variable Use
------------------

1. No more `with`
2. New variables created by `strict mode` in an `eval` are now local to that code only
3. Strict mode forbids deleting plain names.

!

With Can be Confusing
-------------------

    var x = 1;
    var obj = { x: 2 };

    with(obj) {
        console.log(x);  // 1 or 2?
    }

>> Of course, this is `2`, but it is unclear.

!

With Can be Harmful
-------------------

    var x = 1;
    var obj = { };

    with(obj) {
        x = 2;
    }
    console.log(x);  // 1 or 2?

>> In this case, since `obj` did not have an `x`, the `x` inside the `with` gets assigned to the global variable `x`.
>> Not only is this unintended, but it is a bug.

!

Is `with` ever Good?
-------------------

I like `with` instead of `assert.equal`:

    with(assert) {
        equal(5, sum(2,4) );
        equal(3, sum(3) );
        equal(0, sum() );
        equal(6, sum(1,2,3);
    }

>> But the confusion just isn't worth the effort for `with`. Besides, putting an `assert.equal` isn't that bad.

!

Eval Code
---------

Evaluated code is dangerous, but useful.  
However, it shouldn't affect your code:

    var x = 17;
    var evalX = eval("'use strict'; var x = 42; x");
    assert(x === 17);
    assert(evalX === 42);

>> Let's suppose you wanted to write some graphic software, but
>> instead of a complicated equation GUI, or even writing a *parser*,
>> you figured that you could just take a JavaScript equation from the
>> user, and let JavaScript do the parsing work.
>>
>> Great idea until a user chose a variable that you were using...

!

Correct `eval`
-------------

Either prepend `"use strict";` to eval string.

Or place `"use strict";` in your code before:

    function evaluate(str) {
       "use strict";
       return eval(str);
    }

!

Keywords aren't Variables
--------------------------

    eval = 17;
    arguments++;
    ++eval;
    var obj = { set p(arguments) { } };
    var eval;
    try { } catch (arguments) { }
    function x(eval) { }
    function arguments() { }
    var y = function eval() { };

>> These should all return errors, and under `strict mode`, they do.

!

Named or Numeric Arguments
--------------------------

    function f(a) {
        a = 42;
        console.log(a); // 42
        console.log(arguments[0]); //??
    }

>> Without `strict` mode, both lines will return `42`, since `a` and
>> `arguments[0]` point to the same variable.
>>
>> In `strict` mode, `arguments[0]` gets the original value passed
>> into the function.

!

What is `arguments.callee`?
----------------

    [1,2,3,4,5].map(function (n) {  
      if (n <= 1)  
         return 1;  
      return n * arguments.callee(n - 1);
    }); 

>> Function recursion is wonderful. But how do you do it with an *anonymous function*?
>> You use the `arguments.callee` property. However, this is [a bad idea][3]:

!

Resolving `arguments.callee`
----------------------------

Simply name your functions, and you don't need it:

    [1,2,3,4,5].map(function factorial (n) {
      if (n <= 1)  
         return 1;  
      return n * factorial(n-1)*n;  
    }); 

>> So `arguments.callee` is forbidden in strict mode, but if naming your functions not only increases readability, but it also

!

Delete is Confusing
-------------------

The `delete` command is *only* to remove properties from an object.

    var x = 2;
    delete x;

Was ignored, now it throws an error.

>> Some people thought the code on this page was possible. 
>> Some of the confusion came from a strange behavior of the Firebug interpreter, and this made it into some JavaScript books.
>> 
>> Consequently, Crockford calls this a *bad part* and recommends against using it.

!

“Securing” JavaScript
--------------------

Strict mode makes it easier to write “secure” JavaScript.

1. Doesn't box the `this` variable.
2. Can't “walk” stack with a `caller`.
3. No access to a function call’s variables

!

Using `call` and `apply`
----------------------

    var obj1 = {
      foo: 6,
      bar: function(a, b, c) {
          return a+b+c + this.foo;
      }
    };
    var obj2 = {
      foo: 10,
      bar: function(a, b, c) {
             return obj1.bar.apply(obj2, a, b, c);
      }
    }

>> This is a silly and very contrived example to remind you that the `.apply()` method can call a function with a new `this` variable.
>> This is how it is supposed to be used. But what is the first argument to the `.apply()` method is `null` or blank?

!

The `this` is Boxed
----------------------

  * Currently, `this` is always an object.
  * This is called *automatic boxing* of `this`.
  * If `null` is first argument, `this` is the global scope.

But:

  * Automatic boxing is a performance cost
  * Exposing global object is a security hazard

!

Now `this` is Left Unchanged
----------------------------

    "use strict";
    function fun() { return this; }
    assert(fun() === undefined);
    assert(fun.call(2) === 2);
    assert(fun.apply(null) === null);
    assert(fun.call(undefined) === undefined);
    assert(fun.bind(true)() === true);

>> Without the `use strict`, these asserts would fail, as some `this` object is created and passed in if not given.

!

The `caller` was useful
----------------------

    function logger() {
      console.log("%s: %s", 
		  logging.caller.name, 
		  util.format.apply(this, arguments) );
    }
    function other() {
      logger("foo %d bar", 4);
    }

>> I often create special logger modules to given my applications a consistent logging interface.
>> However, the `use strict` forbids this sort of access.

!

New Reserved Words
------------------

  * `implements`
  * `interface`
  * `let`
  * `package`
  * `private`
  * `protected`
  * `public`
  * `static`
  * `yield`

>> Future ECMAScript standards may or may not use these keywords, but
>> we don't want to break current code that uses them as
>> variables. So, strict mode will warn you about them.

!

Function Definitions
--------------------

Function definitions *inside* `if` and `for` blocks are strange:

    if (true) {
      function f() { } // !?
      f( );
    }

>> In normal browsers, functions can be defined *everywhere*, but
>> different browsers deal with the `this` variable differently in
>> these cases.  Besides, it makes the code strange, and that's not
>> good.
>> 
>> *Note:* Function definitions *within* other functions or objects are just fine.

!


On the Browser
--------------

Modern browsers are now supporting this (IE won't until 10). You can mix them:

    // Non-strict code...

    (function(){
      "use strict";
      // Strict section...
    })();
    
    // Non-strict code... 

!

Summary
=======

  * Add `"use strict";`
  * Before any *statements*
  * Can be after comments
  * Use `jshint` too!

  [1]: http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
  [2]: http://hacks.mozilla.org/2011/01/ecmascript-5-strict-mode-in-firefox-4/
  [3]: https://developer.mozilla.org/en/JavaScript/Reference/Functions_and_function_scope/arguments/callee
  [4]: http://www.jshint.com/