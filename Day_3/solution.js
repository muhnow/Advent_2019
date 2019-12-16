const inputTools = require('../Tools/input-tools.js');
const _ = require('lodash');
const assert = require('assert');

const seperators = [',', '\n'];

var wires = inputTools.readLines('./input.txt', inputTools.generateSeperator(seperators));

// Custom splitting based on my input. I didn't want to write custom logic in my input tools
// so I just wrote it here and split the wire based on what I saw
var wire1 = wires.slice(0, wires.indexOf('L831') + 1);
var wire2 = wires.slice(wires.indexOf('L831') + 1, wires.length);

var wire3 = ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"];
var wire4 = ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"];

var wire5 = ["R98", "U47", "R26", "D63", "R33", "U87", "L62", "D20", "R33", "U53", "R51"];
var wire6 = ["U98", "R91", "D20", "R16", "D67", "R40", "U7", "R15", "U6", "R7"];

var wire7 = ["R8", "U5", "L5", "D3"];
var wire8 = ["U7", "R6", "D4", "L4"];

var wirePaths = [];
var intersections = [];

// starting the central port at (150, 150)
var currentPoint = {x: 150, y:150};

function resetState() {
	wirePaths = [];
	intersections = [];
	currentPoint = {x: 150, y: 150};
}

function findClosestIntersectionImproved(firstWire, secondWire) {
	resetState();

	var wirePath1 = traceWireImproved(firstWire, []);

	currentPoint = {x: 150, y: 150};

	var wirePath2 = traceWireImproved(secondWire, []);

	//console.log(wirePath1);
	//console.log(wirePath2);

	intersections = _.intersectionWith(wirePath1, wirePath2, function(w1, w2) {
		return w1.x === w2.x && w1.y === w2.y;
	});

	//console.log(intersections);


	var closestDistance = 0;
	var closestIntersection;

	_.forEach(intersections, function(intersection) {
		var currDistance = Math.abs(150 - intersection.x) + Math.abs(150 - intersection.y);

		if (closestDistance == 0 || currDistance < closestDistance) {
			closestDistance = currDistance;
			closestIntersection = intersection;
		}
	});

	return {intersection: closestIntersection, distance: closestDistance};
}

function traceWireImproved(wire, wirePath) {
	_.forEach(wire, function(move) {
		var direction = move[0];
		var numOfSteps = parseInt(move.substring(1, move.length));

		//console.log(move);

		for(var step = 0; step < numOfSteps; step++) {
			var x = currentPoint.x;
			var y = currentPoint.y;

			wirePath.push({x: x, y: y});

			switch(direction) {
				case "R":
					currentPoint.x += 1;
					break;
				case "L":
					currentPoint.x += -1;
					break;
				case "U":
					currentPoint.y += 1;
					break;
				case "D":
					currentPoint.y += -1;
					break;
				default:
					console.log("default");
					break;
			}

			

		}
	});

	//console.log(wirePath);
	return wirePath;
}

console.time('Improved 1/2');
console.log(findClosestIntersectionImproved(wire1, wire2));
console.timeEnd('Improved 1/2');
