# Features ディレクトリ

このディレクトリには、**FDD（Feature-First Development）**の思想に基づき、機能単位で整理されたフィーチャーモジュールが含まれています。
各フィーチャーは**DDD（ドメイン駆動設計）**と**クリーンアーキテクチャ**の原則に従った3層構造を採用しています。

## 構造

各フィーチャーモジュールは以下の構造に従う必要があります：

```
src/features/[feature-name]/
├── domain/           # ドメイン層
│   ├── entities/           # エンティティ群
│   │   └── User.ts         # Entity、Value Object、ファクトリー、検証
│   ├── repositories/       # リポジトリインターフェース群
│   │   └── UserRepository.ts
│   └── index.ts            # ドメイン層の統一エクスポート
├── use-cases/        # ユースケース層
│   ├── application/        # ビジネスロジック（UseCaseクラス）
│   └── hooks/              # React hooks（React Query統合）
└── ui/               # UIコンポーネント層
    └── user-card/          # コンポーネント単位でディレクトリ分割
        ├── user-card.tsx
        └── index.ts
```

## レイヤーの責務

### ● domain

- 型／値オブジェクト／変換などの「業務的に意味を持つ」レイヤー
- 副作用禁止
- DTO → Domain モデル変換もここで行う

### ● use-cases

- ユースケースの集約
- ビジネスロジックをカプセル化し、domainとinfrastructureを橋渡し
- **依存方向**: domain → use-cases → ui

### ● ui

- ページ・コンポーネント・プレゼンテーションロジック
- use-casesの hooks を使い、表示ロジックに集中
- コンポーネント単位でディレクトリを分割

## フィーチャー例

- `user/` - ユーザー管理機能
- `room/` - ルーム管理機能
- `authorization/` - User×Roomの認可という独立したドメイン
- `moderation/` - User×Message×Roomの管理という独立したドメイン
- `notification/` - User×Room×Messageの通知という独立したドメイン

### 横断的関心事の取り扱い

複数のEntityやドメインにまたがる処理は、新しいfeatureドメインとして扱います。

**命名ガイドライン：**

- 機能を表す名詞を使用（例：`authorization`, `moderation`, `notification`）
- `-service`サフィックスは避ける
- 簡潔で直感的な名前を選ぶ

## パスエイリアス

このディレクトリからのインポートには `@/features/*` を使用してください：

```typescript
import { CreateUserUseCase } from '@/features/user/use-cases/application/CreateUserUseCase'
import { useCreateUser } from '@/features/user/use-cases/hooks/useCreateUser'
import { User } from '@/features/user/domain/entities/User'
```
