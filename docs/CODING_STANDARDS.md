# コーディング規約

## 概要

本ドキュメントは、Drawing Insight Desktopのコードベースで統一されたコーディングスタイルを維持するための規約です。

## 言語別規約

### TypeScript/JavaScript

#### 命名規則

```typescript
// ファイル名: camelCase
fileHandler.ts
aiService.ts

// クラス名: PascalCase
class DrawingAnalyzer {}

// インターフェース名: PascalCase（Iプレフィックスは使わない）
interface AnalysisResult {}

// 関数名: camelCase
function analyzeDrawing() {}

// 変数名: camelCase
const analysisResult = {};

// 定数名: UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 50 * 1024 * 1024;

// 型パラメータ: 単一大文字または意味のある名前
type Result<T> = { data: T };
type Handler<Request, Response> = (req: Request) => Response;
```

#### 型定義

```typescript
// ✅ Good: 明示的な型定義
interface DrawingFile {
  id: string;
  name: string;
  size: number;
  type: 'jpeg' | 'png' | 'pdf' | 'dwg' | 'dxf';
}

// ❌ Bad: any型の使用
let data: any = fetchData();

// ✅ Good: unknown型を使用して型安全に
let data: unknown = fetchData();
if (isDrawingFile(data)) {
  // dataはDrawingFile型として扱える
}
```

#### 非同期処理

```typescript
// ✅ Good: async/awaitを使用
async function uploadFile(file: File): Promise<Result> {
  try {
    const result = await apiClient.upload(file);
    return result;
  } catch (error) {
    console.error('Upload failed:', error);
    throw new UploadError('ファイルのアップロードに失敗しました');
  }
}

// ❌ Bad: コールバック地獄
uploadFile(file, (err, result) => {
  if (err) {
    handleError(err);
  } else {
    processResult(result, (err2, processed) => {
      // ...
    });
  }
});
```

#### エラーハンドリング

```typescript
// カスタムエラークラスを定義
class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// エラーは適切にキャッチして処理
try {
  await riskyOperation();
} catch (error) {
  if (error instanceof ValidationError) {
    // 検証エラーの処理
  } else if (error instanceof NetworkError) {
    // ネットワークエラーの処理
  } else {
    // 予期しないエラー
    console.error('Unexpected error:', error);
    throw error;
  }
}
```

### React/JSX

#### コンポーネント定義

```tsx
// ✅ Good: 関数コンポーネント + TypeScript
interface FileUploadProps {
  onUpload: (file: File) => void;
  maxSize?: number;
  allowedTypes?: string[];
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onUpload, 
  maxSize = 50 * 1024 * 1024,
  allowedTypes = ['image/jpeg', 'image/png'] 
}) => {
  // コンポーネントロジック
  return (
    <div className="file-upload">
      {/* JSX */}
    </div>
  );
};

// ❌ Bad: クラスコンポーネント（新規作成では避ける）
class FileUpload extends React.Component {
  // ...
}
```

#### Hooks使用規則

```tsx
// ✅ Good: カスタムフックの命名
function useFileUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const upload = useCallback(async (file: File) => {
    // アップロードロジック
  }, []);
  
  return { uploading, progress, upload };
}

// Hooksは条件分岐内で使わない
// ❌ Bad
if (condition) {
  const [state, setState] = useState();
}

// ✅ Good
const [state, setState] = useState();
if (condition) {
  // stateを使用
}
```

#### Props型定義

```tsx
// ✅ Good: 明確なProps型定義
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

// ✅ Good: デフォルト値の設定
const Button: React.FC<ButtonProps> = ({
  variant,
  size = 'medium',
  disabled = false,
  onClick,
  children
}) => {
  // ...
};
```

### Electron特有の規約

#### IPC通信

```typescript
// main/preload.ts
contextBridge.exposeInMainWorld('electronAPI', {
  uploadFile: (filePath: string) => ipcRenderer.invoke('file:upload', filePath),
  onProgress: (callback: (progress: number) => void) => {
    ipcRenderer.on('upload:progress', (_, progress) => callback(progress));
  }
});

// 型定義
interface ElectronAPI {
  uploadFile: (filePath: string) => Promise<UploadResult>;
  onProgress: (callback: (progress: number) => void) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
```

