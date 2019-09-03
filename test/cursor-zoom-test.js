import React from "react";
import { mount } from "enzyme";
import CursorZoom from "../src/cursor-zoom";

function simulateMouseMoveOnDocument(args) {
  const event = new MouseEvent("mousemove", args);
  window.document.dispatchEvent(event);
}

describe("Cursor Zoom Component", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount(
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
  });

  afterEach(() => {
    wrapper = null;
    document.querySelector("body").innerHTML = ""; // remove portals
  });

  it("Renders the image", () => {
    const image = wrapper.find("img");
    expect(image.length).toEqual(1);
    expect(image.prop("src")).toEqual("img/cat-small.jpg");
    expect(image.prop("width")).toEqual(800);
    expect(image.prop("height")).toEqual(600);
  });

  it("Hides magnifier when not captured", () => {
    simulateMouseMoveOnDocument({ clientX: 2000, clientY: 2000 });

    const magnifierNodes = document.querySelectorAll(
      ".cursor-zoom-magnifier-container"
    );
    expect(magnifierNodes.length).toEqual(1);
    expect(magnifierNodes[0].style.display).toEqual("none");
  });

  it("Shows magnifier when captured", () => {
    simulateMouseMoveOnDocument({ clientX: 400, clientY: 300 });

    const magnifierNodes = document.querySelectorAll(
      ".cursor-zoom-magnifier-container"
    );
    expect(magnifierNodes.length).toEqual(1);
    expect(magnifierNodes[0].style.display).toEqual("block");
    expect(magnifierNodes[0].style.marginLeft).toEqual("-140px");
    expect(magnifierNodes[0].style.marginTop).toEqual("-100px");
    expect(magnifierNodes[0].style.height).toEqual("200px");
  });

  it("Handles cursor offset", () => {
    wrapper.setProps({ cursorOffset: { x: 80, y: -80 } });
    simulateMouseMoveOnDocument({ clientX: 400, clientY: 300 });

    const magnifierNodes = document.querySelectorAll(
      ".cursor-zoom-magnifier-container"
    );
    expect(magnifierNodes.length).toEqual(1);
    expect(magnifierNodes[0].style.display).toEqual("block");
    expect(magnifierNodes[0].style.marginLeft).toEqual("-60px");
    expect(magnifierNodes[0].style.marginTop).toEqual("-180px");
    expect(magnifierNodes[0].style.height).toEqual("200px");
  });

  it("Handles pointer styling", () => {
    wrapper.setProps({
      pointerStyle: {
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "13.5px 23.4px 13.5px 0",
        borderColor: "transparent white transparent transparent",
        position: "absolute",
        left: "-18px",
        bottom: "10px"
      }
    });

    simulateMouseMoveOnDocument({ clientX: 400, clientY: 300 });

    const pointerNodes = document.querySelectorAll(".cursor-zoom-pointer");
    expect(pointerNodes.length).toEqual(1);
    expect(pointerNodes[0].style.position).toEqual("absolute");
    expect(pointerNodes[0].style.left).toEqual("-18px");
    expect(pointerNodes[0].style.bottom).toEqual("10px");
  });

  it("Handles preview size", () => {
    wrapper.setProps({ size: 400 });
    simulateMouseMoveOnDocument({ clientX: 400, clientY: 300 });

    const magnifierNodes = document.querySelectorAll(
      ".cursor-zoom-magnifier-container"
    );
    expect(magnifierNodes.length).toEqual(1);
    expect(magnifierNodes[0].style.height).toEqual("400px");
  });
});
