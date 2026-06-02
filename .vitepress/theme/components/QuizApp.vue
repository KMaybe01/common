<template>
  <div class="quiz">
    <div class="quiz__header">
      <h2>📝 题库刷题</h2>
      <p class="quiz__desc">共 {{ total }} 题，选择分类开始刷题</p>
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
        <div v-if="filtered.length === 0" class="quiz__empty">
          ← 选择左侧分类开始刷题
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
              {{ currentIndex + 1 }} / {{ filtered.length }}
            </span>
          </div>

          <div class="quiz__card">
            <div class="quiz__q-header">
              <span class="quiz__q-num">第 {{ currentIndex + 1 }} 题</span>
            </div>
            <div class="quiz__q-text">{{ current.question }}</div>

            <button
              class="quiz__toggle"
              :class="{ 'quiz__toggle--open': showAnswer }"
              @click="showAnswer = !showAnswer"
            >
              {{ showAnswer ? '🙈 隐藏答案' : '👀 显示答案' }}
            </button>

            <div v-show="showAnswer" class="quiz__answer">
              <div class="quiz__answer-body" v-html="renderedAnswer" />
            </div>
          </div>

          <div class="quiz__nav">
            <button
              class="quiz__btn quiz__btn--prev"
              :disabled="currentIndex === 0"
              @click="goPrev"
            >
              ← 上一题
            </button>
            <button
              class="quiz__btn quiz__btn--next"
              :disabled="currentIndex === filtered.length - 1"
              @click="goNext"
            >
              下一题 →
            </button>
          </div>
        </template>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, watch } from 'vue'
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
const currentIndex = ref(0)
const showAnswer = ref(true)

const filtered = computed(() => {
  if (!activeCategory.value) return []
  return questions.filter(q => q.category === activeCategory.value)
})

const current = computed(() => filtered.value[currentIndex.value] ?? { question: '', answer: '' })
const total = computed(() => questions.length)
const progressPct = computed(() => {
  if (filtered.value.length === 0) return 0
  return Math.round(((currentIndex.value + 1) / filtered.value.length) * 100)
})

function switchCategory(id) {
  activeCategory.value = id
  currentIndex.value = 0
  showAnswer.value = true
}

function goPrev() {
  if (currentIndex.value > 0) {
    currentIndex.value--
    showAnswer.value = true
  }
}

function goNext() {
  if (currentIndex.value < filtered.value.length - 1) {
    currentIndex.value++
    showAnswer.value = true
  }
}

function renderMd(str) {
  if (!str) return ''
  return md.render(str)
}

const renderedAnswer = computed(() => {
  try {
    return renderMd(current.value.answer)
  } catch {
    return `<pre>${current.value.answer || ''}</pre>`
  }
})

async function renderMermaidDiagrams() {
  await nextTick()
  await nextTick()
  await nextTick()

  const els = document.querySelectorAll('.quiz__content pre.mermaid[data-quiz-id]:not([data-processed])')
  if (!els.length) return

  for (const el of els) {
    const id = el.dataset.quizId
    const code = mermaid._quizCodes?.[id]
    if (!code) continue

    const graphId = `qmgraph-${id}-${Date.now()}`
    try {
      const { svg } = await mermaid.render(graphId, code)
      el.outerHTML = `<div class="mermaid-rendered" data-quiz-id="${id}">${svg}</div>`
    } catch (e) {
      el.outerHTML = `<div class="mermaid-error" data-quiz-id="${id}"><details><summary>图表渲染失败</summary><pre>${md.utils.escapeHtml(code)}</pre></details></div>`
    }
  }
}

watch(renderedAnswer, () => {
  nextTick(() => renderMermaidDiagrams())
})

onMounted(() => {
  renderMermaidDiagrams()
})
</script>

<style scoped>
.quiz {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px;
}

.quiz__header { margin-bottom: 20px; }
.quiz__header h2 { margin: 0; font-size: 1.5rem; }
.quiz__desc {
  color: var(--vp-c-text-2);
  margin: 4px 0 0;
  font-size: 0.875rem;
}

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

.quiz__card {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 24px;
  background: var(--vp-c-bg);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.dark .quiz__card {
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.quiz__q-header { margin-bottom: 12px; }

.quiz__q-num {
  font-size: 0.8rem;
  color: #3eaf7c;
  font-weight: 600;
}

.quiz__q-text {
  font-size: 1.05rem;
  font-weight: 500;
  line-height: 1.6;
  margin-bottom: 20px;
  color: var(--vp-c-text-1);
}

.quiz__toggle {
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px dashed #3eaf7c;
  border-radius: 8px;
  background: var(--vp-c-green-soft, #f0faf5);
  color: #3eaf7c;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
}

.dark .quiz__toggle { background: rgba(62, 175, 124, 0.1); }
.quiz__toggle:hover { background: var(--vp-c-green-soft, #e0f5ea); }
.dark .quiz__toggle:hover { background: rgba(62, 175, 124, 0.2); }
.quiz__toggle--open { border-style: solid; background: var(--vp-c-green-soft, #e8f5e9); }
.dark .quiz__toggle--open { background: rgba(62, 175, 124, 0.15); }

.quiz__answer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
}

.quiz__answer-body {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--vp-c-text-1);
}

.quiz__answer-body :deep(pre) {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  font-size: 0.85rem;
}

.quiz__answer-body :deep(pre code) { background: transparent; padding: 0; }

.quiz__answer-body :deep(code) {
  background: var(--vp-c-bg-soft);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.85rem;
}

.quiz__answer-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0;
}

.quiz__answer-body :deep(th),
.quiz__answer-body :deep(td) {
  border: 1px solid var(--vp-c-border);
  padding: 8px 12px;
  text-align: left;
  font-size: 0.85rem;
}

.quiz__answer-body :deep(th) {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}

.quiz__answer-body :deep(blockquote) {
  border-left: 3px solid #3eaf7c;
  margin: 12px 0;
  padding: 8px 16px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border-radius: 0 4px 4px 0;
}

.quiz__answer-body :deep(ul),
.quiz__answer-body :deep(ol) { padding-left: 20px; margin: 8px 0; }
.quiz__answer-body :deep(li) { margin: 4px 0; }
.quiz__answer-body :deep(p) { margin: 8px 0; }
.quiz__answer-body :deep(h1),
.quiz__answer-body :deep(h2),
.quiz__answer-body :deep(h3),
.quiz__answer-body :deep(h4) { margin: 16px 0 8px; font-weight: 600; }

.quiz__answer-body :deep(.mermaid-placeholder) {
  min-height: 100px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
  margin: 10px 0;
}

.quiz__nav {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
}

.quiz__btn {
  flex: 1;
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
}
</style>
