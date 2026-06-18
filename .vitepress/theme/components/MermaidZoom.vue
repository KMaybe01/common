<template>
  <Teleport to="body">
    <div v-if="visible" class="mermaid-overlay" @click.self="close">
      <div class="mermaid-overlay-content" ref="contentRef">
        <div class="mermaid-overlay-header">
          <button class="mermaid-overlay-close" @click="close" title="关闭">&times;</button>
        </div>
        <div class="mermaid-overlay-body" ref="bodyRef" />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const visible = ref(false)
const contentRef = ref<HTMLElement | null>(null)
const bodyRef = ref<HTMLElement | null>(null)

let currentSvg: SVGElement | null = null

function open(el: SVGElement) {
  visible.value = true
  currentSvg = el
  nextTick(() => {
    if (bodyRef.value && currentSvg) {
      const clone = currentSvg.cloneNode(true) as SVGElement
      clone.removeAttribute('width')
      clone.removeAttribute('height')
      const vb = clone.getAttribute('viewBox')
      if (!vb) {
        const w = currentSvg.clientWidth || 800
        const h = currentSvg.clientHeight || 600
        clone.setAttribute('viewBox', `0 0 ${w} ${h}`)
      }
      clone.setAttribute('style', 'width:100%;height:auto;max-width:100%;max-height:100%')
      bodyRef.value.innerHTML = ''
      bodyRef.value.appendChild(clone)
      resetScale()
    }
  })
}

function close() {
  visible.value = false
  currentSvg = null
  resetScale()
  if (bodyRef.value) {
    bodyRef.value.innerHTML = ''
  }
}

function handleClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  const svg = target.closest('.mermaid svg') as SVGElement | null
  if (svg) {
    open(svg)
  }
}

let scale = 1

function handleWheel(e: WheelEvent) {
  if (!visible.value) return
  e.preventDefault()
  const delta = e.deltaY > 0 ? -0.1 : 0.1
  scale = Math.max(0.2, Math.min(5, scale + delta))
  const svg = bodyRef.value?.querySelector('svg')
  if (svg) {
    svg.style.transform = `scale(${scale})`
    svg.style.transformOrigin = 'center center'
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && visible.value) {
    close()
  }
}

function resetScale() {
  scale = 1
  const svg = bodyRef.value?.querySelector('svg')
  if (svg) svg.style.transform = ''
}

onMounted(() => {
  document.addEventListener('click', handleClick)
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('wheel', handleWheel, { passive: false })
})

onUnmounted(() => {
  document.removeEventListener('click', handleClick)
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('wheel', handleWheel)
})
</script>

<style>
.mermaid-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
}

.mermaid-overlay-content {
  background: var(--vp-c-bg, #fff);
  border-radius: 12px;
  width: 92vw;
  height: 88vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.dark .mermaid-overlay-content {
  background: var(--vp-c-bg, #1e1e1e);
}

.mermaid-overlay-header {
  display: flex;
  justify-content: flex-end;
  padding: 8px 12px 0;
}

.mermaid-overlay-close {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: var(--vp-c-text-2, #666);
  line-height: 1;
  padding: 0 4px;
  transition: color 0.2s;
}

.mermaid-overlay-close:hover {
  color: var(--vp-c-text-1, #333);
}

.mermaid-overlay-body {
  flex: 1;
  padding: 16px 24px 24px;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mermaid-overlay-body svg {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  display: block;
}

.mermaid svg {
  cursor: zoom-in;
}
</style>
