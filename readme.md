# react-cursor-zoom 
[![Build Status](https://travis-ci.org/CarMax/react-cursor-zoom.svg?branch=master)](https://travis-ci.org/CarMax/react-cursor-zoom)

A react component that uses a high-res source image to produce a zoom window on mouse hover

Based on [lelandrichardson/react-image-magnifier](https://github.com/lelandrichardson/react-image-magnifier)

## Demo

[Here](http://carmax.github.io/react-cursor-zoom/)

## Installation

`npm install react-cursor-zoom --save`

## Usage


```jsx
import CursorZoom from 'react-cursor-zoom';

var App = React.createClass({
    render: function() {
        return (
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
        );
    }
});
```

## API

### image

> Required

`{ src, width, height }`

The inline image that will be used as a reference for cursor zoom

### zoomImage

> Required

`{ src, width, height }`

The high-res image to be used on hover

### cursorOffset

> Optional : default `{ x: 0, y: 0 }`

 `{ x: 0, y: 0 }` or `{ x, y }`

### size

> Optional : default `200`

`Number`

The size of the zoom window
