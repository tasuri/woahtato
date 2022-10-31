"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Position = function Position(x, y) {
  var xVel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var yVel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  _classCallCheck(this, Position);

  this.x = x;
  this.y = y;
  this.xVel = xVel;
  this.yVel = yVel;
};

exports["default"] = Position;