import { describe, it, expect } from "vitest";

describe("sanity check", () => {
  it("should pass basic math", () => {
    expect(1 + 1).toBe(2);
  });

  it("should work with jsdom (DOM exists)", () => {
    const div = document.createElement("div");
    div.textContent = "hello jsdom";

    document.body.appendChild(div);

    const found = document.querySelector("div");

    expect(found.textContent).toBe("hello jsdom");
  });
});
