import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { menus, vehicles, events, devices, roadRows } from "@/components/platform/data";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("provides exactly seven distinct primary menus backed by distinct pages", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(menus).toHaveLength(7);
    expect(new Set(menus.map(menu => menu.path)).size).toBe(7);
    for (const menu of menus) {
      expect(router.matchRoutes(menu.path).at(-1)?.routeId).toBe(menu.path);
    }
  });

  it("keeps all demonstration records complete", () => {
    for (const row of [...vehicles, ...events, ...devices, ...roadRows]) {
      expect(row.fields).toHaveLength(6);
      expect(row.fields.every(value => typeof value === "string" && value.length > 0)).toBe(true);
      expect(row.region.length).toBeGreaterThan(0);
    }
  });

  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
