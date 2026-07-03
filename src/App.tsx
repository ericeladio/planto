import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import MarketPage from './pages/MarketPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import PrivacyPage from './pages/PrivacyPage'
import BlogListPage from './pages/BlogListPage'
import BlogPostPage from './pages/BlogPostPage'
import PlantDetailPage from './pages/PlantDetailPage'

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/market" element={<MarketPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/plant/:slug" element={<PlantDetailPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
