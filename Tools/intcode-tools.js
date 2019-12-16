const _ = require('lodash');
const inputTools = require('../Tools/input-tools.js');
const assert = require('assert');

module.exports = {
	parseOpCode: parseOpCode,
	parseOpCodeList: parseOpCodeList,
}

function parseOpCodeList(noun, verb, codeList) {
	var copyList = codeList.slice()
	copyList[1] = noun;
	copyList[2] = verb;

	for (var index = 0; index < codeList.length; index++) {
		var curr_code = copyList[index];

		if (curr_code === 99) {
			break;
		}

		copyList = parseOpCode(curr_code, index, copyList).slice();

		index = movePointer(code, index);
	}

	return copyList;
}

/*
* code     : current op code we are parsing
* index    : current index within the given list of codes
* codeList : entire list of codes we are executing over 
*/
function parseOpCode(code, index, codeList) {
	switch(code) {
		case 1:
			codeList = addOrMult(codeList, index, true);
			break;
		case 2:
			codeList = addOrMult(codeList, index, false);
			break;
		default:
			break;
	}

	return codeList;
}

/* --------------------- Private Functions --------------------- */ 

function movePointer(code, index) {
	switch(code) {
		case 1:
			return index += 3;
		case 2:
			return index += 3;
		default:
			return index;
	}
}

function addOrMult(codeList, index, isAdd) {
	first_address = codeList[index + 1];
	second_address = codeList[index + 2];
	storage_address = codeList[index + 3];

	first_value = codeList[first_address];
	second_value = codeList[second_address];

	new_value = isAdd ? first_value + second_value : first_value * second_value;

	codeList[storage_address] = new_value;

	return codeList;
}