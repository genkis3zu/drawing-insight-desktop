# API ドキュメント

## 概要

本ドキュメントでは、Drawing Insight Desktopの内部API設計について説明します。主にElectronのIPCを通じたメインプロセスとレンダラープロセス間の通信仕様を定義しています。

## IPC API 仕様

### ファイル操作 API

#### `file:validate`

ファイルの検証を行います。

**リクエスト**
```typescript
interface FileValidationRequest {
  name: string;
  size: number;
  type: string;
  path?: string;
}
```

**レスポンス**
```typescript
interface FileValidationResponse {
  isValid: boolean;
  errors?: ValidationError[];
  warnings?: string[];
}

interface ValidationError {
  code: string;
  message: string;
  field?: string;
}
```

**使用例**
```typescript
const result = await window.electronAPI.validateFile({
  name: 'drawing.pdf',
  size: 1024000,
  type: 'application/pdf'
});

if (!result.isValid) {
  console.error('Validation errors:', result.errors);
}
```

#### `file:upload`

ファイルのアップロード処理を行います。

**リクエスト**
```typescript
interface FileUploadRequest {
  filePath: string;
  metadata?: FileMetadata;
}

interface FileMetadata {
  description?: string;
  tags?: string[];
  project?: string;
}
```

**レスポンス**
```typescript
interface FileUploadResponse {
  fileId: string;
  uploadedAt: Date;
  checksum: string;
  processedPath: string;
}
```

### AI解析 API

#### `ai:analyze`

図面の AI 解析を実行します。

**リクエスト**
```typescript
interface AnalysisRequest {
  fileId: string;
  options?: AnalysisOptions;
}

interface AnalysisOptions {
  aiProvider: 'openai' | 'google';
  model?: string;
  extractDimensions?: boolean;
  extractParts?: boolean;
  extractMaterials?: boolean;
  extractText?: boolean;
  language?: 'ja' | 'en';
}
```

**レスポンス**
```typescript
interface AnalysisResponse {
  analysisId: string;
  status: 'started' | 'completed' | 'failed';
  result?: AnalysisResult;
  error?: ErrorInfo;
}

interface AnalysisResult {
  id: string;
  fileId: string;
  title?: string;
  drawingNumber?: string;
  dimensions: Dimension[];
  partsList: Part[];
  materials: Material[];
  confidence: number;
  processingTime: number;
  aiModel: string;
  analyzedAt: Date;
}
```

#### `ai:status`

進行中の解析の状況を取得します。

**リクエスト**
```typescript
interface StatusRequest {
  analysisId: string;
}
```

**レスポンス**
```typescript
interface StatusResponse {
  analysisId: string;
  status: 'pending' | 'analyzing' | 'completed' | 'failed';
  progress: number; // 0-100
  currentStep?: string;
  estimatedTimeRemaining?: number; // seconds
  error?: ErrorInfo;
}
```

### データベース API

#### `db:save`

解析結果をデータベースに保存します。

**リクエスト**
```typescript
interface SaveRequest {
  analysis: AnalysisResult;
  overwrite?: boolean;
}
```

**レスポンス**
```typescript
interface SaveResponse {
  success: boolean;
  analysisId: string;
  savedAt: Date;
  error?: ErrorInfo;
}
```

#### `db:getAll`

保存された解析結果を取得します。

**リクエスト**
```typescript
interface GetAllRequest {
  filters?: FilterOptions;
  pagination?: PaginationOptions;
  sorting?: SortingOptions;
}

interface FilterOptions {
  dateRange?: {
    from: Date;
    to: Date;
  };
  fileTypes?: string[];
  searchQuery?: string;
  minConfidence?: number;
}

interface PaginationOptions {
  page: number;
  limit: number;
}

interface SortingOptions {
  field: 'analyzedAt' | 'fileName' | 'confidence';
  order: 'asc' | 'desc';
}
```

**レスポンス**
```typescript
interface GetAllResponse {
  analyses: AnalysisResult[];
  totalCount: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
```

#### `db:update`

既存の解析結果を更新します。

