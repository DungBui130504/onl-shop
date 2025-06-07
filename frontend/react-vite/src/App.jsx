import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Homepage from './components/homepage/Homepage';
import Register from './components/register/Register';
import UserInfor from './components/settings/UserInfor';
import FavProduct from './components/favoriteProducts/FavProduct';
import Cart from './components/cart/Cart';


//test
import ItemTemplate from './components/items/ItemTemplate';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to="/home" />} />
          <Route path='/home' element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path='/userInfor' element={<UserInfor />} />
          <Route path='/favProducts' element={<FavProduct />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
