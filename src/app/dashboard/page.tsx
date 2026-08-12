import { redirect } from 'next/navigation'

import { getSession } from '@/server/auth/session'

export default async function DashboardPage() {
  const session = await getSession()

  if (!session?.user) {
    redirect('/login')
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 p-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-white/60">Protected route</p>
        <h1 className="mt-2 text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-white/80">
          Welcome, {session.user.name ?? 'User'}
        </p>
        <p className="text-sm text-white/60">{session.user.email}</p>

        <form
          action="/api/auth/signout"
          method="post"
          className="mt-6"
        >
          <button
            type="submit"
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
          >
            Sign out
          </button>
        </form>
      </div>
    </main>
  )
}