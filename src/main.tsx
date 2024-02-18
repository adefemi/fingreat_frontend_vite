import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./global.css"
import StoreProvider from './components/hoc/StoreProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StoreProvider>
    <App />
  </StoreProvider>,
)
