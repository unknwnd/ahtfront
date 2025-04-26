// Импортируем полифилы первыми
import './polyfills'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { tmaService } from './services/tma.service';
import { tonService } from './services/ton.service';
import { ThemeProvider } from './context/ThemeContext';

// Отключаем проблемное поведение скроллинга
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
    <App tma={tmaService} ton={tonService} />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
