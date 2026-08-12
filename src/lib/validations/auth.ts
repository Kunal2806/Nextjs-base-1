import z from 'zod'

export const signupSchema = z.object({
  email: z.email().transform((value) => value.trim().toLowerCase()),
  password: z
    .string()
    .min(8, 'Password must be atleast 8 character')
    .max(128, 'Password is too long'),
  name: z.string().trim().min(2).max(50).optional(),
})

export type SignupInput = z.infer<typeof signupSchema>
