import { expect, test } from "@playwright/test";

test("home page renders hero and module grid", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "一站式移动支付接入。" })
  ).toBeVisible();
  for (const label of ["收款接入", "线上支付", "小程序支付", "收付通", "通知与签名", "验收与排障"]) {
    await expect(page.getByText(new RegExp(label)).first()).toBeVisible();
  }
});

test("clicking a module card navigates to its first scenario", async ({ page }) => {
  await page.goto("/");
  await page.getByText(/收款接入/).first().click();
  await expect(
    page.getByRole("heading", { name: "B扫C 付款码支付 Quickstart" })
  ).toBeVisible();
  await expect(page.getByText("本页目录")).toBeVisible();
});

test("decision tree page is reachable and lists scenarios", async ({ page }) => {
  await page.goto("/guides/guide-select/decision");
  await expect(
    page.getByRole("heading", { name: "选对场景，再开始接入。" })
  ).toBeVisible();
  await expect(page.getByText(/B扫C/).first()).toBeVisible();
});
