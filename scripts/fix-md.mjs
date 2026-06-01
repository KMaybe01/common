import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'

const rootDir = join(import.meta.dirname, '..')
const walkDir = join(import.meta.dirname, '..')

const unclosedTags = [
  'router-view', 'router-outlet', 'router-link',
  'outlet', 'suspense', 'transition', 'transition-group',
  'ng-container', 'ng-template',
  'mat-table', 'mat-header-cell', 'mat-cell', 'mat-row',
  'nz-spin', 'nz-table', 'nz-menu-item', 'nz-spin',
  'el-table', 'el-table-column',
  'auto-complete', 'button-group', 'loading-spinner',
  'heavy-component'
]

function isInsideFence(lines, index) {
  let fenceCount = 0
  for (let i = 0; i < index; i++) {
    if (/^```/.test(lines[i].trim())) {
      fenceCount++
    }
  }
  return fenceCount % 2 === 1
}

function escapeVueInterpolation(text) {
  return text.replace(/\{\{/g, '&#123;&#123;').replace(/\}\}/g, '&#125;&#125;')
}

function escapeHtmlTags(text) {
  for (const tag of unclosedTags) {
    const regex = new RegExp(`<${tag}(?:\\s[^>]*)?\\s*\\/?>`, 'gi')
    text = text.replace(regex, (match) => {
      return '`' + match + '`'
    })
  }
  return text
}

function processFile(filePath) {
  const content = readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  let changed = false

  const result = lines.map((line, i) => {
    if (isInsideFence(lines, i)) return line

    let updated = line
    const original = line

    if (line.includes('{{') || line.includes('}}')) {
      updated = escapeVueInterpolation(updated)
    }

    for (const tag of unclosedTags) {
      const regex = new RegExp(`<${tag}(?:\\s[^>]*)?\\s*\\/?>`, 'gi')
      if (regex.test(updated)) {
        updated = escapeHtmlTags(updated)
        break
      }
    }

    if (updated !== original) {
      changed = true
    }
    return updated
  })

  if (changed) {
    writeFileSync(filePath, result.join('\n'), 'utf-8')
    console.log(`Fixed: ${filePath}`)
  }
}

function walk(dir) {
  const entries = readdirSync(dir)
  for (const entry of entries) {
    const fullPath = join(dir, entry)
    if (entry === 'node_modules' || entry === '.git' || entry === '.history' || entry === '.vitepress') continue
    if (statSync(fullPath).isDirectory()) {
      walk(fullPath)
    } else if (extname(fullPath) === '.md') {
      processFile(fullPath)
    }
  }
}

console.log('Scanning and fixing markdown files...')
walk(walkDir)
console.log('Done!')
