import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import './custom.css'
import UpdateNotification from './components/UpdateNotification.vue'
import MermaidZoom from './components/MermaidZoom.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => [h(UpdateNotification), h(MermaidZoom)]
    })
  }
} satisfies Theme