#### セキュリティ

```typescript
// ✅ Good: セキュアな設定
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
    preload: path.join(__dirname, 'preload.js')
  }
});

// ❌ Bad: セキュリティリスクのある設定
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false
  }
});
```

## フォーマッティング

### インデント

- スペース2文字を使用
- タブは使用しない

### 行の長さ

- 最大100文字を推奨
- JSXは読みやすさを優先して改行

### 空白・改行

```typescript
// 関数間は1行空ける
function first() {
  // ...
}

function second() {
  // ...
}

// ブロック内の論理的なグループは空行で区切る
function processData(data: RawData): ProcessedData {
  // 入力検証
  validateInput(data);
  
  // データ変換
  const transformed = transformData(data);
  const normalized = normalizeData(transformed);
  
  // 結果を返す
  return {
    ...normalized,
    processedAt: new Date()
  };
}
```

### インポート

```typescript
// 順序: 外部ライブラリ → 内部モジュール → 型定義
import React, { useState, useEffect } from 'react';
import { Button, Table } from 'antd';
import axios from 'axios';

import { FileUpload } from './components/FileUpload';
import { analyzeDrawing } from './utils/analyzer';

import type { DrawingFile, AnalysisResult } from '../shared/types';
```

## コメント

### ドキュメンテーションコメント

```typescript
/**
 * 図面ファイルを解析してデータを抽出する
 * @param file - 解析する図面ファイル
 * @param options - 解析オプション
 * @returns 解析結果
 * @throws {ValidationError} ファイルが無効な場合
 * @throws {AnalysisError} 解析に失敗した場合
 */
async function analyzeDrawing(
  file: DrawingFile,
  options?: AnalysisOptions
): Promise<AnalysisResult> {
  // ...
}
```

### インラインコメント

```typescript
// ✅ Good: なぜそうするのかを説明
// ファイルサイズが大きい場合は分割処理でメモリ使用量を抑える
if (file.size > LARGE_FILE_THRESHOLD) {
  return processLargeFile(file);
}

// ❌ Bad: コードを読めば分かることを説明
// ファイルサイズをチェック
if (file.size > LARGE_FILE_THRESHOLD) {
  // processLargeFileを呼ぶ
  return processLargeFile(file);
}
```

## Git規約

### ブランチ名

```bash
feature/add-export-function
fix/memory-leak-in-analyzer
docs/update-api-documentation
refactor/simplify-file-handler
```

### コミットメッセージ

```bash
# ✅ Good
feat: CSV形式でのエクスポート機能を追加
fix: 大きなファイルでメモリリークが発生する問題を修正
docs: APIドキュメントを更新

# ❌ Bad
更新
修正
WIP
```

## テスト

### テストファイル名

```
fileHandler.test.ts
FileUpload.test.tsx
```

### テスト構造

```typescript
describe('FileHandler', () => {
  describe('validateFile', () => {
    it('should accept valid file types', () => {
      // テスト
    });
    
    it('should reject invalid file types', () => {
      // テスト
    });
  });
});
```

## パフォーマンス

### メモ化

```tsx
// 重い計算はuseMemoで最適化
const processedData = useMemo(() => {
  return heavyDataProcessing(rawData);
}, [rawData]);

// コールバックはuseCallbackで最適化
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

### 遅延読み込み

```tsx
// 大きなコンポーネントは遅延読み込み
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Suspenseで囲む
<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

## アクセシビリティ

```tsx
// ✅ Good: 適切なARIA属性
<button
  aria-label="ファイルをアップロード"
  aria-busy={uploading}
  disabled={uploading}
>
  {uploading ? 'アップロード中...' : 'アップロード'}
</button>

// ✅ Good: セマンティックなHTML
<nav aria-label="メインナビゲーション">
  <ul>
    <li><a href="#home">ホーム</a></li>
  </ul>
</nav>
```

## まとめ

これらの規約は、コードの可読性、保守性、パフォーマンスを向上させるためのガイドラインです。新しいコードを書く際は、既存のコードスタイルに合わせることを優先し、必要に応じて規約の改善を提案してください。