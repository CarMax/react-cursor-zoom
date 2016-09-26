import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CursorZoom from '../src/cursor-zoom';

function simulateMouseMoveOnDocument(args) {
    const event = new MouseEvent('mousemove', args);
    window.document.dispatchEvent(event);
}

describe('Cursor Zoom Component', () => {
    let componentNode = null;

    beforeEach(() => {
        const component = TestUtils.renderIntoDocument(
            <CursorZoom
                image={{
                    src: "img/cat-small.jpg",
                    width: 800,
                    height: 600
                }}
                zoomImage={{
                    src: "img/cat-large.jpg",
                    width: 1024,
                    height: 768
                }}
            />
        );

        componentNode = ReactDOM.findDOMNode(component);
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(componentNode.parentNode);
        componentNode = null;
    });

    it('renders the initial image correctly', () => {
        expect(componentNode.src).toEqual('img/cat-small.jpg');
        expect(componentNode.width).toEqual(800);
        expect(componentNode.height).toEqual(600);
        const magnifierContainer = document.getElementsByClassName('cursor-zoom-magnifier-container');
        expect(magnifierContainer.length).toEqual(1);
        expect(magnifierContainer[0].style.display).toEqual('none');
    });

    it('renders the magnifier when mouse is over the image', () => {
        simulateMouseMoveOnDocument({ clientX: 400, clientY: 300 });

        const magnifierContainer = document.getElementsByClassName('cursor-zoom-magnifier-container');
        expect(magnifierContainer.length).toEqual(1);
        expect(magnifierContainer[0].style.display).toEqual('block');
        //check default offset and preview size
        expect(magnifierContainer[0].style.marginLeft).toEqual('-140px');
        expect(magnifierContainer[0].style.marginTop).toEqual('-100px');
        expect(magnifierContainer[0].style.height).toEqual('200px');
    });

    it('does not renders the magnifier when mouse is far away from the image', () => {
        simulateMouseMoveOnDocument({ clientX: 2000, clientY: 2000 });

        const magnifierContainer = document.getElementsByClassName('cursor-zoom-magnifier-container');
        expect(magnifierContainer.length).toEqual(1);
        expect(magnifierContainer[0].style.display).toEqual('none');
    });
});

describe('Cursor Zoom Component - Cursor Offset Feature', () => {
    let componentNode = null;

    beforeEach(() => {
        const component = TestUtils.renderIntoDocument(
            <CursorZoom
                image={{
                    src: "img/cat-small.jpg",
                    width: 800,
                    height: 600
                }}
                zoomImage={{
                    src: "img/cat-large.jpg",
                    width: 1024,
                    height: 768
                }}
                cursorOffset={{ x: 80, y: -80 }}
            />
        );

        componentNode = ReactDOM.findDOMNode(component);
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(componentNode.parentNode);
        componentNode = null;
    });

    it('renders the magnifier with correct offset', () => {
        simulateMouseMoveOnDocument({ clientX: 400, clientY: 300 });

        const magnifierContainer = document.getElementsByClassName('cursor-zoom-magnifier-container');
        expect(magnifierContainer.length).toEqual(1);
        expect(magnifierContainer[0].style.display).toEqual('block');
        expect(magnifierContainer[0].style.marginLeft).toEqual('-60px');
        expect(magnifierContainer[0].style.marginTop).toEqual('-180px');
    });
});

describe('Cursor Zoom Component - Preview Size Feature', () => {
    let componentNode = null;

    beforeEach(() => {
        const component = TestUtils.renderIntoDocument(
            <CursorZoom
                image={{
                    src: "img/cat-small.jpg",
                    width: 800,
                    height: 600
                }}
                zoomImage={{
                    src: "img/cat-large.jpg",
                    width: 1024,
                    height: 768
                }}
                size={400}
            />
        );

        componentNode = ReactDOM.findDOMNode(component);
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(componentNode.parentNode);
        componentNode = null;
    });

    it('renders the magnifier with correct height', () => {
        simulateMouseMoveOnDocument({ clientX: 400, clientY: 300 });

        const magnifierContainer = document.getElementsByClassName('cursor-zoom-magnifier-container');
        expect(magnifierContainer.length).toEqual(1);
        expect(magnifierContainer[0].style.display).toEqual('block');
        expect(magnifierContainer[0].style.height).toEqual('400px');
    });
});
