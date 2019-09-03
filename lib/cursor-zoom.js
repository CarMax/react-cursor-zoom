"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _magnifier = _interopRequireDefault(require("./magnifier"));

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

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

function getOffset(el) {
  var x = 0;
  var y = 0;

  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    // FF & IE don't support body's scrollTop - use window instead
    x += el.offsetLeft - (el.tagName === "BODY" ? window.pageXOffset : el.scrollLeft);
    y += el.offsetTop - (el.tagName === "BODY" ? window.pageYOffset : el.scrollTop);
    el = el.offsetParent;
  }

  return {
    x: x,
    y: y
  };
}

var CursorZoom =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CursorZoom, _React$Component);

  function CursorZoom() {
    var _this;

    _classCallCheck(this, CursorZoom);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CursorZoom).call(this));
    _this.state = {
      x: 0,
      y: 0,
      offsetX: -1,
      offsetY: -1
    };
    _this._onMouseMove = _this._onMouseMove.bind(_assertThisInitialized(_this));
    _this.setState = _this.setState.bind(_assertThisInitialized(_this));
    _this._handleClick = _this._handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CursorZoom, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener("mousemove", this._onMouseMove);

      if (!this.portalElement) {
        this.portalElement = document.createElement("div");
        document.body.appendChild(this.portalElement);
      }

      this.componentDidUpdate();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("mousemove", this._onMouseMove);
      document.body.removeChild(this.portalElement);
      this.portalElement = null;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      _reactDom["default"].render(_react["default"].createElement(_magnifier["default"], _extends({
        size: this.props.size,
        smallImage: this.props.image,
        zoomImage: this.props.zoomImage,
        cursorOffset: this.props.cursorOffset,
        borderSize: this.props.borderSize,
        borderColor: this.props.borderColor,
        pointerStyle: this.props.pointerStyle,
        onClick: this._handleClick
      }, this.state)), this.portalElement);
    }
  }, {
    key: "_onMouseMove",
    value: function _onMouseMove(e) {
      var offset = getOffset(this.refs.image);
      var scrollX = window.pageXOffset !== undefined ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
      var scrollY = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      this.setState({
        x: e.clientX + scrollX,
        //(window.scrollX || window.pageXOffset),
        y: e.clientY + scrollY,
        //(window.scrollY || window.pageYOffset),
        offsetX: e.clientX - offset.x,
        offsetY: e.clientY - offset.y
      });
    }
  }, {
    key: "_handleClick",
    value: function _handleClick() {
      if (this.props.onClick) {
        this.props.onClick();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("img", {
        ref: "image",
        width: this.props.image.width,
        height: this.props.image.height,
        src: this.props.image.src,
        style: this.props.image.style
      });
    }
  }]);

  return CursorZoom;
}(_react["default"].Component);

CursorZoom.displayName = "CursorZoom";
CursorZoom.propTypes = {
  // the size of the magnifier window
  size: _propTypes["default"].number,
  // the offset of the zoom bubble from the cursor
  borderSize: _propTypes["default"].string,
  borderColor: _propTypes["default"].string,
  // show a triangle pointer next to cursor (useful with offset)
  pointerStyle: _propTypes["default"].object,
  cursorOffset: _propTypes["default"].shape({
    x: _propTypes["default"].number.isRequired,
    y: _propTypes["default"].number.isRequired
  }),
  // the size of the non-zoomed-in image
  image: _propTypes["default"].shape({
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
CursorZoom.defaultProps = {
  size: 200,
  cursorOffset: {
    x: 0,
    y: 0
  }
};
CursorZoom.portalElement = null;
var _default = CursorZoom;
exports["default"] = _default;