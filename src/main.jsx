import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ArticleProvider } from './helpers/ArticleContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ArticleProvider>
      <App />
    </ArticleProvider>
  </React.StrictMode>,
)
