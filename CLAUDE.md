# Claude Code 開発メモ

## プロジェクト概要
Drawing Insight Desktop - AI技術を活用した図面解析システム（Electronデスクトップアプリケーション）

## 現在の開発状況

### ✅ 完了済み（フェーズ1: 基盤構築）
- Electronプロジェクトの初期化
- 必要なパッケージのインストール（React, TypeScript, Ant Design, SQLite3等）
- TypeScriptとWebpackの設定
- プロジェクトディレクトリ構造の作成
- メインプロセス（main.ts, preload.ts）の基本実装
- レンダラープロセス（React UI）の基本実装
- UIコンポーネント（FileUpload, AnalysisProgress, ResultTable）の作成
- Windows用実行ファイルのビルド設定
- 包括的な開発ドキュメントの整備

### 🏗️ 実装済みの主要ファイル
```
src/
├── main/
│   ├── main.ts          ✅ Electronメインプロセス
│   └── preload.ts       ✅ セキュアなIPC通信設定
├── renderer/
│   ├── App.tsx          ✅ メインUIコンポーネント
│   ├── index.tsx        ✅ Reactエントリーポイント
│   ├── index.html       ✅ HTMLテンプレート
│   └── components/
│       ├── FileUpload.tsx       ✅ ファイルアップロード
│       ├── AnalysisProgress.tsx ✅ 解析進捗表示
│       └── ResultTable.tsx      ✅ 結果テーブル
└── shared/
    └── types.ts         ✅ 共通型定義

docs/                    ✅ 完全整備済み
├── DEVELOPMENT_GUIDE.md ✅ 開発ガイドライン
├── CODING_STANDARDS.md  ✅ コーディング規約
├── ARCHITECTURE.md      ✅ アーキテクチャ設計
├── BUILD.md            ✅ ビルド・デプロイ手順
├── API.md              ✅ API仕様
└── README.md           ✅ ドキュメント目次
```

### 📦 設定ファイル
```
package.json            ✅ 依存関係・スクリプト設定
tsconfig.json          ✅ TypeScript設定
webpack.config.js      ✅ ビルド設定（main/preload/renderer）
.gitignore            ✅ Git除外設定
README.md             ✅ プロジェクト概要（更新済み）
```

## 🚧 次のフェーズ（フェーズ2: AI連携）

### 未実装の主要機能
1. **ファイル操作システム**
   - `src/main/fileHandler.ts` - ファイル検証・読み込み・一時保存
   - ファイル形式対応（JPEG, PNG, PDF, DWG, DXF）
   - ファイルサイズ制限（50MB）
   - セキュアなファイル処理

2. **AI API連携**
   - `src/main/aiService.ts` - OpenAI/Google Vision API統合
   - 画像解析リクエスト送信
   - レスポンス解析・構造化
   - エラーハンドリング・リトライ機能

3. **データベース管理**
   - `src/main/database.ts` - SQLite接続・CRUD操作
   - 解析結果の永続化
   - データ暗号化
   - バックアップ・復元機能

4. **IPC通信の実装**
   - preload.tsのAPI拡張
   - メインプロセスのIPCハンドラー実装
   - リアルタイム進捗通知

## 🛠️ 開発環境

### 動作確認済み
- ✅ プロジェクトビルド成功
- ✅ Windows用実行ファイル生成（`release/win-unpacked/Drawing Insight Desktop.exe`）
- ✅ 基本UIの表示確認

### 利用可能なコマンド
```bash
npm run dev          # 開発用ビルド
npm run build        # プロダクション用ビルド
npm run electron     # Electronアプリ起動
npm run dist:win     # Windows用配布パッケージ作成
npm start           # プロダクション版起動
```

## 📋 明日の作業予定

### 優先度：高
1. **ファイルハンドラーの実装**
   - ファイル検証機能
   - サポート形式チェック
   - サイズ制限チェック
   - 一時ファイル管理

2. **AI APIサービスの基本実装**
   - API通信の基盤作成
   - 環境変数設定（APIキー管理）
   - 基本的な画像解析機能

### 優先度：中
3. **IPCチャネルの実装**
   - ファイルアップロード通信
   - 解析開始通信
   - 進捗通知システム

4. **データベース基盤**
   - SQLite接続設定
   - 基本的なテーブル設計

## 🔑 重要な設定・制約

### セキュリティ
- nodeIntegration: false
- contextIsolation: true
- preloadによる安全なAPI公開

### アーキテクチャ
- メインプロセス: ファイル操作・AI API・DB
- レンダラープロセス: UI・ユーザー操作
- IPC: セキュアな双方向通信

### コーディング規約
- TypeScript strict mode
- React関数コンポーネント
- Ant Designコンポーネント優先使用
- async/await使用
- 適切なエラーハンドリング

## 📞 開発時の参考

### ドキュメント
- [開発ガイドライン](docs/DEVELOPMENT_GUIDE.md)
- [コーディング規約](docs/CODING_STANDARDS.md) 
- [アーキテクチャ](docs/ARCHITECTURE.md)
- [API仕様](docs/API.md)

### Git状況
- ブランチ: main
- 最新コミット: docs: 包括的な開発ドキュメントを整備
- リモート: https://github.com/genkis3zu/drawing-insight-desktop.git

---

**次回開始時**: このファイルを確認してから、フェーズ2のファイルハンドラー実装から始めてください。