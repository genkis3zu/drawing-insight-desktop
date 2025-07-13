# Drawing Insight Desktop

AI技術を活用した図面解析システム - Electronデスクトップアプリケーション

[![Build Status](https://github.com/genkis3zu/drawing-insight-desktop/workflows/build/badge.svg)](https://github.com/genkis3zu/drawing-insight-desktop/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](package.json)

## 📖 概要

Drawing Insight Desktopは、AI技術を活用して図面ファイルを自動解析し、寸法情報や部品リストを抽出するデスクトップアプリケーションです。建築、機械、電気などの分野の図面処理を効率化します。

### ✨ 主な機能

- 📁 **ファイルアップロード**: JPEG、PNG、PDF、DWG、DXF形式に対応
- 🤖 **AI解析**: OpenAI GPT-4 Vision / Google Vision APIによる自動解析
- 📊 **データ表示**: 解析結果をテーブル形式で表示・編集
- 💾 **データ管理**: SQLiteによるローカルデータベース
- 📤 **エクスポート**: CSV、Excel形式での結果出力
- 🔒 **セキュリティ**: エンドツーエンド暗号化とローカル処理

## 🚀 クイックスタート

### ユーザー向け

1. [Releasesページ](https://github.com/genkis3zu/drawing-insight-desktop/releases)から最新版をダウンロード
2. `Drawing-Insight-Desktop-win.zip`を解凍
3. `Drawing Insight Desktop.exe`を実行

### 開発者向け

```bash
# リポジトリをクローン
git clone https://github.com/genkis3zu/drawing-insight-desktop.git
cd drawing-insight-desktop

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# 別ターミナルでElectronを起動
npm run electron
```

## 📋 システム要件

### 最小要件

- **OS**: Windows 10 (64-bit) / macOS 10.14+ / Ubuntu 18.04+
- **RAM**: 8GB以上
- **ストレージ**: 2GB以上の空き容量
- **ネットワーク**: AI API使用時にインターネット接続が必要

### 推奨要件

- **RAM**: 16GB以上
- **CPU**: Intel Core i5 / AMD Ryzen 5以上
- **GPU**: 統合グラフィックス以上

## 🛠️ 技術スタック

- **フレームワーク**: [Electron.js](https://electronjs.org/) v37+
- **フロントエンド**: [React](https://reactjs.org/) v19 + [TypeScript](https://typescriptlang.org/) v5
- **UI ライブラリ**: [Ant Design](https://ant.design/) v5
- **ビルドツール**: [Webpack](https://webpack.js.org/) v5
- **データベース**: [SQLite3](https://sqlite.org/)
- **AI API**: OpenAI GPT-4 Vision / Google Vision API

## 📚 ドキュメント

### 開発者向け

| ドキュメント | 説明 |
|-------------|------|
| [開発ガイドライン](./docs/DEVELOPMENT_GUIDE.md) | 開発環境構築・開発フロー |
| [コーディング規約](./docs/CODING_STANDARDS.md) | TypeScript/React規約・ベストプラクティス |
| [アーキテクチャ](./docs/ARCHITECTURE.md) | システム設計・構成 |
| [ビルド手順](./docs/BUILD.md) | ビルド・デプロイ・配布手順 |
| [API仕様](./docs/API.md) | IPC通信・内部API仕様 |

### スクリプト

```bash
# 開発
npm run dev          # 開発用ビルド（ウォッチモード）
npm run electron     # Electronアプリ起動
npm start           # プロダクション版起動

# ビルド
npm run build       # プロダクション用ビルド
npm run dist        # 配布用パッケージ作成
npm run dist:win    # Windows用パッケージ
npm run dist:mac    # macOS用パッケージ
npm run dist:linux  # Linux用パッケージ

# 品質管理
npm test           # テスト実行
npm run lint       # ESLintチェック
npm run type-check # TypeScript型チェック
```

## 🏗️ プロジェクト構造

```
drawing-insight-desktop/
├── src/
│   ├── main/                 # メインプロセス（Node.js）
│   │   ├── main.ts          # アプリケーションエントリーポイント
│   │   ├── preload.ts       # セキュアなIPC通信設定
│   │   ├── fileHandler.ts   # ファイル操作・検証
│   │   ├── aiService.ts     # AI API連携
│   │   └── database.ts      # SQLiteデータベース管理
│   ├── renderer/            # レンダラープロセス（React）
│   │   ├── App.tsx         # メインUIコンポーネント
│   │   ├── components/     # UIコンポーネント
│   │   │   ├── FileUpload.tsx
│   │   │   ├── AnalysisProgress.tsx
│   │   │   └── ResultTable.tsx
│   │   └── utils/          # ユーティリティ関数
│   └── shared/             # 共通型定義
│       └── types.ts
├── docs/                   # ドキュメント
├── assets/                 # 静的リソース
├── build/                  # ビルド設定・アイコン
├── dist/                   # ビルド出力
└── release/               # 配布用パッケージ
```

## 🔧 設定

### 環境変数

アプリケーション設定のため、`.env`ファイルを作成してください：

```bash
# AI API設定
OPENAI_API_KEY=your_openai_api_key
GOOGLE_VISION_API_KEY=your_google_vision_api_key

# データベース設定
DB_ENCRYPTION_KEY=your_32_char_encryption_key

# 開発設定
NODE_ENV=development
LOG_LEVEL=debug
```

### AI API設定

1. **OpenAI API**
   - [OpenAI Platform](https://platform.openai.com/)でAPIキーを取得
   - GPT-4 Visionへのアクセス権限が必要

2. **Google Vision API**
   - [Google Cloud Console](https://console.cloud.google.com/)でプロジェクト作成
   - Vision APIを有効化してAPIキーを取得

## 🚦 開発状況

### 現在の実装状況

- ✅ **フェーズ1**: 基盤構築完了
  - Electronアプリケーション基盤
  - React UIフレームワーク
  - TypeScript設定
  - ビルドシステム

- 🚧 **フェーズ2**: AI連携（進行中）
  - AIサービス統合
  - 図面解析機能
  - 結果データ構造化

- 📋 **フェーズ3**: データ管理（計画中）
  - SQLiteデータベース実装
  - CRUD操作
  - エクスポート機能

- 📋 **フェーズ4**: 最適化（計画中）
  - パフォーマンス改善
  - セキュリティ強化
  - エラーハンドリング充実

### ロードマップ

| バージョン | 予定時期 | 主な機能 |
|-----------|---------|---------|
| v1.0.0 | 2024 Q1 | 基本的な図面解析機能 |
| v1.1.0 | 2024 Q2 | バッチ処理・エクスポート強化 |
| v1.2.0 | 2024 Q3 | プラグインシステム |
| v2.0.0 | 2024 Q4 | クラウド連携・コラボレーション |

## 🤝 コントリビューション

プロジェクトへの貢献を歓迎します！

### 貢献方法

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチをプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

### 開発規約

- [コーディング規約](./docs/CODING_STANDARDS.md)に従ってください
- すべての変更にはテストを含めてください
- コミットメッセージは[Conventional Commits](https://conventionalcommits.org/)形式で記述してください

## 🐛 問題報告

バグ報告や機能要求は[Issues](https://github.com/genkis3zu/drawing-insight-desktop/issues)でお知らせください。

### 報告時の情報

- OS・バージョン
- アプリケーションバージョン
- 再現手順
- 期待される動作
- 実際の動作
- エラーメッセージ（あれば）

## 📄 ライセンス

このプロジェクトは[MIT License](LICENSE)のもとで公開されています。

## 👥 開発チーム

- **メイン開発**: [genkis3zu](https://github.com/genkis3zu)
- **AI開発支援**: Claude Code

## 🙏 謝辞

- [Electron.js](https://electronjs.org/)チーム
- [React](https://reactjs.org/)チーム
- [Ant Design](https://ant.design/)チーム
- [OpenAI](https://openai.com/)
- [Google Cloud](https://cloud.google.com/)

---

## 📞 サポート・連絡先

- **GitHub Issues**: [問題報告・機能要求](https://github.com/genkis3zu/drawing-insight-desktop/issues)
- **Discussions**: [質問・相談](https://github.com/genkis3zu/drawing-insight-desktop/discussions)
- **Email**: [プロジェクト管理者へ](mailto:genkis3zu@example.com)

---

*Drawing Insight Desktop - AI-Powered Drawing Analysis for Everyone*