const _ = require('lodash');
const inputTools = require('../Tools/input-tools.js');
const assert = require('assert');

var code_list = inputTools.readLines('./input.txt', ',');
code_list = inputTools.parseAllInt(code_list);


function parseOpCodeList(noun, verb) {
	copy_list = code_list.slice()
	copy_list[1] = noun;
	copy_list[2] = verb;

	for (var index = 0; index < code_list.length; index++) {
		var curr_code = copy_list[index];

		if (curr_code === 99) {
			break;
		}

		copy_list = parseOpCode(curr_code, index, copy_list).slice();

		index += (curr_code === 1 || curr_code === 2) ? 3 : 0;
	}

	return copy_list;
}


/*
* code     : current op code we are parsing
* index    : current index within the given list of codes
* codeList : entire list of codes we are executing over 
*/
function parseOpCode(code, index, codeList) {
	if (code !== 1 && code !== 2) return codeList; 

	first_address = codeList[index + 1];
	second_address = codeList[index + 2];
	storage_address = codeList[index + 3];

	first_value = codeList[first_address];
	second_value = codeList[second_address];

	new_value = code === 1 ? first_value + second_value : first_value * second_value;

	codeList[storage_address] = new_value;

	return codeList;
}

/* Part 1 Answer Output */
console.log(parseOpCodeList(12, 2)[0]);

/* Part 2 Solution */
for(var noun = 0; noun <= 99; noun++) {
	for(var verb = 0; verb <= 99; verb++) {
		var opResult = parseOpCodeList(noun, verb);

		if(opResult[0] === 19690720) {
			console.log("Desired memory met. Noun : " + noun + " | Verb : " + verb);
		}
	}
}
