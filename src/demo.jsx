import React from 'react';
import ReactDOM from 'react-dom';
import CursorZoom from './cursor-zoom.jsx';

var Demo = React.createClass({
    render: function() {
        return (
            <div>
                <CursorZoom
                    size={100}
                    image={{
                        src: "img/cat-small.jpg",
                        width: 400,
                        height: 300
                    }}
                    zoomImage={{
                        src: "img/cat-large.jpg",
                        width: 1024,
                        height: 768
                    }}
                    borderColor='white'
                    borderSize='5px'
                    cursorOffset={{
                        x: 100,
                        y: -20
                    }}
                    pointerStyle={{
                        width: 0,
                        height: 0,
                        borderStyle: 'solid',
                        borderWidth: '13.5px 23.4px 13.5px 0',
                        borderColor: 'transparent white transparent transparent',
                        position: 'absolute',
                        left: '-18',
                        bottom: '10'
                    }}
                />
                <CursorZoom
                    image={{
                        src: "img/beach-small.jpg",
                        width: 400,
                        height: 300
                    }}
                    zoomImage={{
                        src: "img/beach-large.jpg",
                        width: 1600,
                        height: 1200
                    }}
                    cursorOffset={{ x: 80, y: -80 }}
                />
                <CursorZoom
                    image={{
                        src: "img/fall-small.jpg",
                        width: 400,
                        height: 250
                    }}
                    zoomImage={{
                        src: "img/fall-large.jpg",
                        width: 1920,
                        height: 1200
                    }}
                />
            </div>
        );
    }
});

ReactDOM.render(<Demo />, document.getElementById("demo"));
