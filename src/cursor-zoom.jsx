import React from 'react';
import ReactDOM from 'react-dom';
import Magnifier from './magnifier';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

class CursorZoom extends React.Component {
    constructor() {
        super();
        this.state = {
            x: 0,
            y: 0,
            offsetX: -1,
            offsetY: -1
        };
        this._onMouseMove = this._onMouseMove.bind(this);
        this.setState = this.setState.bind(this);
        this._handleClick = this._handleClick.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousemove', this._onMouseMove);
        if (!this.portalElement) {
            this.portalElement = document.createElement('div');
            document.body.appendChild(this.portalElement);
        }
        this.componentDidUpdate();
    }
    componentWillUnmount() {
        document.removeEventListener('mousemove', this._onMouseMove);
        document.body.removeChild(this.portalElement);
        this.portalElement = null;
    }
    componentDidUpdate() {
        ReactDOM.render(React.createElement(Magnifier, _extends({
            size: this.props.size,
            smallImage: this.props.image,
            zoomImage: this.props.zoomImage,
            cursorOffset: this.props.cursorOffset,
            onClick: this._handleClick
        }, this.state)), this.portalElement);
    }
    _onMouseMove(e) {
        var offset = getOffset(this.refs.image);

        
        var scrollX = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
        var scrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

        this.setState({
            x: e.clientX + scrollX, //(window.scrollX || window.pageXOffset),
            y: e.clientY + scrollY, //(window.scrollY || window.pageYOffset),
            offsetX: e.clientX - offset.x,
            offsetY: e.clientY - offset.y
        });
    }
    _handleClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }
    render() {
        return <img ref="image" width={this.props.image.width} height={this.props.image.height} src={this.props.image.src} />;
    }
}

CursorZoom.displayName = 'CursorZoom';

CursorZoom.propTypes = {
    // the size of the magnifier window
    size: React.PropTypes.number,
    // the offset of the zoom bubble from the cursor
    cursorOffset: React.PropTypes.shape({
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired
    }),
    // the size of the non-zoomed-in image
    image: React.PropTypes.shape({
        src: React.PropTypes.string.isRequired,
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired
    }).isRequired,
    // the size of the zoomed-in image
    zoomImage: React.PropTypes.shape({
        src: React.PropTypes.string.isRequired,
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired
    }).isRequired,
    onClick: React.PropTypes.func
};

CursorZoom.defaultProps = {
    size: 200,
    cursorOffset: { x: 0, y: 0 }
};

CursorZoom.portalElement = null;

export default CursorZoom;