import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router'
import './styles/index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div className="flex min-h-screen items-center justify-center font-bold text-3xl">Quick Strength UI</div>} />
          {/* Layouts and nested routes will go here */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
