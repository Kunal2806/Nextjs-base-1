import { eq } from 'drizzle-orm'

import { db, users } from '@/db/index'
import { randomUUID } from 'crypto'

export async function findUserByEmail(email: string) {
  return db.query.users.findFirst({
    where: eq(users.email, email),
  })
}
export async function createUser({
  email,
  name,
  passwordHash,
}: {
  email: string
  name?: string
  passwordHash: string
}) {
  const [user] = await db
    .insert(users)
    .values({
      id: randomUUID(),
      email,
      name,
      passwordHash,
    })
    .returning()

  return user
}