import { test, expect } from "@playwright/test";

test.describe("ページ遷移", () => {
  test("トップページが表示される", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("すべてのプレーに");
  });

  test("カテゴリページに遷移できる", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/drills"]');
    await expect(page.locator("h1")).toContainText("できることへ");
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
    // ハイドレーション完了前のクリックは無視されるため、反映されるまでリトライする
    await expect(async () => {
      await page.getByRole("button", { name: "中級", exact: true }).click();
      await expect(
        page.getByRole("heading", { name: "投球フォームの基礎" })
      ).not.toBeVisible({ timeout: 1000 });
    }).toPass({ timeout: 15000 });
    await expect(
      page.getByRole("heading", { name: "コントロール練習（9分割）" })
    ).toBeVisible();
  });
});

test.describe("ルールクイズ", () => {
  test("クイズを開始して回答できる", async ({ page }) => {
    await page.goto("/rules/mlb");
    await page.getByRole("button", { name: "クイズを始める" }).click();
    await expect(page.getByText("問題 1 /")).toBeVisible();
    // 選択肢（A.〜D.で始まるボタン）のいずれかを回答すると解説が表示される
    await page.getByRole("button", { name: /^A\./ }).click();
    await expect(page.getByText(/^Rule /).first()).toBeVisible();
    await expect(
      page.getByRole("button", { name: "次の問題へ" })
    ).toBeVisible();
  });

  test("セクションを選ぶと出題可能数が変わる", async ({ page }) => {
    await page.goto("/rules/mlb");
    await page.getByRole("button", { name: "公式記録員" }).click();
    await expect(page.getByText(/出題可能な問題数：\d+問/)).toBeVisible();
    await expect(page.getByText("出題可能な問題数：0問")).not.toBeVisible();
  });
});
