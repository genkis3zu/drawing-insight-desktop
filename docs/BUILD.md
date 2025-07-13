# ビルド・デプロイ手順

## 概要

本ドキュメントでは、Drawing Insight Desktopのビルドからデプロイまでの手順を説明します。

## 前提条件

### 開発環境

- **Node.js**: v18.0.0以上
- **npm**: v8.0.0以上
- **Git**: 最新版
- **OS**: Windows 10/11, macOS 10.14+, Ubuntu 18.04+

### 確認コマンド

```bash
node --version    # v18.0.0+
npm --version     # v8.0.0+
git --version     # 2.0.0+
```

## プロジェクトのセットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/genkis3zu/drawing-insight-desktop.git
cd drawing-insight-desktop
```

### 2. 依存関係のインストール

```bash
# 全ての依存関係をインストール
npm install

# インストール確認
npm list --depth=0
```

### 3. 環境設定

```bash
# 環境変数ファイルの作成
cp .env.example .env

# 必要に応じて設定を編集
nano .env
```

環境変数の例：
```bash
# AI API設定
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_VISION_API_KEY=your_google_vision_api_key_here

# データベース設定
DB_ENCRYPTION_KEY=your_encryption_key_here

# 開発設定
NODE_ENV=development
LOG_LEVEL=debug
```

## 開発ビルド

### 開発サーバーの起動

```bash
# 開発用ビルド（ウォッチモード）
npm run dev

# 別ターミナルでElectronを起動
npm run electron
```

### ホットリロード開発

```bash
# 一つのコマンドで開発環境を起動
npm run dev:electron
```

この場合の`package.json`設定例：
```json
{
  "scripts": {
    "dev:electron": "concurrently \"npm run dev\" \"wait-on http://localhost:8080 && electron .\"",
  },
  "devDependencies": {
    "concurrently": "^7.6.0",
    "wait-on": "^7.0.1"
  }
}
```

## プロダクションビルド

### 1. コードの検証

```bash
# TypeScriptの型チェック
npx tsc --noEmit

# ESLintでコード品質チェック
npm run lint

# テストの実行
npm test
```

### 2. プロダクションビルド

```bash
# プロダクション用にビルド
npm run build

# ビルド結果の確認
ls -la dist/
```

### 3. 動作確認

```bash
# ビルドしたアプリを起動
npm start
```

## 配布用パッケージの作成

### 全プラットフォーム

```bash
# 現在のプラットフォーム用にビルド
npm run dist

# 特定のプラットフォーム用にビルド
npm run dist:win    # Windows
npm run dist:mac    # macOS  
npm run dist:linux  # Linux
```

### プラットフォーム別の詳細

#### Windows

```bash
# Windows用実行ファイル作成
npm run dist:win

# 出力ファイル
release/
├── win-unpacked/                    # ポータブル版
│   └── Drawing Insight Desktop.exe
└── Drawing Insight Desktop Setup 1.0.0.exe  # インストーラー
```

**注意**: WSL環境からWindows用インストーラーを作成するには、追加の設定が必要です。

```bash
# WSL環境でのWindows用ビルド
sudo apt update
sudo apt install wine
npm run dist:win
```

#### macOS

```bash
# macOS用アプリケーション作成
npm run dist:mac

# 出力ファイル
release/
├── mac/
│   └── Drawing Insight Desktop.app
└── Drawing Insight Desktop-1.0.0.dmg  # インストーラー
```

**注意**: macOS用のビルドはmacOS環境でのみ可能です。

#### Linux

```bash
# Linux用パッケージ作成
npm run dist:linux

# 出力ファイル
release/
├── linux-unpacked/
│   └── drawing-insight-desktop
└── Drawing Insight Desktop-1.0.0.AppImage
```

## ビルド設定のカスタマイズ

### electron-builderの設定

`package.json`の`build`セクション：

```json
{
  "build": {
    "appId": "com.drawinginsight.desktop",
    "productName": "Drawing Insight Desktop",
    "directories": {
      "output": "release",
      "buildResources": "build"
    },
    "files": [
      "dist/**/*",
      "node_modules/**/*",
      "package.json"
    ],
    "extraFiles": [
      {
        "from": "assets",
        "to": "assets",
        "filter": ["**/*"]
      }
    ],
    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": ["x64"]
        }
      ],
      "icon": "build/icon.ico",
      "publisherName": "Drawing Insight"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "installerIcon": "build/installer.ico",
      "uninstallerIcon": "build/uninstaller.ico",
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true
    },
    "mac": {
      "icon": "build/icon.icns",
      "category": "public.app-category.productivity",
      "target": [
        {
          "target": "dmg",
          "arch": ["x64", "arm64"]
        }
      ]
    },
    "linux": {
      "icon": "build/icon.png",
      "target": [
        {
          "target": "AppImage",
          "arch": ["x64"]
        },
        {
          "target": "deb",
          "arch": ["x64"]
        }
      ],
      "category": "Graphics"
    }
  }
}
```

## アイコンとリソース

### 必要なアイコンファイル

```
build/
├── icon.ico      # Windows用 (256x256)
├── icon.icns     # macOS用   (512x512)
├── icon.png      # Linux用   (512x512)
├── installer.ico # Windows installer用
└── uninstaller.ico # Windows uninstaller用
```

### アイコン作成コマンド

```bash
# PNGからICOへ変換（ImageMagickが必要）
convert icon.png -define icon:auto-resize=256,64,48,32,16 icon.ico

