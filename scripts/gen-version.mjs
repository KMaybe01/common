import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, '../.vitepress/dist')

if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true })
}

const version = { timestamp: Date.now() }
const filePath = resolve(distDir, 'version.json')

writeFileSync(filePath, JSON.stringify(version))
console.log(`[gen-version] 已生成 version.json (timestamp: ${version.timestamp})`)
