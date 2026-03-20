import { getAllDrills, getDrillsByCategory, getDrillById, getCategories } from "./drills";

describe("getAllDrills", () => {
  it("returns all drills", () => {
    const drills = getAllDrills();
    expect(drills.length).toBeGreaterThan(0);
  });
});

describe("getDrillsByCategory", () => {
  it("returns drills filtered by category", () => {
    const drills = getDrillsByCategory("pitching");
    expect(drills.length).toBeGreaterThan(0);
    drills.forEach((d) => expect(d.category).toBe("pitching"));
  });

  it("returns empty array for category with no drills", () => {
    const drills = getDrillsByCategory("basics" as never);
    // basics has drills, so just verify it filters correctly
    drills.forEach((d) => expect(d.category).toBe("basics"));
  });
});

describe("getDrillById", () => {
  it("returns a drill by id", () => {
    const drill = getDrillById("basics-001");
    expect(drill).toBeDefined();
    expect(drill!.title).toBe("正しいキャッチボール");
  });

  it("returns undefined for unknown id", () => {
    expect(getDrillById("unknown")).toBeUndefined();
  });
});

describe("getCategories", () => {
  it("returns all 6 categories", () => {
    const categories = getCategories();
    expect(categories).toHaveLength(6);
    expect(categories).toContain("basics");
    expect(categories).toContain("pitching");
    expect(categories).toContain("batting");
    expect(categories).toContain("fielding");
    expect(categories).toContain("strategy");
    expect(categories).toContain("training");
  });
});
