# TODO

## コンテンツ

- [x] ドリル数の拡充（中級・上級を中心に各カテゴリ追加）
- [x] 走塁カテゴリの独立（basics/strategy から分離）
- [x] ポジション別フィルタの全カテゴリ対応（pitching/batting にタイプフィルタ追加）
- [ ] YouTube動画IDの精査・差し替え（実際にアクセスして内容を確認する必要あり）

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
