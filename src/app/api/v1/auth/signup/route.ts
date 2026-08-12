import { NextResponse } from 'next/server'

import { signupSchema } from '@/lib/validations/auth'
import { hashPassword } from '@/server/auth/password'
import { createUser, findUserByEmail } from '@/server/auth/users'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = signupSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error.issues[0]?.message ?? 'Invalid request',
          errors: result.error.issues,
        },
        { status: 400 }
      )
    }

    const { email, password, name } = result.data

    const existingUser = await findUserByEmail(email)

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'User already exists',
        },
        { status: 409 }
      )
    }

    const passwordHash = await hashPassword(password)

    const user = await createUser({
      email,
      name,
      passwordHash,
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        message: 'User created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    )
  }
}