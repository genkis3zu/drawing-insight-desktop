# Drawing Insight Desktop - ドキュメント

このディレクトリには、Drawing Insight Desktopの開発・運用に関するドキュメントが含まれています。

## 📚 ドキュメント一覧

### 開発者向けドキュメント

| ドキュメント | 説明 | 対象者 |
|-------------|------|-------|
| [開発ガイドライン](./DEVELOPMENT_GUIDE.md) | 開発環境の構築、開発フロー、ベストプラクティス | 開発者・AI |
| [コーディング規約](./CODING_STANDARDS.md) | TypeScript、React、Electronのコーディング規約 | 開発者・AI |
| [アーキテクチャ](./ARCHITECTURE.md) | システム設計、プロセス構成、データフロー | アーキテクト・開発者 |
| [ビルド手順](./BUILD.md) | ビルド、デプロイ、配布の詳細手順 | DevOps・開発者 |
| [API仕様](./API.md) | IPC通信、内部API、イベントの仕様 | 開発者・インテグレーター |

## 🎯 ドキュメント利用ガイド

### 新規開発者の場合

1. **[開発ガイドライン](./DEVELOPMENT_GUIDE.md)** から開始
2. **[コーディング規約](./CODING_STANDARDS.md)** でコーディングルールを確認
3. **[アーキテクチャ](./ARCHITECTURE.md)** でシステム全体を理解
4. **[API仕様](./API.md)** で実装時の詳細を確認

### AI（Claude Code）の場合

1. **[開発ガイドライン](./DEVELOPMENT_GUIDE.md)** でプロジェクト構造と開発フローを理解
2. **[コーディング規約](./CODING_STANDARDS.md)** で書くべきコードスタイルを確認
3. **[アーキテクチャ](./ARCHITECTURE.md)** でシステム設計の制約を理解
4. **[API仕様](./API.md)** で実装すべきインターフェースを確認

### ビルド・デプロイ担当者の場合

1. **[ビルド手順](./BUILD.md)** で環境構築とビルドプロセスを確認
2. **[開発ガイドライン](./DEVELOPMENT_GUIDE.md)** で全体フローを理解

## 🔄 ドキュメント更新

### 更新が必要なタイミング

- 新機能の追加時
- アーキテクチャの変更時
- ビルドプロセスの変更時
- API仕様の変更時
- ベストプラクティスの更新時

### 更新手順

1. 該当ドキュメントを編集
2. 関連する他のドキュメントも確認・更新
3. README.mdの内容と整合性を確認
4. コミット時に`docs:`プレフィックスを使用

例：
```bash
git commit -m "docs: API仕様にエクスポート機能の詳細を追加"
```

## 📋 各ドキュメントの詳細

### [開発ガイドライン](./DEVELOPMENT_GUIDE.md)
- 開発環境のセットアップ
- プロジェクト構造の説明
- 開発フローとベストプラクティス
- アンチパターンの説明
- デバッグ・トラブルシューティング

### [コーディング規約](./CODING_STANDARDS.md)
- TypeScript/JavaScript規約
- React/JSX規約
- Electron特有の規約
- フォーマッティングルール
- コメント・ドキュメンテーション規約

### [アーキテクチャ](./ARCHITECTURE.md)
- システム全体構成
- メインプロセス・レンダラープロセス設計
- データフロー
- セキュリティアーキテクチャ
- パフォーマンス設計

### [ビルド手順](./BUILD.md)
- 開発環境構築
- ビルドプロセス
- 配布パッケージ作成
- CI/CD設定
- トラブルシューティング

### [API仕様](./API.md)
- IPC通信仕様
- イベントAPI
- エラーコード
- データモデル
- 使用例とサンプルコード

## 🤝 ドキュメント貢献

### 改善提案

ドキュメントの改善提案は以下の方法で受け付けています：

1. **GitHub Issues**: 誤記や不明確な箇所の報告
2. **Pull Request**: 直接的な改善提案
3. **Discussions**: ドキュメント構成や内容についての議論

### 品質基準

- **正確性**: 最新のコードと一致している
- **完全性**: 必要な情報が漏れなく記載されている
- **明確性**: 読み手にとって理解しやすい
- **一貫性**: 用語や記法が統一されている

## 📖 参考資料

### 外部ドキュメント

- [Electron Documentation](https://electronjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://typescriptlang.org/docs/)
- [Ant Design Documentation](https://ant.design/docs/react/introduce)
- [Node.js Documentation](https://nodejs.org/docs/)

### 関連リソース

- [GitHub Repository](https://github.com/genkis3zu/drawing-insight-desktop)
- [Issues Tracker](https://github.com/genkis3zu/drawing-insight-desktop/issues)
- [Discussions](https://github.com/genkis3zu/drawing-insight-desktop/discussions)

---

*このドキュメントは開発の進行に合わせて継続的に更新されます。*