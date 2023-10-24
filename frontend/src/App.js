import React, {useState, useEffect} from 'react';
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
import ManagePromotions from './components/ManagePromotions';

const App = () => {
  
  const [search, setSearch] = useState('')
  const [user, setUser] = useState(null)

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar setSearch={setSearch} user={user} setUser={setUser}/>
        <Routes>
          <Route path='/' element={<HomePage search={search}/>} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage setUser={setUser}/>} />
          <Route path='/admin' element={<AdminMainPage />} />
          <Route path="/admin/movies" element={<ManageMovies />} />
          <Route path='/updateprofile' element={<UpdateProfilePage/>} />
          <Route path='/purchasehistory' element={<PurchaseHistory />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/admin/manageusers' element={<ManageUsersPage />} />
          <Route path='/orderconf' element={<OrderConfirmationPage />} />
          <Route path='/ordersum' element={<OrderSummaryPage />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/selection' element={<SeatSelection />} />
          <Route path="/admin/promotions" element={<ManagePromotions />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;
