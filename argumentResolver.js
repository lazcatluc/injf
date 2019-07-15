"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var FN_ARGS_FUNCTION = /^function\s*[^(]*\(\s*([^)]*)\)/m;
var FN_ARGS_LAMBDA = /^\s*\(?(.*?)\)?\s*=>/m;
var FN_ARG_SPLIT = /,/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

var findArguments = function findArguments(fnSourceCode) {
  var matches = fnSourceCode.match(FN_ARGS_FUNCTION);
  return matches ? matches[1] : fnSourceCode.match(FN_ARGS_LAMBDA)[1];
};

var _default = function _default(fn) {
  var fnSourceCode = fn.toString();
  fnSourceCode = fnSourceCode.replace(STRIP_COMMENTS, '');
  return findArguments(fnSourceCode).split(FN_ARG_SPLIT).map(function (argName) {
    return argName.trim();
  });
};

exports["default"] = _default;