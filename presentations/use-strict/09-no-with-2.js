"use strict";

    var x = 1;
    var obj = { };

    with(obj) {
        x = 2;
    }
    console.log(x);  // 1 or 2?