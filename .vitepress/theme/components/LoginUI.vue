<template>
  <div class="login-ui">
    <button
      v-if="!loggedIn"
      class="login-ui__btn login-ui__btn--login"
      @click="showLoginModal = true"
    >
      <svg class="login-ui__icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
      GitHub 登录
    </button>

    <template v-else>
      <div class="login-ui__user">
        <img class="login-ui__avatar" :src="user.avatar_url" :alt="user.login" />
        <span class="login-ui__name">{{ user.login }}</span>
      </div>

      <div v-if="!configured" class="login-ui__config">
        <input v-model="repoInput" class="login-ui__input" placeholder="owner/repo (如: myname/quiz-progress)" />
        <button class="login-ui__btn login-ui__btn--save" @click="handleConfig" :disabled="!repoInput.trim()">保存</button>
      </div>

      <div v-else class="login-ui__actions">
        <span v-if="syncing" class="login-ui__status login-ui__status--syncing">同步中...</span>
        <span v-else-if="lastSync" class="login-ui__status login-ui__status--ok">上次: {{ lastSync }}</span>
        <span v-else class="login-ui__status login-ui__status--idle">未同步</span>
        <button class="login-ui__btn login-ui__btn--sync" @click="handleSync" :disabled="syncing">
          {{ syncing ? '同步中...' : '同步' }}
        </button>
        <button class="login-ui__btn login-ui__btn--logout" @click="handleLogout">退出</button>
      </div>
    </template>

    <Teleport to="body">
      <div v-if="showLoginModal" class="login-ui__modal-mask" @click.self="showLoginModal = false">
        <div class="login-ui__modal">
          <div class="login-ui__modal-header">
            <strong>GitHub 登录</strong>
            <button class="login-ui__modal-close" @click="showLoginModal = false">✕</button>
          </div>
          <div class="login-ui__modal-body">
            <ol class="login-ui__steps">
              <li>打开 <a href="https://github.com/settings/tokens" target="_blank">github.com/settings/tokens</a></li>
              <li>点击 <strong>Generate new token (classic)</strong></li>
              <li>勾选 <code>repo</code> 权限，生成后复制 token</li>
            </ol>
            <div class="login-ui__pat-wrap">
              <input
                v-model="patInput"
                class="login-ui__pat-input"
                type="password"
                placeholder="粘贴 Personal Access Token"
                @keyup.enter="handlePatLogin"
              />
            </div>
            <p v-if="patError" class="login-ui__pat-error">{{ patError }}</p>
            <button
              class="login-ui__btn login-ui__btn--pat"
              :disabled="authing || !patInput.trim()"
              @click="handlePatLogin"
            >
              {{ authing ? '验证中...' : '登录' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as auth from '../services/github-auth'
import * as sync from '../services/github-sync'

const emit = defineEmits(['sync'])

const loggedIn = ref(false)
const authing = ref(false)
const syncing = ref(false)
const user = ref(null)
const configured = ref(false)
const repoInput = ref('')
const lastSync = ref(null)
const showLoginModal = ref(false)
const patInput = ref('')
const patError = ref('')

const STORAGE_KEY = 'quiz-progress-v1'

function formatTime(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
  if (auth.isLoggedIn()) {
    loggedIn.value = true
    user.value = auth.getUser()
  }
  const meta = sync.getSyncMeta()
  if (meta.repoOwner && meta.repoName) {
    configured.value = true
    repoInput.value = `${meta.repoOwner}/${meta.repoName}`
  }
  const lt = sync.getLastSyncTime()
  if (lt) lastSync.value = formatTime(lt)
})

async function handlePatLogin() {
  patError.value = ''
  authing.value = true
  try {
    user.value = await auth.loginWithPat(patInput.value)
    loggedIn.value = true
    showLoginModal.value = false
    patInput.value = ''
    repoInput.value = `${user.value.login}/quiz-progress`
  } catch (e) {
    patError.value = e.message
  } finally {
    authing.value = false
  }
}

function handleLogout() {
  auth.logout()
  loggedIn.value = false
  user.value = null
  configured.value = false
}

async function handleConfig() {
  const parts = repoInput.value.trim().split('/')
  if (parts.length < 2) { alert('格式错误，应为 owner/repo'); return }
  const [owner, ...rest] = parts
  const repo = rest.join('/')
  sync.configureRepo(owner, repo)
  configured.value = true
}

function loadLocalProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch { return {} }
}

