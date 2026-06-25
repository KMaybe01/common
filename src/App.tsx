import { Route, Routes } from 'react-router-dom'
import DocPage from './components/DocPage'
import Header from './components/Header'
import HomePage from './components/HomePage'
import UpdateNotification from './components/UpdateNotification'

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<DocPage />} />
        </Routes>
      </main>
      <UpdateNotification />
    </div>
  )
}
