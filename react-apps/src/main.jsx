import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Login from './Login.jsx'
import Profile from './Profile.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='profile' element={<Profile username="Test User" bio="Test Bio"/>}/>
    </Routes>
  </BrowserRouter>
);
