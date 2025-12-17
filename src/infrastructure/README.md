# Infrastructure ディレクトリ

このディレクトリには、**全体インフラ**として外部統合とfeaturesのドメイン層で定義されたリポジトリインターフェースの具象実装が含まれています。

## 構造

```
src/infrastructure/
└── api/              # 汎用API クライアント
    ├── UserApiClient.ts  # ユーザーAPIクライアント（UserRepository実装）
    └── client.ts        # 共通HTTPクライアント設定
```

## 責務

- **Repositoryの具象実装**: features各ドメインで定義されたリポジトリインターフェースを実装
- **外部サービス接続**: HTTP クライアント・データベースアクセスなどの外部依存を処理
- **データ変換**: 外部データ（DTO）をドメインモデルに変換
- **設定管理**: 外部サービスの接続設定や認証情報を管理

## ガイドライン

- **依存逆転の原則**: featuresのドメイン層に依存し、インターフェースを実装する
- **DTO変換**: 外部APIのDTOをDomainモデルに変換する責務を持つ
- **エラーハンドリング**: 外部サービスのエラーを適切なドメインエラーに変換

## 実装例

```typescript
// infrastructure/api/UserApiClient.ts
import { type UserRepository } from '@/features/user/domain/repositories/UserRepository'
import { type User } from '@/features/user/domain/entities/User'

interface UserDto {
  id: string
  name: string
  email: string
  avatar_type: string
  created_at: string
}

export class UserApiClient implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const response = await fetch(`/api/users/${id}`)
    if (!response.ok) return null

    const dto: UserDto = await response.json()
    return this.toDomain(dto) // DTO→Domain変換
  }

  // DTO→Domain変換
  private toDomain(dto: UserDto): User {
    return {
      id: dto.id,
      name: dto.name,
      email: dto.email,
      avatarType: dto.avatar_type,
      createdAt: new Date(dto.created_at),
    }
  }
}
```

## パスエイリアス

このディレクトリからのインポートには `@/infrastructure/*` を使用してください：

```typescript
import { UserApiClient } from '@/infrastructure/api/UserApiClient'
import { userApiClient } from '@/infrastructure/api/UserApiClient'
```
