// Импортируем полифилы первыми
import './polyfills'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { tmaService } from './services/tma.service';
import { tonService } from './services/ton.service';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App tma={tmaService} ton={tonService} />
  </React.StrictMode>,
)
