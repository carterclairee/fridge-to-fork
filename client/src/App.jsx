import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import Fridge from './components/Fridge';

function App() {
  

  return (
    <>
      <h1>Fridge to Fork</h1>

      <Routes>
        <Route path="/Fridge" element={<Fridge/>}></Route>
      </Routes>
    </>
  )
}

export default App
