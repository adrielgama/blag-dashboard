import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'

import { useAuthContext } from '@/context/AuthContext'

import { AuthProvider } from './context/AuthContext'
import { Dashboard, Login, Signup } from './pages/'

export const App: React.FC = () => {
  const { isAuthenticated } = useAuthContext()

  const elementItem = (element: React.ReactElement): React.ReactElement => {
    return isAuthenticated ? element : <Navigate to="/" replace />
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/home" element={elementItem(<Dashboard />)} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}
