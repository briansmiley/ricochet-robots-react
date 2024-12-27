import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RicochetRobots from './RicochetRobots.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RicochetRobots />
  </StrictMode>,
)
