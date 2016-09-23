import React from 'react';
import ReactDOM from 'react-dom';
import CursorZoom from './cursor-zoom';

var Demo = React.createClass({
    render: function() {
        return (
            <div>
                <CursorZoom
                    image={{
                        src: "site/img/cat-small.jpg",
                        width: 400,
                        height: 300
                    }}
                    zoomImage={{
                        src: "site/img/cat-large.jpg",
                        width: 1024,
                        height: 768
                    }}
                />
                <CursorZoom
                    image={{
                        src: "site/img/beach-small.jpg",
                        width: 400,
                        height: 300
                    }}
                    zoomImage={{
                        src: "site/img/beach-large.jpg",
                        width: 1600,
                        height: 1200
                    }}
                    cursorOffset={{ x: 80, y: -80 }}
                />
                <CursorZoom
                    image={{
                        src: "site/img/fall-small.jpg",
                        width: 400,
                        height: 250
                    }}
                    zoomImage={{
                        src: "site/img/fall-large.jpg",
                        width: 1920,
                        height: 1200
                    }}
                />
            </div>
        );
    }
});

ReactDOM.render(<Demo />, document.getElementById("demo"));