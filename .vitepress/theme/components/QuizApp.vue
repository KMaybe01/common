<template>
  <div class="quiz">
    <div class="quiz__header">
      <div class="quiz__header-top">
        <LoginUI @sync="onSync" />
      </div>
      <div class="quiz__stats">
        <span class="quiz__stat quiz__stat--high">🔥 {{ freqCounts.high }}</span>
        <span class="quiz__stat quiz__stat--mid">📌 {{ freqCounts.mid }}</span>
        <span class="quiz__stat quiz__stat--low">📖 {{ freqCounts.low }}</span>
        <span class="quiz__stat quiz__stat--progress">✅ {{ progressStats.done }} / 🔄 {{ progressStats.review }}</span>
      </div>
    </div>

    <div class="quiz__layout">
      <aside class="quiz__sidebar">
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="quiz__tab"
          :class="{ 'quiz__tab--active': activeCategory === cat.id }"
          @click="switchCategory(cat.id)"
        >
          <span class="quiz__tab-icon">{{ cat.icon }}</span>
          <span class="quiz__tab-name">{{ cat.name }}</span>
          <span class="quiz__tab-count">{{ cat.count }}</span>
        </button>
      </aside>

      <main class="quiz__content">
        <div class="quiz__toolbar">
          <div class="quiz__search-wrap">
            <input
              v-model="searchQuery"
              class="quiz__search"
              type="text"
              placeholder="🔍 搜索题目..."
            />
            <button
              v-show="searchQuery"
              class="quiz__search-clear"
              @click="searchQuery = ''"
            >✕</button>
          </div>
          <div class="quiz__freq-tabs">
            <button class="quiz__freq-btn" :class="{ 'quiz__freq-btn--active': activeFreq === '' }" @click="activeFreq = ''">全部</button>
            <button class="quiz__freq-btn quiz__freq-btn--high" :class="{ 'quiz__freq-btn--active': activeFreq === 'high' }" @click="activeFreq = 'high'">🔥 高频</button>
            <button class="quiz__freq-btn quiz__freq-btn--mid" :class="{ 'quiz__freq-btn--active': activeFreq === 'mid' }" @click="activeFreq = 'mid'">📌 常考</button>
            <button class="quiz__freq-btn quiz__freq-btn--low" :class="{ 'quiz__freq-btn--active': activeFreq === 'low' }" @click="activeFreq = 'low'">📖 了解</button>
          </div>
          <div class="quiz__status-tabs">
            <button class="quiz__freq-btn quiz__status--done" :class="{ 'quiz__freq-btn--active': activeStatus === 'done' }" @click="activeStatus = 'done'">✅ 已掌握</button>
            <button class="quiz__freq-btn quiz__status--review" :class="{ 'quiz__freq-btn--active': activeStatus === 'review' }" @click="activeStatus = 'review'">🔄 待复习</button>
            <button class="quiz__freq-btn quiz__status--new" :class="{ 'quiz__freq-btn--active': activeStatus === 'new' }" @click="activeStatus = 'new'">📝 未开始</button>
          </div>
          <button class="quiz__rand-btn" @click="goRandom" title="随机一题">🎲</button>
          <select v-model.number="pageSize" class="quiz__sort" title="每页条数">
            <option :value="10">10 条/页</option>
            <option :value="20">20 条/页</option>
            <option :value="50">50 条/页</option>
            <option :value="100">100 条/页</option>
          </select>
          <select v-model="sortBy" class="quiz__sort">
            <option value="default">默认排序</option>
            <option value="freq-desc">频率高→低</option>
            <option value="freq-asc">频率低→高</option>
            <option value="question-asc">题目 A→Z</option>
            <option value="question-desc">题目 Z→A</option>
            <option value="category">按分类</option>
          </select>
        </div>

        <div v-if="filtered.length === 0" class="quiz__empty">
          没有匹配的题目
        </div>

        <template v-else>
          <div class="quiz__progress">
            <div class="quiz__progress-bar">
              <div
                class="quiz__progress-fill"
                :style="{ width: progressPct + '%' }"
              />
            </div>
            <span class="quiz__progress-text">
              {{ pagedData.length }} 题 · 第 {{ page }} / {{ totalPages }} 页
            </span>
          </div>

          <div class="quiz__list">
            <div
              v-for="q in pagedData"
              :key="q.id"
              class="quiz__item"
              :class="{ 'quiz__item--expanded': expandedId === q.id }"
            >
              <div class="quiz__row" @click="toggleExpand(q.id)">
                <span class="quiz__row-cat">{{ getCategoryName(q.category) }}</span>
                <span class="quiz__row-status" :class="'quiz__row-status--' + (progress[q.id] || '')">{{ statusIcon(progress[q.id] || '') }}</span>
                <span class="quiz__row-q">{{ q.question }}</span>
                <span v-if="q.freq" class="quiz__row-freq" :class="'quiz__row-freq--' + q.freq">{{ freqLabel(q.freq) }}</span>
                <span class="quiz__row-arrow">{{ expandedId === q.id ? '▾' : '▸' }}</span>
              </div>
              <div v-if="expandedId === q.id" class="quiz__panel">
                <div class="quiz__panel-answer quiz__answer-body" v-html="renderAnswer(q.answer)" />
                <div class="quiz__panel-foot">
                  <span class="quiz__panel-status" :class="'quiz__panel-status--' + (progress[q.id] || 'new')" @click.stop="toggleStatus(q.id)" :title="progress[q.id] === 'done' ? '标记为待复习' : progress[q.id] === 'review' ? '取消标记' : '标记为已掌握'">
                    <span v-if="progress[q.id] === 'done'">✅ 已掌握</span>
                    <span v-else-if="progress[q.id] === 'review'">🔄 待复习</span>
                    <span v-else>◻️ 标记已掌握</span>
                  </span>
                  <div class="quiz__panel-nav">
                    <button class="quiz__panel-btn" :disabled="getExpandedIndex() <= 0 && page <= 1" @click.stop="expandPrev">← 上一题</button>
                    <span class="quiz__panel-index">{{ getExpandedIndex() + 1 }} / {{ filtered.length }}</span>
                    <button class="quiz__panel-btn" :disabled="getExpandedIndex() >= filtered.length - 1 && page >= totalPages" @click.stop="expandNext">下一题 →</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="quiz__pagination">
            <button class="quiz__page-btn" :disabled="page <= 1" @click="page--">←</button>
            <button
              v-for="p in pageNumbers"
              :key="p"
              class="quiz__page-num"
              :class="{ 'quiz__page-num--active': p === page }"
              :disabled="p === '...'"
              @click="goToPage(p)"
            >{{ p }}</button>
            <button class="quiz__page-btn" :disabled="page >= totalPages" @click="page++">→</button>
            <span class="quiz__page-total">共 {{ totalPages }} 页</span>
          </div>
        </template>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, watch } from 'vue'
