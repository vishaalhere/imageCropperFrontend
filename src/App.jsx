import Register from './components/Register/Register'
import './reset.css'
import './variables.css'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EditImage from './components/EditImage/EditImage';
import { useState } from 'react';

function App() {
  const [profilePreview, setProfilePreview] = useState('');
  const [profile, setProfile] = useState('');

  return (
    <>
      <Router>
        <Routes>
          {profilePreview ? <Route exact path="/crop" element={<EditImage profile={profile} profilePreview={profilePreview} />} /> : <Route path="/crop" element={<Navigate replace to="/" />} />}
          <Route exact path="/" element={<Register profile={profile} setProfile={setProfile} setProfilePreview={setProfilePreview} />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
