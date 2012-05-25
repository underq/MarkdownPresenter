"use strict";

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
console.log(customer.age(), "or", customer.age);

// BTW: This always failed, 
/*
var customer2 = {
    name: "Captain Kangaroo",
    age:  85,
    birthday: new Date("June 27, 1927"),
    place: "Lynbrook, New York",
    get age() { return new Date().getFullYear() - this.birthday.getFullYear(); }
}

console.log(customer.age);
*/