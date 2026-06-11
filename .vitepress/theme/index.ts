import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import './custom.css'
import QuizPage from './QuizPage.vue'
import UpdateNotification from './components/UpdateNotification.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(UpdateNotification)
    })
  },
  enhanceApp({ app }) {
    app.component('QuizPage', QuizPage)
  }
} satisfies Theme
