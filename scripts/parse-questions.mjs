import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, relative, sep } from 'path'

const root = process.cwd()
const posix = (p) => p.split(sep).join('/')

// All files to parse with their category
const categoryMap = {
  'S1-基础夯实/01-HTML.md':                    { id: 'html',     name: 'HTML',       icon: '📄' },
  'S1-基础夯实/02-CSS.md':                     { id: 'css',      name: 'CSS',        icon: '🎨' },
  'S1-基础夯实/03-JavaScript-核心.md':          { id: 'js-core',  name: 'JS核心',     icon: '⚡' },
  'S1-基础夯实/04-JavaScript-WebAPI.md':       { id: 'js-api',   name: 'JS WebAPI',  icon: '🌐' },
  'S2-框架深入/01-Vue3学习指南.md':             { id: 'vue3-l',   name: 'Vue3学习',   icon: '📗' },
  'S2-框架深入/02-Vue3.md':                    { id: 'vue3',     name: 'Vue3面试',   icon: '🟢' },
  'S2-框架深入/03-React19学习指南.md':          { id: 'react-l',  name: 'React19学习',icon: '📘' },
  'S2-框架深入/04-React19.md':                 { id: 'react',    name: 'React19面试',icon: '🔵' },
  'S2-框架深入/05-Angular20学习指南.md':       { id: 'ng-l',     name: 'Angular20学习', icon: '📙' },
  'S2-框架深入/06-Angular20.md':               { id: 'angular',  name: 'Angular20面试', icon: '🔴' },
  'S2-框架深入/07-框架对比.md':                 { id: 'compare',  name: '框架对比',   icon: '🔄' },
  'S3-进阶提升/01-浏览器原理.md':               { id: 'browser',  name: '浏览器原理', icon: '🌍' },
  'S3-进阶提升/02-性能优化.md':                 { id: 'perf',     name: '性能优化',   icon: '🚀' },
  'S3-进阶提升/03-前端工程化.md':               { id: 'eng',      name: '前端工程化', icon: '🛠️' },
  'S3-进阶提升/04-算法题解.md':                 { id: 'algo',     name: '算法题解',   icon: '🧮' },
  'S3-进阶提升/05-计算机网络.md':               { id: 'network',  name: '网络',       icon: '🌐' },
  'S3-进阶提升/06-前端监控与埋点.md':           { id: 'monitor',  name: '监控埋点',   icon: '📊' },
  'S3-进阶提升/07-Node.js与服务端.md':         { id: 'node',     name: 'Node.js',    icon: '💚' },
  'S4-面试冲刺/03-反向面试.md':                 { id: 'reverse',  name: '反向面试',   icon: '💬' },
  'S4-面试冲刺/06-LI-OAM 网元运维与数据管理系统.md': { id: 'lioam', name: 'LI-OAM', icon: '⚙️' },
  'S5-AI/01-入门期-AI聊天室.md':               { id: 'ai-chat',  name: 'AI聊天室',   icon: '🤖' },
  'S5-AI/02-进阶期-RAG应用.md':                { id: 'ai-rag',   name: 'AI RAG',     icon: '📚' },
  'S5-AI/03-深耕期-端侧推理.md':               { id: 'ai-edge',  name: '端侧推理',   icon: '🔌' },
  'S5-AI/04-专家期-Agent设计.md':              { id: 'ai-agent', name: 'AI Agent',   icon: '🧠' },
  'S5-AI/05-生产化与工程化.md':                 { id: 'ai-prod',  name: 'AI工程化',   icon: '🏭' },
  'S5-AI/06-前沿技术与生态.md':                 { id: 'ai-eco',   name: 'AI生态',     icon: '🌱' },
  'S5-AI/07-技术选型对比合集.md':               { id: 'ai-compare', name: 'AI选型对比', icon: '⚖️' },
  'S5-AI/08-开发实战与架构指南.md':             { id: 'ai-arch',  name: 'AI架构',     icon: '🏗️' },
  'S5-AI/10-基础篇.md':                       { id: 'ai-basic', name: 'AI基础',     icon: '📖' },
  'S5-AI/11-工具协议篇.md':                    { id: 'ai-tool',  name: 'AI工具',     icon: '🔧' },
  'S5-AI/12-大模型基础篇.md':                   { id: 'ai-llm',   name: 'AI大模型',   icon: '🧠' },
  'S5-AI/13-框架工具链篇.md':                   { id: 'ai-fw',    name: 'AI框架',     icon: '📦' },
  'S5-AI/14-实战项目篇.md':                    { id: 'ai-proj',  name: 'AI实战',     icon: '🚀' },
  'S5-AI/15-前沿趋势篇.md':                    { id: 'ai-trend', name: 'AI前沿',     icon: '🔮' },
  'S6-Go/Go常识.md':                          { id: 'go',       name: 'Go',         icon: '🐹' },
}

