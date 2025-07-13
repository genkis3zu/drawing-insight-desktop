# 開発ガイドライン

## 概要

本ドキュメントは、Drawing Insight Desktopの開発に参加する全ての開発者（人間およびAI）のためのガイドラインです。

## 開発環境のセットアップ

### 必要なツール

- Node.js (v18以上)
- npm (v8以上)
- Git
- Visual Studio Code（推奨）

### 初期セットアップ

```bash
# リポジトリのクローン
git clone https://github.com/genkis3zu/drawing-insight-desktop.git
cd drawing-insight-desktop

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# 別ターミナルでElectronを起動
npm run electron
```

## プロジェクト構造

```
drawing-insight-desktop/
├── src/
│   ├── main/           # メインプロセス
│   │   ├── main.ts     # エントリーポイント
│   │   ├── preload.ts  # プリロードスクリプト
│   │   ├── fileHandler.ts    # ファイル操作
│   │   ├── aiService.ts      # AI API連携
│   │   └── database.ts       # データベース管理
│   ├── renderer/       # レンダラープロセス
│   │   ├── App.tsx     # メインコンポーネント
│   │   ├── components/ # UIコンポーネント
│   │   └── utils/      # ユーティリティ関数
│   └── shared/         # 共通型定義
├── docs/               # ドキュメント
├── assets/             # 静的リソース
├── dist/               # ビルド出力（gitignore）
└── release/            # 配布用ファイル（gitignore）
```

## 開発フロー

### 1. 機能開発

1. **タスクの確認**: READMEの仕様書を確認
2. **ブランチの作成**: `feature/機能名`の形式で作成
3. **実装**: 既存のコードスタイルに従って実装
4. **テスト**: 動作確認を実施
5. **コミット**: 意味のある単位でコミット

### 2. コミットメッセージ

```
<type>: <subject>

<body>

<footer>
```

- **type**: feat, fix, docs, style, refactor, test, chore
- **subject**: 変更内容の要約（50文字以内）
- **body**: 詳細な説明（必要に応じて）
- **footer**: Breaking Changeやイシュー番号

例：
```
feat: 図面解析結果のエクスポート機能を追加

CSV、Excel形式でのエクスポートに対応
フィルタリングされたデータのみエクスポート可能

Closes #123
```

### 3. プルリクエスト

- 機能単位でPRを作成
- レビュー可能なサイズに分割
- 動作確認済みであることを明記

## ベストプラクティス

### Electronアプリケーション開発

1. **プロセス間通信（IPC）**
   - contextBridgeを使用してセキュアな通信を実装
   - 直接的なnodeIntegrationは無効化
   - 型安全なAPI定義を使用

2. **セキュリティ**
   - リモートコンテンツの実行を制限
   - 入力値の検証を徹底
   - 機密情報はメインプロセスで管理

3. **パフォーマンス**
   - 重い処理はメインプロセスで実行
   - 大きなファイルは分割処理
   - メモリリークに注意

### React開発

1. **コンポーネント設計**
   - 単一責任の原則に従う
   - 再利用可能なコンポーネントを作成
   - Props型を明確に定義

2. **状態管理**
   - 必要最小限の状態を保持
   - Context APIを適切に使用
   - 非同期処理の適切な管理

3. **スタイリング**
   - Ant Designのコンポーネントを優先使用
   - カスタムスタイルは最小限に
   - レスポンシブデザインを考慮

## アンチパターン

### 避けるべき実装

1. **セキュリティ関連**
   - ❌ `nodeIntegration: true`の使用
   - ❌ ユーザー入力の直接的な実行
   - ❌ 機密情報のレンダラープロセスでの保持

2. **パフォーマンス関連**
   - ❌ レンダラープロセスでの重い計算処理
   - ❌ 無制限のファイルサイズ受け入れ
   - ❌ メモリに大量のデータを保持

3. **コード品質**
   - ❌ any型の多用
   - ❌ エラーハンドリングの省略
   - ❌ 巨大なコンポーネント

## デバッグ

### 開発ツール

1. **Chrome DevTools**: レンダラープロセスのデバッグ
2. **VS Code**: メインプロセスのデバッグ
3. **Electron DevTools Extension**: React開発者ツール

### よくある問題と解決方法

1. **ビルドエラー**
   - `npm install`を再実行
   - node_modulesを削除して再インストール
   - TypeScriptのバージョン確認

2. **実行時エラー**
   - プロセス間通信の型確認
   - パスの解決方法を確認
   - 非同期処理の適切な処理

## テスト

### ユニットテスト
```bash
npm test
```

### E2Eテスト
```bash
npm run test:e2e
```

### 手動テスト項目
- [ ] ファイルアップロード機能
- [ ] AI解析の実行
- [ ] データの表示・編集
- [ ] エクスポート機能
- [ ] エラーハンドリング

## リリース

### バージョニング

セマンティックバージョニング（SemVer）に従う：
- **Major**: 破壊的変更
- **Minor**: 新機能追加
- **Patch**: バグ修正

### リリース手順

1. バージョン番号の更新
2. CHANGELOGの更新
3. ビルドとテスト
4. GitHub Releaseの作成
5. 配布ファイルのアップロード

## 貢献方法

1. Issueで議論
2. Forkしてブランチ作成
3. 実装とテスト
4. プルリクエスト送信

## 質問・サポート

- GitHub Issuesで質問
- ディスカッションで相談
- ドキュメントの改善提案歓迎

## 関連ドキュメント

- [コーディング規約](./CODING_STANDARDS.md)
- [アーキテクチャ](./ARCHITECTURE.md)
- [API仕様](./API.md)
- [ビルド手順](./BUILD.md)