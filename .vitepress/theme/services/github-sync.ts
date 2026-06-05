import { getToken } from './github-auth'

const SYNC_META_KEY = 'quiz-sync-meta-v1'

interface SyncFile {
  version: number
  updatedAt: string
  progress: Record<string, string>
}

interface SyncMeta {
  repoOwner: string
  repoName: string
  filePath: string
  lastSyncedAt: string | null
  sha: string | null
}

function getDefaultMeta(): SyncMeta {
  try {
    const raw = localStorage.getItem(SYNC_META_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { repoOwner: '', repoName: 'quiz-progress', filePath: 'progress.json', lastSyncedAt: null, sha: null }
}

function saveMeta(meta: SyncMeta): void {
  localStorage.setItem(SYNC_META_KEY, JSON.stringify(meta))
}

export function getSyncMeta(): SyncMeta {
  return getDefaultMeta()
}

export function configureRepo(owner: string, repo: string, path = 'progress.json'): void {
  const meta = getDefaultMeta()
  meta.repoOwner = owner
  meta.repoName = repo
  meta.filePath = path
  meta.sha = null
  saveMeta(meta)
}

export function getLastSyncTime(): string | null {
  return getDefaultMeta().lastSyncedAt
}

async function api(path: string, method: string, body?: unknown): Promise<Response> {
  const token = getToken()
  if (!token) throw new Error('未登录')
  return fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
}

export async function fetchRemoteProgress(): Promise<Record<string, string> | null> {
  const meta = getDefaultMeta()
  if (!meta.repoOwner) throw new Error('尚未配置同步仓库')

  const res = await api(`/repos/${meta.repoOwner}/${meta.repoName}/contents/${meta.filePath}`, 'GET')
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`读取远程数据失败: ${res.status}`)

  const data = await res.json()
  const content = atob(data.content)
  const file: SyncFile = JSON.parse(content)
  meta.sha = data.sha
  saveMeta(meta)
  return file.progress || null
}

async function ensureRepoExists(owner: string, repo: string): Promise<void> {
  const exists = await checkRepoExists(owner, repo)
  if (exists) return

  const res = await api('/user/repos', 'POST', {
    name: repo,
    private: true,
    auto_init: false,
    description: '刷题进度同步',
  })
  if (!res.ok) {
    const err = await res.json()
    if (res.status === 404) {
      throw new Error(`仓库 ${owner}/${repo} 不存在且无法自动创建。请确认：\n1. Token 有 repo 权限\n2. 在 GitHub 手动创建仓库 ${owner}/${repo}`)
    }
    throw new Error(err.message || `创建仓库失败: ${res.status}`)
  }
}

export async function pushProgress(progress: Record<string, string>): Promise<void> {
  const meta = getDefaultMeta()
  if (!meta.repoOwner) throw new Error('尚未配置同步仓库')

  await ensureRepoExists(meta.repoOwner, meta.repoName)

  const now = new Date().toISOString()
  const file: SyncFile = { version: 1, updatedAt: now, progress }
  const content = btoa(JSON.stringify(file, null, 2))

  const body: Record<string, unknown> = {
    message: `sync quiz progress ${now}`,
    content,
  }
  if (meta.sha) body.sha = meta.sha

  const res = await api(`/repos/${meta.repoOwner}/${meta.repoName}/contents/${meta.filePath}`, 'PUT', body)
  if (!res.ok) {
    const err = await res.json()
    const msg = err.message || res.status
    throw new Error(`推送数据失败: ${msg}\n请检查仓库 ${meta.repoOwner}/${meta.repoName} 是否存在，以及 Token 是否有 repo 权限`)
  }

  const result = await res.json()
  meta.sha = result.content?.sha || null
  meta.lastSyncedAt = now
  saveMeta(meta)
}

export function mergeProgress(
  local: Record<string, string>,
  remote: Record<string, string> | null,
): Record<string, string> {
  if (!remote) return { ...local }
  const merged = { ...remote }
  for (const [id, status] of Object.entries(local)) {
    merged[id] = status
  }
  return merged
}

export function checkRepoExists(owner: string, repo: string): Promise<boolean> {
  return api(`/repos/${owner}/${repo}`, 'HEAD')
    .then(r => r.ok)
    .catch(() => false)
}
