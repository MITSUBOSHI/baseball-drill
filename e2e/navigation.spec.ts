import { test, expect } from "@playwright/test";

test.describe("ページ遷移", () => {
  test("トップページが表示される", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("すべてのプレーに");
  });

  test("カテゴリページに遷移できる", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/drills/basics"]');
    await expect(page.locator("h1")).toContainText("基本練習");
  });

  test("ドリル詳細ページに遷移できる", async ({ page }) => {
    await page.goto("/drills/basics");
    await page.click('a[href*="basics-001"]');
    await expect(page.locator("h1")).toContainText("キャッチボール");
  });

  test("検索ページに遷移できる", async ({ page }) => {
    await page.goto("/search");
    await expect(page.locator("h1")).toContainText("検索");
  });

  test("お気に入りページに遷移できる", async ({ page }) => {
    await page.goto("/favorites");
    await expect(page.locator("h1")).toContainText("お気に入り");
  });
});

test.describe("検索機能", () => {
  test("キーワードでドリルを検索できる", async ({ page }) => {
    await page.goto("/search");
    await page.fill('input[type="search"]', "キャッチボール");
    await expect(page.locator("text=正しいキャッチボール")).toBeVisible();
  });

  test("該当なしの場合メッセージが表示される", async ({ page }) => {
    await page.goto("/search");
    await page.fill('input[type="search"]', "存在しないドリル名");
    await expect(page.locator("text=該当するドリルがありません")).toBeVisible();
  });
});

test.describe("カテゴリフィルタ", () => {
  test("レベルでフィルタできる", async ({ page }) => {
    await page.goto("/drills/pitching");
    await page.click("text=中級");
    await expect(page.locator("text=コントロール練習")).toBeVisible();
  });
});
