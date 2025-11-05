import axios from 'axios'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from './context/ThemeContext.tsx'
import './index.css'
import { store } from './redux/store.ts'
import { ToastConfig } from './util/ToastConfig.tsx'
import { ScrollToTop } from './util/scroll_to_top.tsx'
import { Layout } from './components/layout/Layout.tsx'


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
        <ScrollToTop/>
        <Layout />
        <ToastConfig/>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
)
