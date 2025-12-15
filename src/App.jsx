import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext'
import { MainLayout } from './components/layouts/MainLayout'
import { AppLayout } from './components/layouts/AppLayout'
import HomePage from './pages/HomePage'
import DSAHubPage from './pages/DsaHubPage'
import TopicPage from './pages/TopicsPage'
import AboutMePage from './pages/AboutMePage'
import ProblemsPage from './pages/ProblemsPage'
import ProblemDetailPage from './pages/ProblemDetailPage'
import ContestsPage from './pages/ContestsPage'
import ContestDetailPage from './pages/ContestDetailPage'
import VisualizerPage from './pages/VisualizerPage'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className='min-h-screen bg-black text-white'>
            <Routes>
              {/* Public routes with MainLayout */}
              <Route path="/" element={
                <MainLayout>
                  <HomePage />
                </MainLayout>
              } />
              <Route path="/dsa-hub" element={
                <MainLayout>
                  <DSAHubPage />
                </MainLayout>
              } />
              <Route path="/topic/:categoryId/:topicId" element={
                <MainLayout>
                  <TopicPage />
                </MainLayout>
              } />
              <Route path="/about" element={
                <MainLayout>
                  <AboutMePage />
                </MainLayout>
              } />
              <Route path="/visualizer" element={
                <MainLayout>
                  <VisualizerPage />
                </MainLayout>
              } />
              
              {/* Auth routes */}
              <Route path="/login" element={<AuthPage />} />
              
              {/* App routes with AppLayout (sidebar) */}
              <Route path="/problems" element={
                <AppLayout>
                  <ProblemsPage />
                </AppLayout>
              } />
              <Route path="/problems/:id" element={
                <AppLayout>
                  <ProblemDetailPage />
                </AppLayout>
              } />
              <Route path="/contests" element={
                <AppLayout>
                  <ContestsPage />
                </AppLayout>
              } />
              <Route path="/contests/:id" element={
                <AppLayout>
                  <ContestDetailPage />
                </AppLayout>
              } />
              <Route path="/profile" element={
                <AppLayout>
                  <ProfilePage />
                </AppLayout>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App