import LoginUI from './LoginUI.vue'
import rawData from '../../../quiz-data.json'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import mermaid from 'mermaid'

let mermaidCounter = 0
const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
      } catch {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  },
})

const defaultFence = md.renderer.rules.fence.bind(md.renderer.rules)
md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  if (token.info.trim().toLowerCase() === 'mermaid') {
    const id = `qm-${++mermaidCounter}`
    mermaid._quizCodes = mermaid._quizCodes || {}
    mermaid._quizCodes[id] = token.content.trim()
    return `<pre class="mermaid" data-quiz-id="${id}">${md.utils.escapeHtml(token.content.trim())}</pre>\n`
  }
  return defaultFence(tokens, idx, options, env, self)
}

mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  securityLevel: 'loose',
  themeVariables: {
    primaryColor: '#3eaf7c',
    primaryTextColor: '#fff',
    primaryBorderColor: '#2d8f5e',
    lineColor: '#666',
    secondaryColor: '#2196f3',
    tertiaryColor: '#f5f5f5',
  },
})

const categories = rawData.categories
const questions = rawData.questions

const activeCategory = ref('')
const searchQuery = ref('')
const sortBy = ref('default')
const activeFreq = ref('')
const activeStatus = ref('')
const page = ref(1)
const pageSize = ref(20)

