import { inject } from '@vercel/analytics'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'

import { App } from './App'

import './index.css'

inject()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <main className="login">
    <App />
    <Toaster />
  </main>
)
