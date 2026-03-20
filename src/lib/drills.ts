import drillsData from "@/data/drills.json";
import type { Drill, Category } from "@/types/drill";

const drills = drillsData as Drill[];

export function getAllDrills(): Drill[] {
  return drills;
}

export function getDrillsByCategory(category: Category): Drill[] {
  return drills.filter((d) => d.category === category);
}

export function getDrillById(id: string): Drill | undefined {
  return drills.find((d) => d.id === id);
}

export function getCategories(): Category[] {
  return ["basics", "strategy", "pitching", "batting", "fielding"];
}