// ── 进度追踪（localStorage） ──
const STORAGE_KEY = 'quiz-progress-v1'
const progress = ref({})

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) progress.value = JSON.parse(saved)
  } catch {}
}

function saveProgress() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress.value)) } catch {}
}

function onSync() {
  loadProgress()
}

function toggleStatus(id) {
  const cur = progress.value[id] || ''
  if (cur === 'done') progress.value[id] = 'review'
  else if (cur === 'review') progress.value[id] = ''
  else progress.value[id] = 'done'
  saveProgress()
}

function statusIcon(s) {
  return s === 'done' ? '✅' : s === 'review' ? '🔄' : ''
}

const progressStats = computed(() => {
  const s = { done: 0, review: 0, pending: 0 }
  for (const q of questions) {
    const st = progress.value[q.id] || ''
    if (st === 'done') s.done++
    else if (st === 'review') s.review++
    else s.pending++
  }
  return s
})

function goRandom() {
  const list = filtered.value
  if (!list.length) return
  const idx = Math.floor(Math.random() * list.length)
  expandedId.value = list[idx].id
  nextTick(() => {
    const el = document.querySelector('.quiz__item--expanded')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
}

const expandedId = ref('')

function toggleExpand(id) {
  expandedId.value = expandedId.value === id ? '' : id
}

function getExpandedIndex() {
  if (!expandedId.value) return 0
  return filtered.value.findIndex(item => item.id === expandedId.value)
}

function expandToId(targetId) {
  const targetIdx = filtered.value.findIndex(q => q.id === targetId)
  if (targetIdx < 0) return
  const targetPage = Math.floor(targetIdx / pageSize.value) + 1
  if (page.value !== targetPage) {
    page.value = targetPage
  }
  expandedId.value = targetId
  nextTick(() => scrollToExpanded())
}

function expandPrev() {
  const idx = getExpandedIndex()
  if (idx > 0) {
    expandToId(filtered.value[idx - 1].id)
  } else if (page.value > 1) {
    const targetIdx = (page.value - 1) * pageSize.value - 1
    expandToId(filtered.value[targetIdx].id)
  }
}

function expandNext() {
  const idx = getExpandedIndex()
  if (idx >= 0 && idx < filtered.value.length - 1) {
    expandToId(filtered.value[idx + 1].id)
  } else if (page.value < totalPages.value) {
    const targetIdx = page.value * pageSize.value
    expandToId(filtered.value[targetIdx].id)
  }
}

function scrollToExpanded() {
  const el = document.querySelector('.quiz__item--expanded')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const categoryMap = {}
categories.forEach(c => { categoryMap[c.id] = c.name })

function getCategoryName(id) {
  return categoryMap[id] || id
}

const freqLabelMap = { high: '🔥 高频', mid: '📌 常考', low: '📖 了解' }
function freqLabel(f) {
  return freqLabelMap[f] || ''
}

const total = computed(() => questions.length)

const freqCounts = computed(() => {
  const c = { high: 0, mid: 0, low: 0 }
  questions.forEach(q => { if (c[q.freq] !== undefined) c[q.freq]++ })
  return c
})

const catFreq = computed(() => {
  const map = {}
  questions.forEach(q => {
    if (!map[q.category]) map[q.category] = { high: 0, mid: 0, low: 0 }
    if (map[q.category][q.freq] !== undefined) map[q.category][q.freq]++
  })
  return map
})

const freqOrder = { high: 0, mid: 1, low: 2, '': 3 }

const filtered = computed(() => {
  let list = questions
  if (activeCategory.value) {
    list = list.filter(q => q.category === activeCategory.value)
  }
  if (activeFreq.value) {
    list = list.filter(q => q.freq === activeFreq.value)
  }
  if (searchQuery.value.trim()) {
    const kw = searchQuery.value.trim().toLowerCase()
    list = list.filter(q =>
      q.question.toLowerCase().includes(kw) ||
      q.answer.toLowerCase().includes(kw)
    )
  }
  if (activeStatus.value === 'done') {
    list = list.filter(q => progress.value[q.id] === 'done')
  } else if (activeStatus.value === 'review') {
    list = list.filter(q => progress.value[q.id] === 'review')
  } else if (activeStatus.value === 'new') {
    list = list.filter(q => !progress.value[q.id])
  }
  if (sortBy.value === 'freq-desc') {
    list = [...list].sort((a, b) => (freqOrder[a.freq] || 3) - (freqOrder[b.freq] || 3))
  } else if (sortBy.value === 'freq-asc') {
    list = [...list].sort((a, b) => (freqOrder[b.freq] || 3) - (freqOrder[a.freq] || 3))
  } else if (sortBy.value === 'question-asc') {
    list = [...list].sort((a, b) => a.question.localeCompare(b.question, 'zh'))
  } else if (sortBy.value === 'question-desc') {
    list = [...list].sort((a, b) => b.question.localeCompare(a.question, 'zh'))
  } else if (sortBy.value === 'category') {
    list = [...list].sort((a, b) => a.category.localeCompare(b.category))
  }
  return list
})

function syncStateToURL() {
  const p = new URLSearchParams()
  if (activeCategory.value) p.set('cat', activeCategory.value)
  if (activeFreq.value) p.set('freq', activeFreq.value)
  if (sortBy.value !== 'default') p.set('sort', sortBy.value)
  if (searchQuery.value.trim()) p.set('q', searchQuery.value.trim())
  const qs = p.toString()
  const url = qs ? '?' + qs : window.location.pathname
  history.replaceState(null, '', url)
}

function loadStateFromURL() {
  const p = new URLSearchParams(window.location.search)
  if (p.has('cat')) activeCategory.value = p.get('cat')
  if (p.has('freq')) activeFreq.value = p.get('freq')
  if (p.has('sort')) sortBy.value = p.get('sort')
  if (p.has('q')) searchQuery.value = p.get('q')
}

// Sync to URL on mount
onMounted(() => {
  loadProgress()
  loadStateFromURL()
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize.value)))

const pagedData = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filtered.value.slice(start, start + pageSize.value)
})

