import { QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { ArticleProvider } from './context/ArticleContext'
import { AuthProvider } from './context/AuthContext'
import { queryClient } from './lib/query'
import { Dashboard, Login, Signup } from './pages/'
import { NotFound404 } from './pages/404'
import ProtectedWrapper from './routes/ProtectedWrapper'

export const App: React.FC = () => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ArticleProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedWrapper>
                    <Dashboard />
                  </ProtectedWrapper>
                }
              />
              <Route path="*" element={<NotFound404 />} />
            </Routes>
          </ArticleProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  )
}
