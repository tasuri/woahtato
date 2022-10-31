"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = _interopRequireDefault(require("../config.js"));

var _entity = _interopRequireDefault(require("./entity.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Player =
/*#__PURE__*/
function (_Entity) {
  _inherits(Player, _Entity);

  function Player(r, c) {
    var _this;

    _classCallCheck(this, Player);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Player).call(this, 'player', 0, 0));
    _this.maxVel = 3;
    _this.size = r;
    _this.color = c;
    _this.x = _config["default"].arenaWidth / 2 - _this.size / 2;
    _this.y = _config["default"].arenaHeight / 2 - _this.size / 2;
    _this.ctx = undefined;
    _this.shotRange = 30;
    _this.tickRate = 0;
    _this.shotRangeVisual;
    _this.moveUp = false;
    _this.moveDown = false;
    _this.moveLeft = false;
    _this.moveRight = false;
    document.addEventListener('keyup', function (e) {
      _this.moveHandler(e, false);
    });
    document.addEventListener('keydown', function (e) {
      _this.moveHandler(e, true);
    });
    return _this;
  }

  _createClass(Player, [{
    key: "moveHandler",
    value: function moveHandler(e, active) {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (active && !this.moveUp) {
            this.moveUp = true;
          } else if (!active) {
            this.moveUp = false;
          }

          break;

        case 'ArrowDown':
        case 's':
          if (active && !this.moveDown) {
            this.moveDown = true;
          } else if (!active) {
            this.moveDown = false;
          }

          break;

        case 'ArrowLeft':
        case 'a':
          if (active && !this.moveLeft) {
            this.moveLeft = true;
          } else if (!active) {
            this.moveLeft = false;
          }

          break;

        case 'ArrowRight':
        case 'd':
          if (active && !this.moveRight) {
            this.moveRight = true;
          } else if (!active) {
            this.moveRight = false;
          }

          break;
      }
    }
  }, {
    key: "checkMovement",
    value: function checkMovement() {
      if (this.moveUp === true) {
        if (this.yVel > -this.maxVel) {
          this.yVel -= 1;
        }
      }

      if (this.moveDown === true) {
        if (this.yVel < this.maxVel) {
          this.yVel += 1;
        }
      }

      if (this.moveLeft === true) {
        if (this.xVel > -this.maxVel) {
          this.xVel -= 1;
        }
      }

      if (this.moveRight === true) {
        if (this.xVel < this.maxVel) {
          this.xVel += 1;
        }
      }

      if (!this.moveUp && !this.moveDown) {
        if (this.yVel > 0) {
          this.yVel -= 1;
        } else if (this.yVel < 0) {
          this.yVel += 1;
        }
      }

      if (!this.moveLeft && !this.moveRight) {
        if (this.xVel > 0) {
          this.xVel -= 1;
        } else if (this.xVel < 0) {
          this.xVel += 1;
        }
      }
    }
  }, {
    key: "updatePosition",
    value: function updatePosition(arenaWidth, arenaHeight) {
      this.checkMovement();
      this.y = this.y + this.yVel;
      this.x = this.x + this.xVel;

      if (this.y <= 0 + this.size) {
        this.y = 0 + this.size;
      } else if (this.y >= arenaHeight - this.size) {
        this.y = arenaHeight - this.size;
      }

      if (this.x <= 0 + this.size) {
        this.x = 0 + this.size;
      } else if (this.x >= arenaWidth - this.size) {
        this.x = arenaWidth - this.size;
      }
    }
  }, {
    key: "drawShotRange",
    value: function drawShotRange() {
      this.ctx.beginPath();
      this.ctx.strokeStyle = '#ff0000';
      this.ctx.fillStyle = '#ff000009';
      this.ctx.arc(this.x, this.y, this.shotRange, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }, {
    key: "detectEnemiesInRange",
    value: function detectEnemiesInRange(enemy) {
      if (Math.sqrt((enemy.x - this.x) * (enemy.x - this.x) + (enemy.y - this.y) * (enemy.y - this.y)) <= this.shotRange + enemy.size) {
        enemy.setInRange = true;
        console.log('in Range');
      } else {
        enemy.setInRange = false;
        console.log('not in Range');
      }
    }
  }, {
    key: "setShotRange",
    set: function set(range) {
      if (range > 0) {
        this.shotRange = range;
      }
    }
  }]);

  return Player;
}(_entity["default"]);

exports["default"] = Player;