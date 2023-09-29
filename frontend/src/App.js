import React, {useState} from 'react';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminMainPage from './components/AdminMainPage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage'
import EditProfilePage from './components/EditProfilePage'
import ManageMovies from './components/ManageMovies';

const App = () => {
  
  const [search, setSearch] = useState('')
  
  return (
    <div className='App'>
      <BrowserRouter>
      <NavBar setSearch={setSearch} />
        <Routes>
          <Route path='/' element={<HomePage search={search} />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/admin' element={<AdminMainPage />}>
            <Route path='movies' element={<ManageMovies />} />
          </Route>
          <Route path='/editprofile' element={<EditProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;