const progressPct = computed(() => {
  if (filtered.value.length === 0) return 0
  return Math.round((page.value / totalPages.value) * 100)
})

const pageNumbers = computed(() => {
  const total = totalPages.value
  const cur = page.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const list = [1]
  const start = Math.max(2, cur - 1)
  const end = Math.min(total - 1, cur + 1)
  if (start > 2) list.push('...')
  for (let i = start; i <= end; i++) list.push(i)
  if (end < total - 1) list.push('...')
  list.push(total)
  return list
})

function goToPage(p) {
  if (p === '...') return
  const n = Number(p)
  if (n >= 1 && n <= totalPages.value) {
    page.value = n
    expandedId.value = ''
  }
}

function switchCategory(id) {
  activeCategory.value = id
  page.value = 1
}

watch([activeCategory, activeFreq, activeStatus, searchQuery, sortBy, pageSize], () => {
  page.value = 1
  expandedId.value = ''
  syncStateToURL()
})

function renderMd(str) {
  if (!str) return ''
  return md.render(str)
}

function renderAnswer(answer) {
  try {
    return renderMd(answer)
  } catch {
    return `<pre>${answer || ''}</pre>`
  }
}

watch(expandedId, () => {
  nextTick(() => renderMermaidDiagrams())
})

async function renderMermaidDiagrams() {
  await nextTick()
  await nextTick()
  await nextTick()
  const els = document.querySelectorAll('.quiz__panel pre.mermaid[data-quiz-id]:not([data-processed])')
  if (!els.length) return
  for (const el of els) {
    const id = el.dataset.quizId
    const code = mermaid._quizCodes?.[id]
    if (!code) continue
    const graphId = `qmgraph-${id}-${Date.now()}`
    try {
      const { svg } = await mermaid.render(graphId, code)
      el.outerHTML = `<div class="mermaid-rendered" data-quiz-id="${id}">${svg}</div>`
    } catch {
      el.outerHTML = `<div class="mermaid-error" data-quiz-id="${id}"><details><summary>图表渲染失败</summary><pre>${md.utils.escapeHtml(code)}</pre></details></div>`
    }
  }
}
</script>

