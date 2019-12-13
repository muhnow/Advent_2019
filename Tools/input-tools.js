const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');

module.exports = {
	readLines : readLines,
	parseAllInt: parseAllInt,
	generateSeperator: generateSeperator
};


// Generates a RegEx based on a given list of seperators
function generateSeperator(seperators) {
	return new RegExp('[' + seperators.join('') + ']', 'g');
}

// Reads the file at the given path and splits up the contents based
// on the provided seperator
function readLines(path, seperator) {
	var inputs = fs.readFileSync(path, 'utf-8')
					.split(seperator)
					.filter(Boolean);

	// gets rid of any loose return characters
	inputs = _.map(inputs, function(input) {
		return input.replace('\r', '');
	});

	return inputs;
}

// Takes a list and parses the contents to integers
function parseAllInt(list) {
	var newList = [];

	_.forEach(list, function(item) {
		var newItem = parseInt(item);

		if(!isNaN(newItem)) {
			newList.push(newItem);
		} else {
			throw "Error parsing:  '" + item + "'. Invalid data type.";
		}
	});

	return newList;
}
