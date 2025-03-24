import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Home from './Home.jsx'
import Login from './Login.jsx'
import Profile from './Profile.jsx'
import Message from './Message.jsx'
import MessageCreate from './MessageCreate.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login />} />
          <Route path='home'>
              <Route index element={<Home />} />
              <Route path='message' element={<Message username="Test User" title="Test Title" image="/src/assets/logo.png" content="Test Message" />} />
              <Route path="message/:id" element={<Message />} />
              <Route path='message-create' element={<MessageCreate />} />
              <Route path='profile' element={<Profile username="user"/>} />
          </Route>
      </Routes>
  </BrowserRouter>
);
