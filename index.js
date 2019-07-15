"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _argumentResolver = _interopRequireDefault(require("./argumentResolver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var DEFAULT_MAX_WAIT = 60000;
var dependenciesContainer = {};

var register = function register(name, fn) {
  dependenciesContainer[name] = fn;
  return fn;
};

var sleep = function sleep(milliseconds) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, milliseconds);
  });
};

var resolveAsyncFunction =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(fn) {
    var maxWait,
        newArgs,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            maxWait = _args.length > 1 && _args[1] !== undefined ? _args[1] : DEFAULT_MAX_WAIT;
            _context.next = 3;
            return Promise.all((0, _argumentResolver["default"])(fn).map(function (name) {
              return resolveAsyncDependency(name, maxWait);
            }));

          case 3:
            newArgs = _context.sent;
            return _context.abrupt("return", fn.apply(void 0, _toConsumableArray(newArgs)));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function resolveAsyncFunction(_x) {
    return _ref.apply(this, arguments);
  };
}();

var resolveAsyncDependency =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(name) {
    var maxWait,
        count,
        pause,
        dependency,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            maxWait = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : DEFAULT_MAX_WAIT;
            count = 0;
            pause = 100;

          case 3:
            dependency = dependenciesContainer[name];

            if (!(dependency === undefined)) {
              _context2.next = 9;
              break;
            }

            _context2.next = 7;
            return sleep(pause);

          case 7:
            _context2.next = 10;
            break;

          case 9:
            return _context2.abrupt("return", dependency);

          case 10:
            count++;

          case 11:
            if (count <= maxWait / pause) {
              _context2.next = 3;
              break;
            }

          case 12:
            throw new Error("Undefined dependency '".concat(name, "'."));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function resolveAsyncDependency(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var resolve =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(arg) {
    var maxWait,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            maxWait = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : DEFAULT_MAX_WAIT;

            if (!(typeof arg === 'function')) {
              _context3.next = 5;
              break;
            }

            _context3.next = 4;
            return resolveAsyncFunction(arg, maxWait);

          case 4:
            return _context3.abrupt("return", _context3.sent);

          case 5:
            _context3.next = 7;
            return resolveAsyncDependency(arg, maxWait);

          case 7:
            return _context3.abrupt("return", _context3.sent);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function resolve(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var clear = function clear() {
  dependenciesContainer = {};
};

var _default = {
  register: register,
  resolve: resolve,
  clear: clear
};
exports["default"] = _default;