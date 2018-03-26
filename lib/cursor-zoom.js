'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _magnifier = require('./magnifier');

var _magnifier2 = _interopRequireDefault(_magnifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

function getOffset(el) {
    var x = 0;
    var y = 0;

    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        // FF & IE don't support body's scrollTop - use window instead
        x += el.offsetLeft - (el.tagName === 'BODY' ? window.pageXOffset : el.scrollLeft);
        y += el.offsetTop - (el.tagName === 'BODY' ? window.pageYOffset : el.scrollTop);
        el = el.offsetParent;
    }

    return { x: x, y: y };
}

var CursorZoom = function (_React$Component) {
    _inherits(CursorZoom, _React$Component);

    function CursorZoom() {
        _classCallCheck(this, CursorZoom);

        var _this = _possibleConstructorReturn(this, (CursorZoom.__proto__ || Object.getPrototypeOf(CursorZoom)).call(this));

        _this.state = {
            x: 0,
            y: 0,
            offsetX: -1,
            offsetY: -1
        };
        _this._onMouseMove = _this._onMouseMove.bind(_this);
        _this.setState = _this.setState.bind(_this);
        _this._handleClick = _this._handleClick.bind(_this);
        return _this;
    }

    _createClass(CursorZoom, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.addEventListener('mousemove', this._onMouseMove);
            if (!this.portalElement) {
                this.portalElement = document.createElement('div');
                document.body.appendChild(this.portalElement);
            }
            this.componentDidUpdate();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('mousemove', this._onMouseMove);
            document.body.removeChild(this.portalElement);
            this.portalElement = null;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            _reactDom2.default.render(_react2.default.createElement(_magnifier2.default, _extends({
                size: this.props.size,
                smallImage: this.props.image,
                zoomImage: this.props.zoomImage,
                cursorOffset: this.props.cursorOffset,
                borderSize: this.props.borderSize,
                borderColor: this.props.borderColor,
                containerBackgroundColor: this.props.containerBackgroundColor,
                pointerStyle: this.props.pointerStyle,
                onClick: this._handleClick
            }, this.state)), this.portalElement);
        }
    }, {
        key: '_onMouseMove',
        value: function _onMouseMove(e) {
            var offset = getOffset(this.refs.image);

            var scrollX = window.pageXOffset !== undefined ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
            var scrollY = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

            this.setState({
                x: e.clientX + scrollX, //(window.scrollX || window.pageXOffset),
                y: e.clientY + scrollY, //(window.scrollY || window.pageYOffset),
                offsetX: e.clientX - offset.x,
                offsetY: e.clientY - offset.y
            });
        }
    }, {
        key: '_handleClick',
        value: function _handleClick() {
            if (this.props.onClick) {
                this.props.onClick();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('img', { ref: 'image', width: this.props.image.width, height: this.props.image.height, src: this.props.image.src });
        }
    }]);

    return CursorZoom;
}(_react2.default.Component);

CursorZoom.displayName = 'CursorZoom';

CursorZoom.propTypes = {
    // the size of the magnifier window
    size: _react2.default.PropTypes.number,
    // the offset of the zoom bubble from the cursor
    borderSize: _react2.default.PropTypes.string,
    borderColor: _react2.default.PropTypes.string,
    containerBackgroundColor: _react2.default.PropTypes.string,
    // show a triangle pointer next to cursor (useful with offset)
    pointerStyle: _react2.default.PropTypes.object,
    cursorOffset: _react2.default.PropTypes.shape({
        x: _react2.default.PropTypes.number.isRequired,
        y: _react2.default.PropTypes.number.isRequired
    }),
    // the size of the non-zoomed-in image
    image: _react2.default.PropTypes.shape({
        src: _react2.default.PropTypes.string.isRequired,
        width: _react2.default.PropTypes.number.isRequired,
        height: _react2.default.PropTypes.number.isRequired
    }).isRequired,
    // the size of the zoomed-in image
    zoomImage: _react2.default.PropTypes.shape({
        src: _react2.default.PropTypes.string.isRequired,
        width: _react2.default.PropTypes.number.isRequired,
        height: _react2.default.PropTypes.number.isRequired
    }).isRequired,
    onClick: _react2.default.PropTypes.func
};

CursorZoom.defaultProps = {
    size: 200,
    cursorOffset: { x: 0, y: 0 }
};

CursorZoom.portalElement = null;

exports.default = CursorZoom;