import { createRoot } from 'react-dom/client'
import './index.css'
import { Layout } from './components/layout/Layout.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import axios from 'axios'


axios.interceptors.request.use(function (config) {
    if (localStorage.token) {
        config.headers.Authorization = "Bearer " + localStorage.token;
    }
    return config;
});



createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
)