**リクエスト**
```typescript
interface UpdateRequest {
  analysisId: string;
  updates: Partial<AnalysisResult>;
}
```

**レスポンス**
```typescript
interface UpdateResponse {
  success: boolean;
  updatedAt: Date;
  error?: ErrorInfo;
}
```

#### `db:delete`

解析結果を削除します。

**リクエスト**
```typescript
interface DeleteRequest {
  analysisId: string;
  deleteFile?: boolean; // 関連ファイルも削除するか
}
```

**レスポンス**
```typescript
interface DeleteResponse {
  success: boolean;
  deletedAt: Date;
  error?: ErrorInfo;
}
```

### エクスポート API

#### `export:data`

データを指定形式でエクスポートします。

**リクエスト**
```typescript
interface ExportRequest {
  format: 'csv' | 'excel' | 'json' | 'pdf';
  data: AnalysisResult[];
  options?: ExportOptions;
}

interface ExportOptions {
  includeImages?: boolean;
  columns?: string[];
  template?: string;
  fileName?: string;
  destination?: string;
}
```

**レスポンス**
```typescript
interface ExportResponse {
  success: boolean;
  filePath: string;
  fileSize: number;
  exportedAt: Date;
  error?: ErrorInfo;
}
```

### 設定 API

#### `settings:get`

アプリケーション設定を取得します。

**リクエスト**
```typescript
interface GetSettingsRequest {
  category?: 'general' | 'ai' | 'export' | 'security';
}
```

**レスポンス**
```typescript
interface GetSettingsResponse {
  settings: AppSettings;
}

interface AppSettings {
  general: {
    language: string;
    theme: 'light' | 'dark' | 'auto';
    autoSave: boolean;
    maxFileSize: number;
  };
  ai: {
    defaultProvider: 'openai' | 'google';
    timeout: number;
    retryCount: number;
  };
  export: {
    defaultFormat: string;
    includeMetadata: boolean;
  };
  security: {
    encryptDatabase: boolean;
    requireAuth: boolean;
  };
}
```

#### `settings:update`

アプリケーション設定を更新します。

**リクエスト**
```typescript
interface UpdateSettingsRequest {
  settings: Partial<AppSettings>;
}
```

**レスポンス**
```typescript
interface UpdateSettingsResponse {
  success: boolean;
  updatedAt: Date;
  restartRequired?: boolean;
  error?: ErrorInfo;
}
```

## イベント API

### 進捗イベント

#### `analysis:progress`

解析の進捗を通知します。

**イベントデータ**
```typescript
interface ProgressEvent {
  analysisId: string;
  progress: number; // 0-100
  currentStep: string;
  stepDetails?: string;
  estimatedTimeRemaining?: number;
}
```

**使用例**
```typescript
window.electronAPI.onProgress((progress) => {
  console.log(`Analysis ${progress.analysisId}: ${progress.progress}%`);
  updateProgressBar(progress.progress);
});
```

#### `analysis:completed`

解析完了を通知します。

**イベントデータ**
```typescript
interface CompletedEvent {
  analysisId: string;
  result: AnalysisResult;
  processingTime: number;
}
```

#### `analysis:error`

解析エラーを通知します。

**イベントデータ**
```typescript
interface ErrorEvent {
  analysisId: string;
  error: ErrorInfo;
  timestamp: Date;
}

interface ErrorInfo {
  code: string;
  message: string;
  details?: any;
  stack?: string;
}
```

### ファイルイベント

#### `file:uploaded`

ファイルアップロード完了を通知します。

**イベントデータ**
```typescript
interface FileUploadedEvent {
  fileId: string;
  fileName: string;
  fileSize: number;
  uploadedAt: Date;
}
```

#### `file:deleted`

ファイル削除を通知します。

**イベントデータ**
```typescript
interface FileDeletedEvent {
  fileId: string;
  fileName: string;
  deletedAt: Date;
}
```

### システムイベント

#### `app:update-available`

アプリケーション更新が利用可能な場合に通知します。

**イベントデータ**
```typescript
interface UpdateAvailableEvent {
  version: string;
  releaseNotes: string;
  downloadSize: number;
  releaseDate: Date;
}
```

