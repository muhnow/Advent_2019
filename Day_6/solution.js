const _ = require('lodash');
const inputTools = require('../Tools/input-tools.js');
const assert = require('assert');

var orbitListInput = inputTools.readLines('./input.txt', '\n');
var validOrbits = orbitListInput.every((orbit) => { return orbit.includes(')'); });

assert(validOrbits === true);

// Key: Planet name | Value: List of planets that 
var orbits = {};

function buildOrbits() {
	_.forEach(orbitListInput, (orbit) => {	
		let planets = orbit.split(")");

		if(planets.length < 2) throw new Error("Don't have 2 planets here: " + planets);

		let orbitee = planets[0];
		let orbiter = planets[1];

		if (Object.keys(orbits).includes(orbiter) && !orbits[orbiter].includes(orbitee)) {
			orbits[orbiter].push(orbitee);
		} else {
			orbits[orbiter] = [orbitee];
		}
	});
}

function countOrbits() {
	let totalOrbits = 0;

	_.forEach(Object.keys(orbits), (key) => {
		totalOrbits += countOrbit(key);
	});

	return totalOrbits;
}

function countOrbit(planet) {
	if(orbits[planet] === undefined) return 0;

	return orbits[planet].length + countOrbit(orbits[planet][0]);
}

buildOrbits();

// Part 1 answer
console.log(countOrbits());


