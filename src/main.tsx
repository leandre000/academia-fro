import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { useRoadmapStore } from './store/roadmapStore'
import { useStudentStore } from './store/studentStore'

// Initialize stores
useRoadmapStore.getState().initializeRoadmaps();
useStudentStore.getState().initializeStudents();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
