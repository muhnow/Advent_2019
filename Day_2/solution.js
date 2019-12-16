const _ = require('lodash');
const inputTools = require('../Tools/input-tools.js');
const intCodeTools = require('../Tools/intcode-tools.js');
const assert = require('assert');

var code_list = inputTools.readLines('./input.txt', ',');
code_list = inputTools.parseAllInt(code_list);

/* Part 1 Answer Output */
console.log(intCodeTools.parseOpCodeList(12, 2, code_list)[0]);

/* Part 2 Solution */
for(var noun = 0; noun <= 99; noun++) {
	for(var verb = 0; verb <= 99; verb++) {
		var opResult = intCodeTools.parseOpCodeList(noun, verb, code_list);

		if(opResult[0] === 19690720) {
			console.log("Desired memory met. Noun : " + noun + " | Verb : " + verb);
		}
	}
}
