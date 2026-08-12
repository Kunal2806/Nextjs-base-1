import Credentials from 'next-auth/providers/credentials'
import NextAuth, { type NextAuthOptions } from 'next-auth'

import { verifyPassword } from '@/server/auth/password'
import { findUserByEmail } from '@/server/auth/users'

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,

  session: {
    strategy: 'jwt',
  },

  providers: [
    Credentials({
      name: 'Credentials',

      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await findUserByEmail(credentials.email)

        if (!user) {
          return null
        }

        const valid = await verifyPassword(
          credentials.password,
          user.passwordHash
        )

        if (!valid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
}

const authHandler = NextAuth(authOptions)

export default authHandler