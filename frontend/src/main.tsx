import axios from 'axios'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import "./i18n";
import { ThemeProvider } from './shared/context/ThemeContext'
import { store } from './shared/store/store'
import { ScrollToTop } from './shared/utils/scroll_to_top'
import { ToastConfig } from './shared/utils/ToastConfig'
import { Layout } from './layout/Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


axios.interceptors.request.use(function (config) {
  if (localStorage.token) {
    config.headers.Authorization = "Bearer " + localStorage.token;
  }
  return config;
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider>

          <ScrollToTop />
          <Layout />
          <ToastConfig />

        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  </BrowserRouter>
)
