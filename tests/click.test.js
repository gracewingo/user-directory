import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

// figure out how to import the onClick 

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  // container *must* be attached to document so events work correctly.
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


it("display visitor details in preview pane", () => {
    const onChange = jest.fn();
    act(() => {
      render(<Toggle onChange={onChange} />, container);
    });
  
    // 
    const button = document.querySelector("[data-testid=toggle]");
    expect(button.innerHTML).toBe("Turn on");
  
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
  
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(button.innerHTML).toBe("Turn off");
  
    act(() => {
      for (let i = 0; i < 5; i++) {
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      }
    });
  
    expect(onChange).toHaveBeenCalledTimes(6);
    expect(button.innerHTML).toBe("Turn on");
  });