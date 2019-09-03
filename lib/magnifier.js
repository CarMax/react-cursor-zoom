"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Magnifier =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Magnifier, _React$Component);

  function Magnifier() {
    var _this;

    _classCallCheck(this, Magnifier);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Magnifier).call(this));
    _this._handleClick = _this._handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Magnifier, [{
    key: "_handleClick",
    value: function _handleClick() {
      if (this.props.onClick) {
        this.props.onClick();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      var halfSizeY = props.size / 2;
      var halfSizeX = (props.size + props.size * .4) / 2;
      var magX = props.zoomImage.width / props.smallImage.width;
      var magY = props.zoomImage.height / props.smallImage.height;
      var bgX = -(props.offsetX * magX - halfSizeX);
      var bgY = -(props.offsetY * magY - halfSizeY);
      var isVisible = props.offsetY < props.smallImage.height && props.offsetX < props.smallImage.width && props.offsetY > 0 && props.offsetX > 0;
      return _react["default"].createElement("div", {
        className: 'cursor-zoom-magnifier-container',
        style: {
          position: 'absolute',
          display: isVisible ? 'block' : 'none',
          top: props.y,
          left: props.x,
          width: props.size + props.size * .4,
          height: props.size,
          marginLeft: -halfSizeX + props.cursorOffset.x,
          marginTop: -halfSizeY + props.cursorOffset.y,
          backgroundColor: 'white',
          boxShadow: '1px 1px 6px rgba(0,0,0,0.3)',
          zIndex: 9999
        }
      }, props.pointerStyle && _react["default"].createElement("div", {
        className: 'cursor-zoom-pointer',
        style: props.pointerStyle
      }), _react["default"].createElement("div", {
        className: 'cursor-zoom-magnifier',
        style: {
          width: props.size + props.size * .4,
          height: props.size,
          backgroundImage: 'url(' + props.zoomImage.src + ')',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: bgX + 'px ' + bgY + 'px',
          border: props.borderSize + ' solid ' + props.borderColor
        },
        onClick: this._handleClick
      }));
    }
  }]);

  return Magnifier;
}(_react["default"].Component);

Magnifier.displayName = 'CursorZoom';
Magnifier.propTypes = {
  // the size of the magnifier window
  size: _propTypes["default"].number.isRequired,
  // x position on screen
  x: _propTypes["default"].number.isRequired,
  // y position on screen
  y: _propTypes["default"].number.isRequired,
  // x position relative to the image
  offsetX: _propTypes["default"].number.isRequired,
  // y position relative to the image
  offsetY: _propTypes["default"].number.isRequired,
  // the offset of the zoom bubble from the cursor
  cursorOffset: _propTypes["default"].shape({
    x: _propTypes["default"].number.isRequired,
    y: _propTypes["default"].number.isRequired
  }).isRequired,
  borderSize: _propTypes["default"].string,
  borderColor: _propTypes["default"].string,
  // show a triangle pointer next to cursor (useful with offset)
  pointerStyle: _propTypes["default"].object,
  // the size of the non-zoomed-in image
  smallImage: _propTypes["default"].shape({
    src: _propTypes["default"].string.isRequired,
    width: _propTypes["default"].number.isRequired,
    height: _propTypes["default"].number.isRequired
  }).isRequired,
  // the size of the zoomed-in image
  zoomImage: _propTypes["default"].shape({
    src: _propTypes["default"].string.isRequired,
    width: _propTypes["default"].number.isRequired,
    height: _propTypes["default"].number.isRequired
  }).isRequired,
  onClick: _propTypes["default"].func
};
var _default = Magnifier;
exports["default"] = _default;