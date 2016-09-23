import React from 'react';

class Magnifier extends React.Component {
    constructor() {
        super();
        this._handleClick = this._handleClick.bind(this);
    }
    _handleClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }
    render() {
        var props = this.props;
        var halfSizeY = props.size / 2;
        var halfSizeX = (props.size + (props.size * .4)) / 2;
        var magX = props.zoomImage.width / props.smallImage.width;
        var magY = props.zoomImage.height / props.smallImage.height;
        var bgX = -(props.offsetX * magX - halfSizeX);
        var bgY = -(props.offsetY * magY - halfSizeY);
        var isVisible = props.offsetY < props.smallImage.height && props.offsetX < props.smallImage.width && props.offsetY > 0 && props.offsetX > 0;
        return (<div
                    style={{
                        position: 'absolute',
                        display: isVisible ? 'block' : 'none',
                        top: props.y,
                        left: props.x,
                        width: props.size + (props.size * .4),
                        height: props.size,
                        marginLeft: -halfSizeX + props.cursorOffset.x,
                        marginTop: -halfSizeY + props.cursorOffset.y,
                        backgroundColor: 'white',
                        boxShadow: '1px 1px 6px rgba(0,0,0,0.3)'
                    }}
                >
                    <div
                        style={{
                            width: props.size + (props.size * .4),
                            height: props.size,
                            backgroundImage: 'url(' + props.zoomImage.src + ')',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: bgX + 'px ' + bgY + 'px',
                            border: '4px solid #77c2e6'
                        }}
                        onClick={this._handleClick}
                    />
            </div>
        );
    }
}

Magnifier.displayName = 'CursorZoom';

Magnifier.propTypes = {
    // the size of the magnifier window
    size: React.PropTypes.number.isRequired,
    // x position on screen
    x: React.PropTypes.number.isRequired,
    // y position on screen
    y: React.PropTypes.number.isRequired,
    // x position relative to the image
    offsetX: React.PropTypes.number.isRequired,
    // y position relative to the image
    offsetY: React.PropTypes.number.isRequired,
    // the offset of the zoom bubble from the cursor
    cursorOffset: React.PropTypes.shape({
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired
    }).isRequired,
    // the size of the non-zoomed-in image
    smallImage: React.PropTypes.shape({
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

export default Magnifier;
