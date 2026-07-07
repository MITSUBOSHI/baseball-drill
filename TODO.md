# TODO

## コンテンツ

- [x] ドリル数の拡充（中級・上級を中心に各カテゴリ追加）
- [x] 走塁カテゴリの独立（basics/strategy から分離）
- [x] ポジション別フィルタの全カテゴリ対応（pitching/batting にタイプフィルタ追加）
- [ ] YouTube動画IDの精査・差し替え（リンク切れは check:videos で0件確認済み。内容の妥当性確認は未了）
- [x] MLBルールクイズの拡充（30問→48問。セクション9.00「公式記録員」を新設し全セクション出題可能に）
- [x] ふりがな辞書のクイズ対応（クイズ全文をカバレッジテスト対象に追加し、未対応漢字0件）
- [ ] NPBルールクイズ（準備中のまま）

## UX・機能

- [x] 検索機能（カテゴリ横断でドリルを検索）
- [x] お気に入り・練習メニュー作成（localStorage）
- [x] ダークモード切替UI（light / dark / system の3モード）
- [x] レスポンシブの動画表示改善（aspect-video + loading="lazy"）
- [x] ページ間遷移のプリフェッチ最適化（Next.js Link のデフォルト動作で対応済み）

## 技術・運用

- [x] OGP メタデータ設定（openGraph / twitter メタデータ追加）
- [ ] OGP 画像ファイル（output: "export" のため ImageResponse 不可、PNG画像を手動で用意する必要あり）
- [x] PWA対応（manifest.json + メタデータ連携）
- [x] アクセシビリティ改善（スキップリンク、aria-label、loading="lazy"）
- [x] E2Eテスト導入（Playwright + テストケース作成）
- [x] lintエラー解消（localStorage系Providerを useSyncExternalStore ベースに刷新）
- [x] クイズのシャッフル改善（Fisher-Yates化＋選択肢の並びも毎回シャッフル）
- [x] ドリルカードUIの共通化（DrillCard コンポーネント）
