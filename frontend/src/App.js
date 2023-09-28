import React, {useState} from 'react';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ManageMovies from './components/ManageMovies';

const App = () => {
  
  const [search, setSearch] = useState('')
  
  return (
    <div className='App'>
      <BrowserRouter>
      <NavBar setSearch={setSearch} />
        <Routes>
          <Route path='/' element={<HomePage search={search} />} />
          <Route path='/admin/manageMovies' element={<ManageMovies />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;
