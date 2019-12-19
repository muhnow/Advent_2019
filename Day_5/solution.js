const _ = require('lodash');
const inputTools = require('../Tools/input-tools.js');
const intCodeTools = require('../Tools/intcode-tools.js');
const assert = require('assert');

var code_list = inputTools.readLines('./input.txt', ',');
code_list = inputTools.parseAllInt(code_list);

intCodeTools.parseOpCodeList(undefined, undefined, code_list);

