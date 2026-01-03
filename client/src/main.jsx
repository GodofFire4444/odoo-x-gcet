import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient } from './../node_modules/@tanstack/query-core/src/queryClient';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClient.Provider client={queryClient}>
    <App />
  </QueryClient.Provider>
)
