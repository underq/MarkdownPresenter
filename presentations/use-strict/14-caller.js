"use strict";

var util = require('util');

function logging() {
    console.log( "%s: %s", 
		 logging.caller.name, 
		 util.format.apply(this, arguments) );
}

function other() {
    logging("foo %d bar", 4);
}

other();