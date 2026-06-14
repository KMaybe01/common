<template>
  <Transition name="notify-slide">
    <div v-if="visible" class="version-notify">
      <span class="version-notify__icon">🔄</span>
      <span class="version-notify__text">网站内容已更新，请刷新页面获取最新内容</span>
      <button class="version-notify__refresh" @click="handleRefresh">刷新页面</button>
      <button class="version-notify__close" @click="handleDismiss" aria-label="关闭">✕</button>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const VERSION_KEY = 'vp-cached-version'
const DISMISSED_KEY = 'vp-dismissed-version'
const CHECK_INTERVAL = 300_000

const visible = ref(false)
let timer = null
let isFirstCheck = true

function getBase() {
  if (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) {
    return import.meta.env.BASE_URL
  }
  const base = document.querySelector('meta[name="app-base"]')?.getAttribute('content')
  return base || '/'
}

async function checkUpdate() {
  try {
    const base = getBase()
    const url = `${base}version.json?t=${Date.now()}`
    const res = await fetch(url)
    if (!res.ok) return
    const data = await res.json()
    const newVersion = String(data.timestamp)

    if (isFirstCheck) {
      isFirstCheck = false
      localStorage.setItem(VERSION_KEY, newVersion)
      return
    }

    const cachedVersion = localStorage.getItem(VERSION_KEY)
    const dismissedVersion = localStorage.getItem(DISMISSED_KEY)
    if (newVersion !== cachedVersion && newVersion !== dismissedVersion) {
      visible.value = true
    }
  } catch {
    // 静默失败
  }
}

function handleRefresh() {
  const base = getBase()
  const url = `${base}version.json?t=${Date.now()}`
  fetch(url)
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      if (data) {
        localStorage.setItem(VERSION_KEY, String(data.timestamp))
      }
    })
    .finally(() => {
      window.location.reload()
    })
}

function handleDismiss() {
  const base = getBase()
  const url = `${base}version.json?t=${Date.now()}`
  fetch(url)
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      if (data) {
        localStorage.setItem(DISMISSED_KEY, String(data.timestamp))
      }
    })
    .finally(() => {
      visible.value = false
    })
}

onMounted(() => {
  checkUpdate()
  timer = setInterval(checkUpdate, CHECK_INTERVAL)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.version-notify {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  font-size: 0.9rem;
  white-space: nowrap;
}

.version-notify__icon {
  font-size: 1.1rem;
  flex-shrink: 0;
}

.version-notify__text {
  color: var(--vp-c-text-1);
  flex-shrink: 0;
}

.version-notify__refresh {
  padding: 6px 16px;
  border: none;
  border-radius: 8px;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
  font-weight: 500;
}

.version-notify__refresh:hover {
  background: var(--vp-c-brand-2);
}

.version-notify__close {
  border: none;
  background: transparent;
  color: var(--vp-c-text-3);
  font-size: 1rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.15s;
  flex-shrink: 0;
}

.version-notify__close:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.notify-slide-enter-active {
  transition: all 0.35s ease-out;
}

.notify-slide-leave-active {
  transition: all 0.25s ease-in;
}

.notify-slide-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

.notify-slide-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

@media (max-width: 640px) {
  .version-notify {
    bottom: 12px;
    left: 12px;
    right: 12px;
    transform: none;
    flex-wrap: wrap;
    justify-content: center;
    padding: 12px 16px;
    white-space: normal;
  }

  .notify-slide-enter-from,
  .notify-slide-leave-to {
    transform: translateY(20px);
  }
}
</style>
