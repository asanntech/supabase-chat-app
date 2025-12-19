import { z } from 'zod'

/** ユーザーエンティティスキーマ */
export const UserSchema = z.object({
  id: z.string().min(1, 'User ID cannot be empty'),
  email: z.email('Invalid email format'),
  username: z.string().min(1, 'Username cannot be empty'),
  avatarUrl: z.url('Invalid URL format').nullable(),
})

/** UserSchemaから推論される型 */
export type UserProps = z.infer<typeof UserSchema>

/** ユーザーエンティティ */
export class User {
  private readonly _props: UserProps

  constructor(
    id: string,
    email: string,
    username: string,
    avatarUrl: string | null
  ) {
    this._props = UserSchema.parse({ id, email, username, avatarUrl })
  }

  get id(): string {
    return this._props.id
  }

  get email(): string {
    return this._props.email
  }

  get username(): string {
    return this._props.username
  }

  get avatarUrl(): string | null {
    return this._props.avatarUrl
  }
}
