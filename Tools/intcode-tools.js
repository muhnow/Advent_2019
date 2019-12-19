const _ = require('lodash');
const inputTools = require('./input-tools.js');
const assert = require('assert');

module.exports = {
	parseOpCode: parseOpCode,
	parseOpCodeList: parseOpCodeList,
}

function parseOpCodeList(noun, verb, codeList) {
	var copyList = codeList.slice();

	if(noun !== undefined && verb !== undefined) {
		copyList[1] = noun;
		copyList[2] = verb;
	}
	
	for (var index = 0; index < codeList.length; index++) {
		var curr_code = copyList[index];
		
		if (curr_code === 99) {
			console.log("Program halting ...");
			break;
		}

		if (curr_code > 100) {
			var actualCode = parseInt(curr_code.toString().slice(Math.max(curr_code.toString().length - 2, 1)));
		}

		if (actualCode === 5 || actualCode === 6 || curr_code === 5 || curr_code === 6) {
			index = parseOpCode(curr_code, index, copyList);
		} else {
			copyList = parseOpCode(curr_code, index, copyList).slice();
			index = movePointer(curr_code, index);
		}

		actualCode = 0;
	}

	return copyList;
}

/*
* code     : current op code we are parsing
* index    : current index within the given list of codes
* codeList : entire list of codes we are executing over 
*/
function parseOpCode(code, index, codeList) {
	// mode value of 0 : position mode
	// mode value of 1 : immediate mode
	var options = {
		firstMode: 0,
		secondMode: 0,
		thirdMode: 0
	}

	if(code > 100) {
		code = code.toString();

		options.firstMode = parseInt(code[code.length % 3]);
		options.secondMode = code.length > 3 ? parseInt(code[code.length % 4]) : 0;  
		options.thirdMode = code.length > 4 ? 1 : 0;

		code = parseInt(code.slice(Math.max(code.length - 2, 1)));
		
	}
	

	switch(code) {
		case 1:
			codeList = addOrMult(codeList, index, true, options);
			break;
		case 2:
			codeList = addOrMult(codeList, index, false, options);
			break;
		case 3:
			codeList = input(codeList, index, options);
			break;
		case 4:
			output(codeList, index, options);
			break;
		case 5:
			index = jump(codeList, index, options, true);
			return index;
		case 6:
			index = jump(codeList, index, options, false);
			return index;
		case 7:
			codeList = compare(codeList, index, options);
			break;
		case 8:
			codeList = equals(codeList, index, options);
			break;
		default:
			break;
	}

	return codeList;
}

/* --------------------- Private Functions --------------------- */ 

function movePointer(code, index) {
	if(code > 100) {
		code = code.toString();

		code = parseInt(code.slice(Math.max(code.length - 2, 1)));
	}

	switch(code) {
		case 1:
			return index += 3;
		case 2:
			return index += 3;
		case 3:
			return index += 1;
		case 4:
			return index += 1;
		case 5:
			// instruction pointer is handled elsewhere
			return index;
		case 6:
			// instruction pointer is handled elsewhere
			return index;
		case 7:
			return index += 3;
		case 8:
			return index += 3;
		default:
			return index;
	}
}

function input(codeList, index) {
	var userInput = parseInt(inputTools.readInput());

	if(userInput !== NaN) {
		codeList[codeList[index+1]] = userInput;
	}

	return codeList;
}

function output(codeList, index, options) {
	index = options.firstMode ? index + 1 : codeList[index + 1];

	console.log(codeList[index]);
}

function addOrMult(codeList, index, isAdd, options) {
	var first_address = options.firstMode ? index + 1: codeList[index + 1];
	var second_address = options.secondMode ? index + 2 : codeList[index + 2];
	var storage_address = options.thirdMode ? index + 3 : codeList[index + 3];

	var first_value = codeList[first_address];
	var second_value = codeList[second_address];

	var new_value = isAdd ? first_value + second_value : first_value * second_value;

	codeList[storage_address] = new_value;

	return codeList;
}

function jump(codeList, index, options, jumpIfTrue) {
	var first_address = options.firstMode ? index + 1: codeList[index + 1];
	var second_address = options.secondMode ? index + 2 : codeList[index + 2];

	var first_value = codeList[first_address];
	var second_value = codeList[second_address];

	if (jumpIfTrue && first_value !== 0) {
		return second_value - 1;
	} else if (!jumpIfTrue && first_value === 0) {
		return second_value - 1;
	} else {
		return index+2;
	}
}

function compare(codeList, index, options) {
	var first_address = options.firstMode ? index + 1: codeList[index + 1];
	var second_address = options.secondMode ? index + 2 : codeList[index + 2];
	var storage_address = options.thirdMode ? index + 3 : codeList[index + 3];

	var first_value = codeList[first_address];
	var second_value = codeList[second_address];

	codeList[storage_address] = first_value < second_value ? 1 : 0;

	return codeList;
}

function equals(codeList, index, options) {
	var first_address = options.firstMode ? index + 1: codeList[index + 1];
	var second_address = options.secondMode ? index + 2 : codeList[index + 2];
	var storage_address = options.thirdMode ? index + 3 : codeList[index + 3];

	var first_value = codeList[first_address];
	var second_value = codeList[second_address];

	codeList[storage_address] = first_value === second_value ? 1 : 0;

	return codeList;
}