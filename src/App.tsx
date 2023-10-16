import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// import { ThemeProvider } from './components/Theme/theme-provider'
import { ArticleProvider } from './context/ArticleContext'
import { AuthProvider } from './context/AuthContext'
import { Dashboard, Login, Signup } from './pages/'
import ProtectedWrapper from './routes/ProtectedWrapper'

export const App: React.FC = () => {
  return (
    <Router>
      {/* <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme"> */}
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
          </Routes>
        </ArticleProvider>
      </AuthProvider>
      {/* </ThemeProvider> */}
    </Router>
  )
}
