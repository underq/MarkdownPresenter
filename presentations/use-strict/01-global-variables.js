"use strict";

function foo (managerPolicyName) {
    if (!managerPolicyName) {
	managerPolcyName = "some default";
    }

    console.log("Results:", managerPolicyName);
}

foo();