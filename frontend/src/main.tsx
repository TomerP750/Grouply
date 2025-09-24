import { createRoot } from 'react-dom/client'
import './index.css'
import { Layout } from './components/layout/Layout.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.tsx'



createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  </BrowserRouter>
)
