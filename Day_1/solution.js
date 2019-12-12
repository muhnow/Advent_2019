const inputTools = require('../Tools/input-tools.js');
const _ = require('lodash');
const assert = require('assert');

var inputs = inputTools.readLines('./input.txt', '\n');

console.log(inputs);

/* Part 1 */
var mass_sum = 0;

_.forEach(inputs, function(input) {
	mass_sum += Math.floor((input / 3)) - 2;
});

console.log(mass_sum);


/* Part 2 */
var new_mass_sum = 0;

function findFuel(mass) {
	var fuel = Math.floor((mass / 3)) - 2;

	if (fuel <= 0) {
		return 0;
	}

	return fuel + findFuel(fuel);
}


_.forEach(inputs, function(input) {
	new_mass_sum += findFuel(input);
});

// Given test cases
assert(findFuel(14) === 2);
assert(findFuel(1969) === 966);
assert(findFuel(100756) === 50346);

console.log(new_mass_sum);