## エラーコード

### ファイル関連エラー

| コード | メッセージ | 説明 |
|--------|-----------|------|
| `FILE_TOO_LARGE` | ファイルサイズが上限を超えています | ファイルサイズが50MBを超過 |
| `FILE_TYPE_NOT_SUPPORTED` | サポートされていないファイル形式です | 対応外のファイル形式 |
| `FILE_CORRUPTED` | ファイルが破損している可能性があります | ファイル読み込みエラー |
| `FILE_NOT_FOUND` | ファイルが見つかりません | 指定されたファイルが存在しない |

### AI解析関連エラー

| コード | メッセージ | 説明 |
|--------|-----------|------|
| `AI_API_ERROR` | AI APIへの接続に失敗しました | API通信エラー |
| `AI_QUOTA_EXCEEDED` | APIクォータを超過しました | 使用量制限に達した |
| `AI_ANALYSIS_FAILED` | 図面の解析に失敗しました | 解析処理でエラー |
| `AI_INVALID_RESPONSE` | 無効なレスポンスを受信しました | APIレスポンス形式エラー |

### データベース関連エラー

| コード | メッセージ | 説明 |
|--------|-----------|------|
| `DB_CONNECTION_FAILED` | データベースへの接続に失敗しました | DB接続エラー |
| `DB_WRITE_ERROR` | データの保存に失敗しました | 書き込みエラー |
| `DB_READ_ERROR` | データの読み込みに失敗しました | 読み込みエラー |
| `DB_RECORD_NOT_FOUND` | 指定されたレコードが見つかりません | レコード不存在 |

## 認証・セキュリティ

### APIキー管理

AI APIキーの管理方法：

```typescript
// 設定で管理
interface AIConfig {
  openai: {
    apiKey: string;
    organization?: string;
  };
  google: {
    apiKey: string;
    projectId?: string;
  };
}

// 使用例
await window.electronAPI.setAIConfig({
  openai: {
    apiKey: 'sk-...',
  }
});
```

### データ暗号化

機密データの暗号化：

```typescript
interface EncryptionConfig {
  algorithm: 'AES-256-GCM';
  keyDerivation: 'PBKDF2';
  iterations: number;
}
```

## レート制限

### AI API制限

- OpenAI: 1分間に60リクエスト
- Google Vision: 1分間に1000リクエスト

### 内部API制限

- ファイルアップロード: 同時5ファイルまで
- 解析実行: 同時3解析まで

## バージョニング

APIバージョンの管理：

```typescript
interface APIVersion {
  major: number;
  minor: number;
  patch: number;
  compatibilityLevel: 'compatible' | 'breaking' | 'deprecated';
}

// バージョン確認
const apiVersion = await window.electronAPI.getAPIVersion();
```

## SDK（将来実装）

### JavaScript SDK

```typescript
import { DrawingInsightAPI } from 'drawing-insight-sdk';

const api = new DrawingInsightAPI({
  endpoint: 'http://localhost:3000',
  apiKey: 'your-api-key'
});

// ファイル解析
const result = await api.analyzeFile('path/to/drawing.pdf');
```

### REST API（将来実装）

HTTPベースのAPI提供：

```http
POST /api/v1/analyze
Content-Type: multipart/form-data

{
  "file": <binary>,
  "options": {
    "extractDimensions": true
  }
}
```

## デバッグ・ログ

### ログ出力

```typescript
interface LogEntry {
  timestamp: Date;
  level: 'debug' | 'info' | 'warn' | 'error';
  category: string;
  message: string;
  metadata?: any;
}

// ログ取得
const logs = await window.electronAPI.getLogs({
  level: 'error',
  since: new Date('2024-01-01')
});
```

### パフォーマンス監視

```typescript
interface PerformanceMetrics {
  analysisTime: number;
  memoryUsage: number;
  cpuUsage: number;
  apiResponseTime: number;
}

const metrics = await window.electronAPI.getPerformanceMetrics();
```

このAPI仕様に基づいて、安全で効率的なElectronアプリケーションのIPC通信が実現されます。