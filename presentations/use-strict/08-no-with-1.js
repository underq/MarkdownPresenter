    var x = 1;
    var obj = { x: 2 };

    with(obj) {
        console.log(x);
    }