// Regex patterns for different Q&A formats
const Q3_RE = /^### Q(\d+)[：:]\s*(.+)/    // ### Q1：... or ### Q1:...
const Q2_RE = /^## Q(\d+)[：:]\s*(.+)/     // ## Q1：... or ## Q1:...
const Q5_RE = /^##### Q(\d+)[：:]\s*(.+)/  // ##### Q1：...
const TOPIC_H3_RE = /^### (?:[1-9]️⃣|[0-9]+️⃣)\s+(.+)/  // ### 1️⃣ topic
const TOPIC_DOT_H3_RE = /^### (?:[0-9]+)\.\s+(.+)/      // ### 1. topic
const TOPIC_PLAIN_H3_RE = /^### (.+)/                     // ### plain topic
const TOPIC_H4_RE = /^#### (?:[0-9]+\.[0-9]+)\s+(.+)/   // #### 1.1 topic
const TOPIC_PLAIN_H4_RE = /^#### (.+)/                    // #### plain topic
const ALGO_RE = /^### (\d+)\.\s+(.+?)(?:\s+[🟢🟡🔴])?\s*$/  // ### 1. 两数之和 🟢

function clean(str) {
  return str.trim().replace(/\s+/g, ' ')
}

function extractQA(content, regex, lines) {
  const questions = []
  let current = null

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(regex)
    if (m) {
      if (current) questions.push(current)
      current = {
        num: parseInt(m[1]),
        question: clean(m[2]),
        answer: '',
      }
    } else if (current) {
      if (current.answer) current.answer += '\n'
      current.answer += lines[i]
    }
  }
  if (current) questions.push(current)

  return questions.map(q => ({
    ...q,
    answer: q.answer.replace(/\n{3,}/g, '\n\n').trim(),
  }))
}

// Extract H2 lesson sections from 学习指南 files as separate questions
function extractH2Lessons(lines, category, idPrefix) {
  const questions = []
  let current = null
  let idx = 0
  const skipH2 = /^(?:#{1,2}\s+(?:[📌🧠📈📖📝💡🔗📚🛠️💻🔤🔒⚙️🌐✨🧩📦🔧🔄📝]|知识脑图|版本|学习|阅读|前置|你将学到|核心能力|目录))/i
  const lessonRe = /^## (\d+-\d+)\s+(.+)/  // ## 1-1 lesson name

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const m = line.match(lessonRe)
    if (m) {
      if (current && current.answer.trim()) questions.push(current)
      idx++
      current = {
        num: idx,
        question: clean(m[2]),
        answer: '',
      }
    } else if (current) {
      // Stop at Q&A section or next major heading
      if (/^##\s+Q\d+[：:]/.test(line) || /^#\s+/.test(line)) {
        if (current.answer.trim()) questions.push(current)
        current = null
        break
      }
      if (current.answer) current.answer += '\n'
      current.answer += line
    }
  }
  if (current && current.answer.trim()) questions.push(current)

  return questions
    .filter(q => q.answer.trim().length > 20)
    .map(q => ({
      id: `${idPrefix}-lesson-q${q.num}`,
      category,
      question: q.question,
      answer: q.answer.replace(/\n{3,}/g, '\n\n').trim(),
    }))
}

function isHeading(line) {
  return line.startsWith('## ') || line.startsWith('### ') || line.startsWith('#### ') || line.startsWith('##### ')
}

