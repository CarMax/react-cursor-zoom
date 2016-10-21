'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Magnifier = function (_React$Component) {
    _inherits(Magnifier, _React$Component);

    function Magnifier() {
        _classCallCheck(this, Magnifier);

        var _this = _possibleConstructorReturn(this, (Magnifier.__proto__ || Object.getPrototypeOf(Magnifier)).call(this));

        _this._handleClick = _this._handleClick.bind(_this);
        return _this;
    }

    _createClass(Magnifier, [{
        key: '_handleClick',
        value: function _handleClick() {
            if (this.props.onClick) {
                this.props.onClick();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var props = this.props;
            var halfSizeY = props.size / 2;
            var halfSizeX = (props.size + props.size * .4) / 2;
            var magX = props.zoomImage.width / props.smallImage.width;
            var magY = props.zoomImage.height / props.smallImage.height;
            var bgX = -(props.offsetX * magX - halfSizeX);
            var bgY = -(props.offsetY * magY - halfSizeY);
            var isVisible = props.offsetY < props.smallImage.height && props.offsetX < props.smallImage.width && props.offsetY > 0 && props.offsetX > 0;

            return _react2.default.createElement(
                'div',
                {
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
                },
                props.pointerStyle && _react2.default.createElement('div', {
                    className: 'cursor-zoom-pointer',
                    style: props.pointerStyle
                }),
                _react2.default.createElement('div', {
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
                })
            );
        }
    }]);

    return Magnifier;
}(_react2.default.Component);

Magnifier.displayName = 'CursorZoom';

Magnifier.propTypes = {
    // the size of the magnifier window
    size: _react2.default.PropTypes.number.isRequired,
    // x position on screen
    x: _react2.default.PropTypes.number.isRequired,
    // y position on screen
    y: _react2.default.PropTypes.number.isRequired,
    // x position relative to the image
    offsetX: _react2.default.PropTypes.number.isRequired,
    // y position relative to the image
    offsetY: _react2.default.PropTypes.number.isRequired,
    // the offset of the zoom bubble from the cursor
    cursorOffset: _react2.default.PropTypes.shape({
        x: _react2.default.PropTypes.number.isRequired,
        y: _react2.default.PropTypes.number.isRequired
    }).isRequired,
    borderSize: _react2.default.PropTypes.string,
    borderColor: _react2.default.PropTypes.string,
    // show a triangle pointer next to cursor (useful with offset)
    pointerStyle: _react2.default.PropTypes.object,
    // the size of the non-zoomed-in image
    smallImage: _react2.default.PropTypes.shape({
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

exports.default = Magnifier;