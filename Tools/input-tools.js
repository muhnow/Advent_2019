const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');

module.exports = {
	readInput: readInput
};


function readInput(path) {
	var inputs = fs.readFileSync(path, 'utf-8')
					.split('\n')
					.filter(Boolean);

	inputs = _.map(inputs, function(input) {
		return input.replace('\r', '');
	});

	return inputs;
}
