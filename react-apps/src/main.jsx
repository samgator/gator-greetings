import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Login.jsx'
import Profile from './Profile.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<Login/>*/}
    {/*<Profile username="Test User" bio="Test Bio"/>*/}
    <Login/>
  </StrictMode>,
)
