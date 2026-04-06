import { describe, expect, it } from "vitest";
import { searchRouteEntries } from "../../src/utils/search";

describe("searchRouteEntries", () => {
  it("ranks route pages above API-like links for scene keywords", () => {
    const results = searchRouteEntries("公众号支付");

    expect(results[0]?.type).toBe("route");
    expect(results[0]?.title).toContain("线上与移动端支付");
  });

  it("returns onboarding help for settlement keywords", () => {
    const results = searchRouteEntries("收付通开户");

    expect(results[0]?.title).toContain("商户入网与分账");
  });
});
