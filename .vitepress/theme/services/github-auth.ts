interface GitHubUser {
  login: string
  avatar_url: string
  name: string | null
}

const AUTH_KEY = 'github-auth-v1'

export function isLoggedIn(): boolean {
  try {
    const data = localStorage.getItem(AUTH_KEY)
    if (!data) return false
    const parsed = JSON.parse(data)
    return !!parsed.token && !!parsed.user
  } catch {
    return false
  }
}

export function getUser(): GitHubUser | null {
  try {
    const data = localStorage.getItem(AUTH_KEY)
    if (!data) return null
    return JSON.parse(data).user || null
  } catch {
    return null
  }
}

export function getToken(): string | null {
  try {
    const data = localStorage.getItem(AUTH_KEY)
    if (!data) return null
    return JSON.parse(data).token || null
  } catch {
    return null
  }
}

export async function loginWithPat(pat: string): Promise<GitHubUser> {
  const trimmed = pat.trim()
  if (!trimmed) throw new Error('请输入 Personal Access Token')

  const res = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${trimmed}` },
  })
  if (!res.ok) {
    if (res.status === 401) throw new Error('Token 无效，请检查是否有 repo 权限')
    throw new Error(`验证失败: ${res.status}`)
  }

  const user: GitHubUser = await res.json()
  localStorage.setItem(AUTH_KEY, JSON.stringify({ token: trimmed, user }))
  return user
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY)
}
