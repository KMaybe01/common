import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'
import 'highlight.js/styles/github.css'
import QuizPage from './QuizPage.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('QuizPage', QuizPage)
  }
} satisfies Theme
