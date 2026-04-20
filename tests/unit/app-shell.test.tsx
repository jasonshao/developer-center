import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "../../src/App";

describe("App shell", () => {
  it("renders the top nav and home hero", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Shouqianba")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "文档首页" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "一站式移动支付接入。" })).toBeInTheDocument();
  });

  it("renders all six product modules on the home page", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <App />
      </MemoryRouter>
    );

    for (const label of ["收款接入", "线上支付", "小程序支付", "收付通", "通知与签名", "验收与排障"]) {
      expect(screen.getAllByText(new RegExp(label)).length).toBeGreaterThan(0);
    }
  });

  it("renders B扫C full Quickstart at /guides/mod-checkout/sc-b2c", () => {
    render(
      <MemoryRouter initialEntries={["/guides/mod-checkout/sc-b2c"]}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", { name: "B扫C 付款码支付 Quickstart" })
    ).toBeInTheDocument();
  });

  it("renders a deprecated-flagged summary for App 支付", () => {
    render(
      <MemoryRouter initialEntries={["/guides/mod-online/sc-app"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/App 支付/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/不推荐/).length).toBeGreaterThan(0);
  });

  it("renders the decision tree page", () => {
    render(
      <MemoryRouter initialEntries={["/guides/guide-select/decision"]}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", { name: "选对场景，再开始接入。" })
    ).toBeInTheDocument();
  });
});
