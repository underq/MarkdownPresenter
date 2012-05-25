"use strict";

var obj = { 
    get x() { 
	return 17; 
    }
};
obj.x = 5;
console.log(obj.x);
