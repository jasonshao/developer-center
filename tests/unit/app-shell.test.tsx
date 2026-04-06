import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "../../src/App";

describe("App shell", () => {
  it("renders the shared header navigation", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("收钱吧开发者")).toBeInTheDocument();
    expect(screen.getByText("接入方案")).toBeInTheDocument();
  });
});
