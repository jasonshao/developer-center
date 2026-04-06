import { expect, test } from "@playwright/test";

test("homepage shows the approved onboarding structure", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "先找到你的接入路线，再快速跑通第一笔交易"
    })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "线下门店收款", level: 3 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "线上与移动端支付", level: 3 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "小程序支付", level: 3 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "商户入网与分账", level: 3 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "开放能力与通知", level: 3 })).toBeVisible();
  await expect(page.getByRole("button", { name: "开始接入" })).toBeVisible();
});

test("route cards navigate to route detail pages", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "查看 Quickstart" }).first().click();

  await expect(
    page.getByRole("heading", { name: "线下门店收款" })
  ).toBeVisible();
  await expect(page.getByText("判断门店场景")).toBeVisible();
  await expect(page.locator(".chip", { hasText: /^B扫C$/ }).first()).toBeVisible();
});

test("hero search submits to the first matching route page", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("搜索场景、API 或 FAQ").fill("收付通开户");
  await page.getByRole("button", { name: "搜索" }).click();

  await expect(page.getByRole("heading", { name: "商户入网与分账" })).toBeVisible();
  await expect(page.getByText("确认平台角色")).toBeVisible();
});

test("homepage remains usable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "先找到你的接入路线，再快速跑通第一笔交易"
    })
  ).toBeVisible();
  await expect(page.getByText("第一步：选择接入路线")).toBeVisible();
  await expect(page.getByRole("button", { name: "开始接入" })).toBeVisible();
});
