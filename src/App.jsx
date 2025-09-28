import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainLayout } from './components/layouts/MainLayout'
import HomePage from './pages/HomePage'
import DSAHubPage from './pages/DsaHubPage'
import TopicPage from './pages/TopicsPage'
import AboutMePage from './pages/AboutMePage'


const App = () => {
  return (
    <Router>
      <div className='min-h-screen bg-black text-white'>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dsa-hub" element={<DSAHubPage />} />
            <Route path="/topic/:categoryId/:topicId" element={<TopicPage />} />
            <Route path="/about" element={<AboutMePage />} />
          </Routes>
        </MainLayout>
      </div>
    </Router>
  )
}

export default App