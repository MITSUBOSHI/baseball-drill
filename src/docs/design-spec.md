# Design Spec: 野球ドリルサイト

## カラーパレット

- プライマリ: `bg-slate-900` / `text-slate-900` (ダーク: `bg-slate-100`)
- アクセント: `bg-orange-500` / `text-orange-500`
- 背景: `bg-gray-50` (ダーク: `bg-gray-950`)
- カード背景: `bg-white` (ダーク: `bg-gray-900`)
- ボーダー: `border-gray-200` (ダーク: `border-gray-800`)

### カテゴリ別カラー
- basics: `bg-blue-500`
- strategy: `bg-purple-500`
- pitching: `bg-red-500`
- batting: `bg-orange-500`
- fielding: `bg-green-500`

### レベルバッジ
- 初級: `bg-green-100 text-green-800` (ダーク: `bg-green-900 text-green-200`)
- 中級: `bg-yellow-100 text-yellow-800` (ダーク: `bg-yellow-900 text-yellow-200`)
- 上級: `bg-red-100 text-red-800` (ダーク: `bg-red-900 text-red-200`)

## レイアウト
- コンテナ: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`
- カードグリッド: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`

## コンポーネント

### ヘッダー
`bg-slate-900 text-white py-4` + サイト名 + ナビゲーション

### カテゴリカード
`rounded-xl shadow-sm border hover:shadow-md transition-shadow p-6`
上部にカテゴリカラーのアクセントバー `h-1 rounded-t-xl`

### ドリルカード
`rounded-lg border p-5 hover:shadow-md transition-shadow`
レベルバッジ + タイトル + 概要 + メタ情報

### YouTube埋め込み
`aspect-video w-full rounded-lg overflow-hidden`

### パンくず
`text-sm text-gray-500` + `>` セパレータ
