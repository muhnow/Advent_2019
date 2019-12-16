const _ = require('lodash');
const assert = require('assert');

var lowerRange = 138241;
var upperRange = 674034;

function findValidPasswords() {
	var validPasswordCount = 0;

	for(var x = lowerRange; x < upperRange; x++) {
		if (isValidPassword(x.toString())) {
			validPasswordCount++;
		}
	}

	return validPasswordCount;
}

function isValidPassword(pass) {
	return hasEqualAdjacentDigits(pass) && hasAscendingDigits(pass);
}

function hasEqualAdjacentDigits(pass) {
	var digitsToIgnore = [];
	var groupDigit;

	for(var i = 0; i < pass.length - 1; i++) {
		if (digitsToIgnore.includes(pass[i])) {
			continue;
		}

		if(pass[i] === pass[i+1]) {
			if(groupDigit === undefined) {
				groupDigit = pass[i];
			}
			else {
				digitsToIgnore.push(pass[i]);
				groupDigit = undefined;
			}

			if(groupDigit !== undefined && i === pass.length - 2) return true;
		} else {
			if(groupDigit !== undefined) return true;
		}
	}

	return false;
}

function hasAscendingDigits(pass) {
	for(var i = 0; i < pass.length - 1; i++) {
		if(pass[i] > pass[i+1]) return false;
	}

	return true;
}


assert(hasEqualAdjacentDigits("11111") === false)
assert(hasEqualAdjacentDigits("123445") === true)
assert(hasEqualAdjacentDigits("1543") === false)

assert(hasEqualAdjacentDigits('111233') === true)
assert(hasEqualAdjacentDigits('1112345') === false)
assert(hasEqualAdjacentDigits('123334556') === true)

assert(hasAscendingDigits("123456") === true);
assert(hasAscendingDigits("12543") === false);
assert(hasAscendingDigits("15689") === true);

console.log(findValidPasswords());