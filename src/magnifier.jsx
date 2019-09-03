import React from 'react';
import PropTypes from 'prop-types';

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
                    className={'cursor-zoom-magnifier-container'}
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
                        boxShadow: '1px 1px 6px rgba(0,0,0,0.3)',
                        zIndex: 9999
                    }}
                >
                    { props.pointerStyle && <div
                        className={'cursor-zoom-pointer'}
                        style={props.pointerStyle}
                    /> }
                    <div
                        className={'cursor-zoom-magnifier'}
                        style={{
                            width: props.size + (props.size * .4),
                            height: props.size,
                            backgroundImage: 'url(' + props.zoomImage.src + ')',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: bgX + 'px ' + bgY + 'px',
                            border: props.borderSize + ' solid ' + props.borderColor
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
    size: PropTypes.number.isRequired,
    // x position on screen
    x: PropTypes.number.isRequired,
    // y position on screen
    y: PropTypes.number.isRequired,
    // x position relative to the image
    offsetX: PropTypes.number.isRequired,
    // y position relative to the image
    offsetY: PropTypes.number.isRequired,
    // the offset of the zoom bubble from the cursor
    cursorOffset: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }).isRequired,
    borderSize: PropTypes.string,
    borderColor: PropTypes.string,
    // show a triangle pointer next to cursor (useful with offset)
    pointerStyle: PropTypes.object,
    // the size of the non-zoomed-in image
    smallImage: PropTypes.shape({
        src: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    }).isRequired,
    // the size of the zoomed-in image
    zoomImage: PropTypes.shape({
        src: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    }).isRequired,
    onClick: PropTypes.func
};

export default Magnifier;