# PNGからICNSへ変換（macOS）
sips -s format icns icon.png --out icon.icns
```

## 自動化されたビルド

### GitHub Actions設定

`.github/workflows/build.yml`:

```yaml
name: Build and Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [windows-latest, macos-latest, ubuntu-latest]

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build application
      run: npm run build
    
    - name: Build distributables
      run: npm run dist
      env:
        GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    
    - name: Upload artifacts
      uses: actions/upload-artifact@v3
      with:
        name: ${{ matrix.os }}-build
        path: release/
```

### ローカルビルドスクリプト

`scripts/build.sh`:

```bash
#!/bin/bash

set -e

echo "🚀 Building Drawing Insight Desktop..."

# 環境確認
echo "📋 Checking environment..."
node --version
npm --version

# 依存関係のインストール
echo "📦 Installing dependencies..."
npm ci

# テストの実行
echo "🧪 Running tests..."
npm test

# Lintチェック
echo "🔍 Running lint..."
npm run lint

# ビルド
echo "🏗️  Building application..."
npm run build

# 配布用パッケージ作成
echo "📱 Creating distribution packages..."
npm run dist

echo "✅ Build completed successfully!"
echo "📁 Output directory: release/"
```

実行方法：
```bash
chmod +x scripts/build.sh
./scripts/build.sh
```

## トラブルシューティング

### よくある問題と解決方法

#### 1. ビルドエラー

**問題**: `Module not found`エラー
```bash
# 解決方法
rm -rf node_modules package-lock.json
npm install
```

**問題**: TypeScriptコンパイルエラー
```bash
# 解決方法
npx tsc --noEmit --skipLibCheck
```

#### 2. electron-builderエラー

**問題**: `Application entry file "dist/main.js" does not exist`
```bash
# 解決方法：まずWebpackビルドを実行
npm run build
npm run dist
```

**問題**: コード署名エラー（macOS）
```bash
# 解決方法：コード署名をスキップ
CSC_IDENTITY_AUTO_DISCOVERY=false npm run dist:mac
```

#### 3. パフォーマンス問題

**問題**: ビルドが遅い
```bash
# 解決方法：並列ビルドを有効化
export ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true
npm run dist -- --parallel
```

**問題**: 大きなファイルサイズ
```bash
# 解決方法：不要なファイルを除外
# package.jsonのbuild.filesを調整
```

#### 4. 依存関係の問題

**問題**: Native moduleのビルドエラー
```bash
# 解決方法：rebuild
npm run rebuild
# または
npx electron-rebuild
```

## セキュリティ考慮事項

### コード署名

#### Windows
```bash
# 証明書を使用してコード署名
export CSC_LINK=/path/to/certificate.p12
export CSC_KEY_PASSWORD=your_password
npm run dist:win
```

#### macOS
```bash
# Apple Developer証明書を使用
export CSC_LINK=/path/to/certificate.p12
export CSC_KEY_PASSWORD=your_password
export APPLE_ID=your_apple_id
export APPLE_ID_PASSWORD=your_app_specific_password
npm run dist:mac
```

### 脆弱性スキャン

```bash
# 依存関係の脆弱性チェック
npm audit

# 修正可能な脆弱性を自動修正
npm audit fix

# セキュリティアップデート
npm update
```

## デプロイ

### GitHub Releases

1. タグを作成
```bash
git tag v1.0.0
git push origin v1.0.0
```

2. GitHub Actionsが自動でビルド・リリース

### 手動リリース

1. ビルドファイルの準備
```bash
npm run dist
```

2. GitHub Releasesページでアップロード
3. リリースノートの作成

### 自動更新

将来の実装では、electron-updaterを使用：

```typescript
import { autoUpdater } from 'electron-updater';

autoUpdater.checkForUpdatesAndNotify();
```

## 継続的インテグレーション

### ビルドの自動化

- プルリクエスト時の自動ビルド
- タグプッシュ時の自動リリース
- テストの自動実行
- セキュリティスキャンの自動実行

### 品質ゲート

- テスト成功率: 100%
- コードカバレッジ: 80%以上
- Lintエラー: 0件
- セキュリティ脆弱性: High/Critical 0件

このビルド・デプロイプロセスにより、安定性と品質を保った配布が可能になります。