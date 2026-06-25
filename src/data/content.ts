interface ContentResult {
  content: string
  url: string
}

const lazyModules = import.meta.glob('/S{1,2,3,4,5,6}-*/**/*.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

const urlToFile = new Map<string, string>()

for (const filePath of Object.keys(lazyModules)) {
  let urlPath = filePath.replace(/\.md$/, '')
  if (urlPath.endsWith('/index')) {
    urlPath = urlPath.slice(0, -6)
  }
  urlToFile.set(urlPath, filePath)
}

function stripFrontmatter(raw: string): string {
  const match = raw.match(/^---[\s\S]*?\n---\s*\n/)
  if (!match) return raw
  return raw.slice(match[0].length)
}

export async function loadContent(url: string): Promise<ContentResult | null> {
  const decoded = decodeURIComponent(url)
  const withoutTrailing = decoded.replace(/\/$/, '')

  const filePath = urlToFile.get(decoded) || urlToFile.get(withoutTrailing)
  if (!filePath) return null

  const loadFn = lazyModules[filePath]
  if (!loadFn) return null

  const raw = await loadFn()
  const content = stripFrontmatter(raw)
  return { content, url: withoutTrailing || '/' }
}
