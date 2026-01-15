import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { useRoadmapStore } from './store/roadmapStore'

// Initialize stores
useRoadmapStore.getState().initializeRoadmaps();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
