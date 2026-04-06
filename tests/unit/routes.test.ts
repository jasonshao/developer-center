import { describe, expect, it } from "vitest";
import { primaryRoutes } from "../../src/data/routes";

describe("primaryRoutes", () => {
  it("contains the approved five top-level onboarding routes", () => {
    expect(primaryRoutes.map((route) => route.slug)).toEqual([
      "offline-store-payments",
      "online-mobile-payments",
      "mini-program-payments",
      "merchant-onboarding-and-settlement",
      "open-capabilities-and-notifications"
    ]);
  });

  it("marks deprecated H5-in-app flow as non-primary", () => {
    const onlineRoute = primaryRoutes.find(
      (route) => route.slug === "online-mobile-payments"
    );

    expect(onlineRoute?.primaryKeywords).not.toContain("微信/支付宝内H5");
    expect(onlineRoute?.secondaryKeywords).toContain("微信/支付宝内H5");
  });
});