function extractTopics(content, lines, category, idPrefix) {
  const questions = []
  let currentTopic = null
  let topicIdx = 0
  // Skip intro headings like #, ## 🧠, ## 📈, ## 📌 etc.
  const skipH2 = /^(?:#{1,2}\s+(?:[📌🧠📈📖📝💡🔗📚🛠️💻🔤🔒⚙️🌐✨🧩📦🔧🔄📝]|知识脑图|版本|学习|阅读|前置|你将学到|核心能力|目录))/i

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Skip H1 and H2 lines (chapter-level), only capture H3/H4
    if (line.startsWith('# ') || line.startsWith('## ')) {
      if (currentTopic && currentTopic.answer.trim()) {
        questions.push(currentTopic)
        currentTopic = null
      }
      continue
    }

    let m = null
    let isH3 = false
    let isH4 = false

    if (line.startsWith('### ')) {
      isH3 = true
      m = line.match(TOPIC_H3_RE) || line.match(TOPIC_DOT_H3_RE) || line.match(TOPIC_PLAIN_H3_RE)
    } else if (line.startsWith('#### ')) {
      isH4 = true
      m = line.match(TOPIC_H4_RE) || line.match(TOPIC_PLAIN_H4_RE)
    }

    if (m && m[1]) {
      const title = clean(m[1])
      // Skip non-topic headings
      if (skipH2.test(line) || /^(?:你将学到|前置知识|核心能力|知识脑图|版本演进|目录|阅读指南|学习路径|摘要|概述|总结|总览|参考|附录|致谢|版权声明|格式说明|难度|建议|面试星级|适用场景)/.test(title)) {
        continue
      }
      if (currentTopic && currentTopic.answer.trim()) {
        questions.push(currentTopic)
      }
      topicIdx++
      currentTopic = {
        num: topicIdx,
        question: title,
        answer: '',
      }
    } else if (currentTopic) {
      if (currentTopic.answer) currentTopic.answer += '\n'
      currentTopic.answer += line
    }
  }
  if (currentTopic && currentTopic.answer.trim()) {
    questions.push(currentTopic)
  }

  // Filter out very short answers (< 20 chars) - likely just headings or metadata
  return questions
    .filter(q => q.answer.trim().length > 20)
    .map(q => ({
      id: `${idPrefix}-q${q.num}`,
      category,
      question: q.question,
      answer: q.answer.replace(/\n{3,}/g, '\n\n').trim(),
    }))
}

function parseFile(filePath, relPath) {
  const content = readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const cat = categoryMap[relPath]
  if (!cat) return []

  let allQs = []

  // Phase 1: Extract Q&A sections
  for (const regex of [Q3_RE, Q2_RE, Q5_RE]) {
    const qs = extractQA(content, regex, lines)
    if (qs.length > 0) {
      allQs.push(...qs.map(q => ({
        id: `${cat.id}-q${q.num}`,
        category: cat.id,
        question: q.question,
        answer: q.answer,
      })))
      break
    }
  }

  // Phase 2: Extract H3/H4 topics as knowledge points (always, as supplement)
  const topicQs = extractTopics(content, lines, cat.id, cat.id)
  allQs.push(...topicQs)

  // Phase 3: For 学习指南 files, also extract H2 lesson sections
  if (relPath.includes('学习指南')) {
    const lessonQs = extractH2Lessons(lines, cat.id, cat.id)
    allQs.push(...lessonQs)
  }

  // Deduplicate by question title
  const seen = new Set()
  return allQs.filter(q => {
    const key = q.question
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function scanFiles(dir) {
  const results = []
  const entries = readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      results.push(...scanFiles(full))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const relPath = posix(relative(root, full))
      if (categoryMap[relPath]) {
        results.push({ relPath, full })
      }
    }
  }
  return results
}

const files = scanFiles(root)
const categoryOrder = Object.values(categoryMap).map(c => c.id)
const allQuestions = []
const categoryMap2 = {}

for (const { relPath, full } of files) {
  const cat = categoryMap[relPath]
  if (!cat) continue
  const questions = parseFile(full, relPath)
  for (const q of questions) {
    q.category = cat.id
    allQuestions.push(q)
  }
  if (!categoryMap2[cat.id]) {
    categoryMap2[cat.id] = { id: cat.id, name: cat.name, icon: cat.icon, count: 0 }
  }
  categoryMap2[cat.id].count += questions.length
}

const categories = categoryOrder
  .filter(id => categoryMap2[id])
  .map(id => categoryMap2[id])

const output = { categories, questions: allQuestions }
writeFileSync(join(root, 'quiz-data.json'), JSON.stringify(output, null, 2), 'utf-8')
console.log(`Parsed ${allQuestions.length} questions from ${categories.length} categories`)
for (const c of categories) {
  console.log(`  ${c.icon} ${c.name}: ${c.count}`)
}
