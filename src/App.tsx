import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import { Dashboard, Login, Signup } from './pages/'
import ProtectedWrapper from './routes/ProtectedWrapper'

export const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route
            path="/home"
            element={
              <ProtectedWrapper>
                <Dashboard />
              </ProtectedWrapper>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}
