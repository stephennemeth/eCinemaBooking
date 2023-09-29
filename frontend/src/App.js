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
import CheckoutPage from './components/CheckoutPage'
import ManageUsersPage from './components/ManageUsersPage'
import OrderConfirmationPage from './components/OrderConfirmationPage'
import OrderSummaryPage from './components/OrderSummaryPage'
import SeatSelection from './components/SeatSelection';
import Booking from './components/Booking'

const App = () => {
  
  const [search, setSearch] = useState('')
  
  return (
    <div className='App'>
      <NavBar setSearch={setSearch} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage search={search} />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/admin' element={<AdminMainPage />} />
          <Route path="/admin/movies" element={<ManageMovies />} />
          <Route path='/updateprofile' element={<UpdateProfilePage />} />
          <Route path='/purchasehistory' element={<PurchaseHistory />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/admin/manageusers' element={<ManageUsersPage />} />
          <Route path='/orderconf' element={<OrderConfirmationPage />} />
          <Route path='/ordersum' element={<OrderSummaryPage />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/selection' element={<SeatSelection />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;
