# Shared ディレクトリ

このディレクトリには、**共通機能**として複数のfeaturesや層で使用される共有コードが含まれています。

## 構造

```
src/shared/
├── ui/              # 共通UIコンポーネント（コンポーネント単位でフォルダ分割）
│   └── button/
│       ├── button.tsx
│       └── index.ts
├── lib/             # ライブラリを使用した共通機能
├── hooks/           # 汎用hooks
├── constants/       # 定数
├── types/           # 共通型定義
└── utils/           # ユーティリティ関数とヘルパー
    └── cn.ts           # クラス名ユーティリティ関数
```

## 各ディレクトリの責務

### ● ui/

- **共通UIコンポーネント**: 特定のfeatureに属さない再利用可UIコンポーネント
- **shadcn/uiコンポーネント**: プロジェクト全体で使用する基本コンポーネント
- **コンポーネント単位でディレクトリ分割**: 保守性と再利用性を高める

### ● lib/

- **ライブラリ統合**: 外部ライブラリを使用した共通機能
- **設定ラッパー**: 外部ライブラリの設定や初期化コード

### ● hooks/

- **汎用hooks**: featuresに依存しない共有Reactカスタムフック
- **ユーティリティhooks**: ローカルストレージ、メディアクエリなど

### ● constants/

- **定数定義**: アプリケーション全体で使用する定数値
- **環境設定**: 環境別の設定値やフラグ

### ● types/

- **共通型定義**: 複数のfeatureで共有する型定義
- **APIコントラクト**: 共通のAPIレスポンス型、エラー型など

### ● utils/

- **純粋関数**: ビジネスロジックを含まないユーティリティ関数
- **ヘルパー関数**: フォーマット、バリデーション、変換処理など

## パスエイリアス

このディレクトリからのインポートには `@/shared/*` を使用してください：

```typescript
import type { ApiResponse } from '@/shared/types/common'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/utils/cn'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import { API_ENDPOINTS } from '@/shared/constants/api'
```