function saveLocalProgress(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) } catch {}
}

async function handleSync() {
  syncing.value = true
  try {
    const local = loadLocalProgress()
    const remote = await sync.fetchRemoteProgress()
    const merged = sync.mergeProgress(local, remote)
    await sync.pushProgress(merged)
    saveLocalProgress(merged)
    const lt = sync.getLastSyncTime()
    lastSync.value = formatTime(lt)
    emit('sync')
  } catch (e) {
    alert('同步失败: ' + e.message)
  } finally {
    syncing.value = false
  }
}
</script>

<style scoped>
.login-ui {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.login-ui__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.login-ui__btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.login-ui__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.login-ui__btn--login {
  background: #24292e;
  color: #fff;
  border-color: #24292e;
}

.login-ui__btn--login:hover {
  background: #1b1f23;
  border-color: #1b1f23;
  color: #fff;
}

.dark .login-ui__btn--login {
  background: #333;
  border-color: #555;
  color: #ddd;
}

.login-ui__icon {
  width: 16px;
  height: 16px;
}

.login-ui__user {
  display: flex;
  align-items: center;
  gap: 6px;
}

.login-ui__avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.login-ui__name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.login-ui__config {
  display: flex;
  gap: 6px;
}

.login-ui__input {
  padding: 6px 10px;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.8rem;
  width: 200px;
  outline: none;
}

.login-ui__input:focus {
  border-color: var(--vp-c-brand-1);
}

.login-ui__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.login-ui__status {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 4px;
}

.login-ui__status--syncing {
  color: #e65100;
  background: rgba(230, 81, 0, 0.1);
}

.login-ui__status--ok {
  color: #2e7d32;
  background: rgba(46, 125, 50, 0.1);
}

.login-ui__status--idle {
  color: #666;
  background: rgba(0, 0, 0, 0.04);
}

.dark .login-ui__status--syncing { background: rgba(255, 152, 0, 0.15); color: #ffcc80; }
.dark .login-ui__status--ok { background: rgba(102, 187, 106, 0.15); color: #81c784; }
.dark .login-ui__status--idle { background: rgba(255,255,255,0.06); color: #999; }

.login-ui__btn--logout {
  color: #d32f2f;
  border-color: rgba(211, 47, 47, 0.2);
}

.login-ui__btn--logout:hover:not(:disabled) {
  border-color: #d32f2f;
  color: #d32f2f;
}

.login-ui__modal-mask {
  position: fixed;
  inset: 0;
  z-index: 3000;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.login-ui__modal {
  background: var(--vp-c-bg);
  border-radius: 12px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.login-ui__modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid var(--vp-c-border);
  font-size: 1rem;
}

.login-ui__modal-close {
  border: none;
  background: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: var(--vp-c-text-2);
  padding: 4px 8px;
  border-radius: 6px;
}

.login-ui__modal-close:hover {
  background: var(--vp-c-bg-soft);
}

.login-ui__modal-body {
  padding: 20px;
}

.login-ui__steps {
  margin: 0 0 16px;
  padding-left: 20px;
  font-size: 0.85rem;
  line-height: 1.8;
  color: var(--vp-c-text-2);
}

.login-ui__steps a {
  color: var(--vp-c-brand-1);
}

.login-ui__steps code {
  font-size: 0.8rem;
  background: var(--vp-c-bg-soft);
  padding: 1px 6px;
  border-radius: 4px;
}

.login-ui__pat-wrap {
  margin-bottom: 8px;
}

.login-ui__pat-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  outline: none;
  box-sizing: border-box;
}

.login-ui__pat-input:focus {
  border-color: var(--vp-c-brand-1);
}

.login-ui__pat-error {
  color: #d32f2f;
  font-size: 0.8rem;
  margin: 0 0 8px;
}

.login-ui__btn--pat {
  width: 100%;
  justify-content: center;
  padding: 10px;
}
</style>
