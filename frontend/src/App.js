import React, {useState} from 'react';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminMainPage from './components/AdminMainPage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage'
import UpdateProfilePage from './components/UpdateProfilePage'
import ManageMovies from './components/ManageMovies';
import PurchaseHistory from './components/PurchaseHistoryPage'

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
          <Route path='/admin' element={<AdminMainPage />} />
          <Route path="/admin/movies" element={<ManageMovies />} />
          <Route path='/updateprofile' element={<UpdateProfilePage />} />
          <Route path='/purchasehistory' element={<PurchaseHistory />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;