<style scoped>
.quiz {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px;
}

.quiz__header { margin-bottom: 20px; }
.quiz__header h2 { margin: 0; font-size: 1.5rem; }
.quiz__header-top { display: flex; align-items: center; justify-content: flex-end; gap: 12px; flex-wrap: wrap; }
.quiz__desc {
  color: var(--vp-c-text-2);
  margin: 4px 0 0;
  font-size: 0.875rem;
}

.quiz__stats {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.quiz__stat {
  font-size: 0.8rem;
  padding: 3px 10px;
  border-radius: 6px;
  font-weight: 600;
}

.quiz__stat--high {
  color: #d32f2f;
  background: rgba(211, 47, 47, 0.08);
}

.quiz__stat--mid {
  color: #e65100;
  background: rgba(230, 81, 0, 0.08);
}

.quiz__stat--low {
  color: #666;
  background: rgba(0, 0, 0, 0.04);
}

.dark .quiz__stat--high { background: rgba(244, 67, 54, 0.15); color: #ef9a9a; }
.dark .quiz__stat--mid { background: rgba(255, 152, 0, 0.15); color: #ffcc80; }
.dark .quiz__stat--low { background: rgba(255, 255, 255, 0.06); color: #999; }

.quiz__layout {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.quiz__sidebar {
  position: sticky;
  top: 70px;
  width: 200px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: calc(100vh - 90px);
  overflow-y: auto;
  padding-right: 4px;
}

.quiz__sidebar::-webkit-scrollbar { width: 4px; }
.quiz__sidebar::-webkit-scrollbar-thumb {
  background: var(--vp-c-border);
  border-radius: 2px;
}

.quiz__tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  font-size: 0.85rem;
  text-align: left;
  transition: all 0.15s;
  color: var(--vp-c-text-2);
  width: 100%;
}

.quiz__tab:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.quiz__tab--active {
  background: var(--vp-c-green-soft, #e8f5e9);
  color: #2d8f5e;
  font-weight: 600;
}

.dark .quiz__tab--active {
  background: rgba(62, 175, 124, 0.15);
  color: #66c99c;
}

.quiz__tab-icon { font-size: 1rem; flex-shrink: 0; }
.quiz__tab-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.quiz__tab-count {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
  margin-left: auto;
  padding: 1px 6px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  min-width: 24px;
  text-align: center;
}
.quiz__tab--active .quiz__tab-count {
  background: rgba(62, 175, 124, 0.12);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.dark .quiz__tab--active .quiz__tab-count {
  background: rgba(62, 175, 124, 0.2);
}

.quiz__content { flex: 1; min-width: 0; }
.quiz__content .hljs { border-radius: 8px; font-size: 0.875rem; }
.quiz__content pre:not(.hljs) { border-radius: 8px; }

.quiz__empty {
  text-align: center;
  padding: 80px 20px;
  color: var(--vp-c-text-3);
  font-size: 1rem;
}

.quiz__toolbar {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.quiz__search-wrap {
  flex: 1;
  position: relative;
}

.quiz__search {
  width: 100%;
  padding: 8px 32px 8px 12px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.quiz__search:focus {
  border-color: #3eaf7c;
}

.quiz__search-clear {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  padding: 0;
  line-height: 1;
}

.quiz__search-clear:hover {
  background: var(--vp-c-border);
  color: var(--vp-c-text-1);
}

.quiz__freq-tabs {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.quiz__freq-btn {
  padding: 6px 10px;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.quiz__freq-btn:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.quiz__freq-btn--active {
  border-color: #3eaf7c;
  color: #3eaf7c;
  background: var(--vp-c-green-soft, #e8f5e9);
  font-weight: 600;
}

.dark .quiz__freq-btn--active {
  background: rgba(62, 175, 124, 0.15);
  color: #66c99c;
}

.quiz__sort {
  padding: 8px 12px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  outline: none;
  cursor: pointer;
}

.quiz__progress {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.quiz__progress-bar {
  flex: 1;
  height: 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  overflow: hidden;
}

.quiz__progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3eaf7c, #66c99c);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.quiz__progress-text {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.quiz__list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  overflow: hidden;
}

.quiz__row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: background 0.15s;
}

.quiz__row:hover {
  background: var(--vp-c-bg-soft);
}

.quiz__item + .quiz__item {
  border-top: 1px solid var(--vp-c-border);
}

.quiz__item--expanded .quiz__row {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}

.quiz__panel {
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-border);
  padding: 16px 20px 20px;
  animation: quizPanelIn 0.2s ease-out;
}

@keyframes quizPanelIn {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
}

.quiz__panel-foot {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px dashed var(--vp-c-border);
}

.quiz__panel-foot .quiz__panel-nav {
  margin-left: auto;
}

.quiz__panel-status {
  font-size: 0.85rem;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  transition: background 0.15s;
}
.quiz__panel-status:hover { background: var(--vp-c-bg-soft); }

.quiz__panel-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quiz__panel-btn {
  padding: 4px 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  transition: background 0.15s, opacity 0.15s;
}
.quiz__panel-btn:hover:not(:disabled) { background: var(--vp-c-bg-soft); }
.quiz__panel-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.quiz__panel-index {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  min-width: 60px;
  text-align: center;
}

.quiz__panel-answer :deep(pre) {
  max-width: 100%;
  overflow-x: auto;
  background: var(--vp-code-block-bg);
  padding: 12px 14px;
  border-radius: 6px;
  font-size: 0.85em;
}

.quiz__panel-answer :deep(.hljs) {
  background: transparent;
}

.quiz__panel-answer :deep(code) {
  font-size: 0.85em;
}

.quiz__panel-answer :deep(table) {
  display: table;
  width: 100%;
  border-collapse: collapse;
  margin: 8px 0;
}

.quiz__panel-answer :deep(th),
.quiz__panel-answer :deep(td) {
  border: 1px solid var(--vp-c-border);
  padding: 6px 10px;
  white-space: normal;
}

.quiz__panel-answer :deep(th) { background: var(--vp-c-bg-soft); font-weight: 600; }

.quiz__panel-answer :deep(blockquote) {
  border-left: 3px solid var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
  margin: 8px 0;
  padding: 8px 12px;
  border-radius: 0 4px 4px 0;
  color: var(--vp-c-text-2);
}

.quiz__panel-answer :deep(ul),
.quiz__panel-answer :deep(ol) { padding-left: 20px; margin: 8px 0; }
.quiz__panel-answer :deep(li) { margin: 4px 0; }
.quiz__panel-answer :deep(p) { margin: 8px 0; }
.quiz__panel-answer :deep(h1),
.quiz__panel-answer :deep(h2),
.quiz__panel-answer :deep(h3),
.quiz__panel-answer :deep(h4) { margin: 16px 0 8px; font-weight: 600; }

.quiz__row-status {
  width: 22px;
  flex-shrink: 0;
  font-size: 0.85rem;
  text-align: center;
}
.quiz__row-status--done { opacity: 0.8; }
.quiz__row-status--review { opacity: 1; }

.quiz__status-tabs { display: flex; gap: 4px; flex-shrink: 0; }
.quiz__status--done { color: #2e7d32; }
.quiz__status--review { color: #e65100; }
.quiz__status--new { color: #666; }
.dark .quiz__status--done { color: #66bb6a; }
.dark .quiz__status--review { color: #ffcc80; }
.dark .quiz__status--new { color: #999; }

.quiz__rand-btn {
  padding: 6px 10px;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.15s;
  line-height: 1;
}
.quiz__rand-btn:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-1);
}

.quiz__modal-status {
  border: none;
  background: none;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.15s;
}
.quiz__modal-status:hover { background: var(--vp-c-bg-soft); }

.quiz__row-cat {
  font-size: 0.75rem;
  color: #3eaf7c;
  background: var(--vp-c-green-soft, #e8f5e9);
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 0;
}

.dark .quiz__row-cat {
  background: rgba(62, 175, 124, 0.15);
  color: #66c99c;
}

.quiz__row-q {
  flex: 1;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.quiz__row-freq {
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 0;
  font-weight: 600;
}

.quiz__row-freq--high {
  color: #d32f2f;
  background: rgba(211, 47, 47, 0.1);
}

.quiz__row-freq--mid {
  color: #e65100;
  background: rgba(230, 81, 0, 0.1);
}

.quiz__row-freq--low {
  color: #666;
  background: rgba(0, 0, 0, 0.05);
}

.dark .quiz__row-freq--high {
  background: rgba(244, 67, 54, 0.2);
  color: #ef9a9a;
}

.dark .quiz__row-freq--mid {
  background: rgba(255, 152, 0, 0.2);
  color: #ffcc80;
}

.dark .quiz__row-freq--low {
  background: rgba(255, 255, 255, 0.08);
  color: #999;
}

.quiz__row-arrow {
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.quiz__nav {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.quiz__btn {
  padding: 10px 20px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  color: var(--vp-c-text-1);
}

.quiz__btn:hover:not(:disabled) {
  border-color: #3eaf7c;
  color: #3eaf7c;
}

.quiz__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.quiz__pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 20px;
  padding: 12px 0;
}

.quiz__page-btn,
.quiz__page-num {
  min-width: 34px;
  height: 34px;
  padding: 0 10px;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.quiz__page-btn:hover:not(:disabled),
.quiz__page-num:hover:not(:disabled) {
  border-color: #3eaf7c;
  color: #3eaf7c;
}

.quiz__page-btn:disabled,
.quiz__page-num:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.quiz__page-num--active {
  background: #3eaf7c;
  color: #fff;
  border-color: #3eaf7c;
}

.quiz__page-num--active:hover {
  color: #fff;
}

.quiz__page-total {
  margin-left: 8px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

/* Modal */
.quiz__modal-mask {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.quiz__modal {
  background: var(--vp-c-bg);
  border-radius: 16px;
  width: 100%;
  max-width: 800px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  transition: max-width 0.25s, max-height 0.25s;
}

.quiz__modal--full {
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  border-radius: 0;
}

.quiz__modal-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--vp-c-border);
  flex-shrink: 0;
}

.quiz__modal-cat {
  font-size: 0.8rem;
  color: #3eaf7c;
  background: var(--vp-c-green-soft, #e8f5e9);
  padding: 3px 10px;
  border-radius: 4px;
}

.dark .quiz__modal-cat {
  background: rgba(62, 175, 124, 0.15);
  color: #66c99c;
}

.quiz__modal-index {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.quiz__modal-actions {
  margin-left: auto;
  display: flex;
  gap: 4px;
}

.quiz__modal-action,
.quiz__modal-close {
  border: none;
  background: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: var(--vp-c-text-2);
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.15s;
}

.quiz__modal-action:hover,
.quiz__modal-close:hover {
  background: var(--vp-c-bg-soft);
}

.quiz__modal-main {
  display: flex;
  flex: 1;
  min-height: 0;
}

.quiz__modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  min-width: 0;
}

.quiz__modal-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 20px;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.quiz__modal-freq {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  white-space: nowrap;
}

.quiz__modal-freq--high {
  color: #d32f2f;
  background: rgba(211, 47, 47, 0.1);
}

.quiz__modal-freq--mid {
  color: #e65100;
  background: rgba(230, 81, 0, 0.1);
}

.quiz__modal-freq--low {
  color: #666;
  background: rgba(0, 0, 0, 0.05);
}

.dark .quiz__modal-freq--high {
  background: rgba(244, 67, 54, 0.2);
  color: #ef9a9a;
}

.dark .quiz__modal-freq--mid {
  background: rgba(255, 152, 0, 0.2);
  color: #ffcc80;
}

.dark .quiz__modal-freq--low {
  background: rgba(255, 255, 255, 0.08);
  color: #999;
}

.quiz__modal-answer {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--vp-c-text-1);
}

.quiz__modal-answer :deep(pre) {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

.quiz__modal-answer :deep(.hljs) {
  background: var(--vp-c-bg-soft) !important;
}

.quiz__modal-answer :deep(code) {
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
}

.quiz__modal-answer :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0;
}

.quiz__modal-answer :deep(th),
.quiz__modal-answer :deep(td) {
  border: 1px solid var(--vp-c-border);
  padding: 8px 12px;
  text-align: left;
  font-size: 0.875rem;
}

.quiz__modal-answer :deep(th) {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}

.quiz__modal-answer :deep(blockquote) {
  border-left: 3px solid #3eaf7c;
  margin: 12px 0;
  padding: 8px 16px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border-radius: 0 4px 4px 0;
}

.quiz__modal-answer :deep(ul),
.quiz__modal-answer :deep(ol) { padding-left: 20px; margin: 8px 0; }
.quiz__modal-answer :deep(li) { margin: 4px 0; }
.quiz__modal-answer :deep(p) { margin: 8px 0; }
.quiz__modal-answer :deep(h1),
.quiz__modal-answer :deep(h2),
.quiz__modal-answer :deep(h3),
.quiz__modal-answer :deep(h4) { margin: 16px 0 8px; font-weight: 600; }

.quiz__modal-side {
  width: 56px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-left: 1px solid var(--vp-c-border);
  padding: 16px 0;
}

.quiz__modal-side-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.quiz__modal-side-btn:hover:not(:disabled) {
  border-color: #3eaf7c;
  color: #3eaf7c;
  background: var(--vp-c-green-soft, #f0faf5);
}

.dark .quiz__modal-side-btn:hover:not(:disabled) {
  background: rgba(62, 175, 124, 0.15);
}

.quiz__modal-side-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.quiz__modal-side-label {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  letter-spacing: 0.05em;
}

.quiz__modal-side-sep {
  width: 16px;
  height: 1px;
  background: var(--vp-c-border);
}

@media (max-width: 768px) {
  .quiz__layout { flex-direction: column; }
  .quiz__sidebar {
    position: static;
    width: 100%;
    min-width: 0;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 4px;
    max-height: none;
  }
  .quiz__tab { padding: 6px 10px; font-size: 0.8rem; }
  .quiz__toolbar { flex-direction: column; }
  .quiz__freq-tabs { overflow-x: auto; }
  .quiz__modal { max-width: 100%; max-height: 95vh; }
  .quiz__modal-mask { padding: 0; }
  .quiz__modal--full { border-radius: 0; }
}
</style>
