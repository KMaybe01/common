import { useEffect, useState } from 'react'

const VERSION_KEY = 'cached-version'
const DISMISSED_KEY = 'dismissed-version'
const CHECK_INTERVAL = 300_000

export default function UpdateNotification() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const base = import.meta.env.BASE_URL
    let isFirstCheck = true

    async function checkUpdate() {
      try {
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
          setVisible(true)
        }
      } catch {
        // silent
      }
    }

    checkUpdate()
    const timer = setInterval(checkUpdate, CHECK_INTERVAL)
    return () => clearInterval(timer)
  }, [])

  async function handleRefresh() {
    const base = import.meta.env.BASE_URL
    try {
      const res = await fetch(`${base}version.json?t=${Date.now()}`)
      if (res.ok) {
        const data = await res.json()
        localStorage.setItem(VERSION_KEY, String(data.timestamp))
      }
    } finally {
      window.location.reload()
    }
  }

  async function handleDismiss() {
    const base = import.meta.env.BASE_URL
    try {
      const res = await fetch(`${base}version.json?t=${Date.now()}`)
      if (res.ok) {
        const data = await res.json()
        localStorage.setItem(DISMISSED_KEY, String(data.timestamp))
      }
    } finally {
      setVisible(false)
    }
  }

  if (!visible) return null

  return (
    <div className="version-notify">
      <span className="version-notify-icon">🔄</span>
      <span className="version-notify-text">网站内容已更新，请刷新页面获取最新内容</span>
      <button className="version-notify-refresh" onClick={handleRefresh} type="button">
        刷新页面
      </button>
      <button
        className="version-notify-close"
        onClick={handleDismiss}
        type="button"
        aria-label="关闭"
      >
        ✕
      </button>
    </div>
  )
}
