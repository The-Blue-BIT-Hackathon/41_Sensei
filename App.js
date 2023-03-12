import logo from './logo.svg';
import './App.css';
import { Axios } from 'axios';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import Hotels from './components/hotel';
import Home from './components/home';



function App() {
  
  
  
  return (
    <>


<Routes>
    <Route path='/hotels' element={<Hotels/>}></Route>
    <Route path='/' element={<Home/>}></Route>
   
  
  
   </Routes>

      
    </>
  );
}

export default App;
