import { useState } from 'react'
import Home from './assets/components/Home'
import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './assets/components/Login'
import Signup from './assets/components/Signup'
import NotFound404 from './assets/components/NotFound404'
import CategoryPage from './assets/components/CategoryPage'
import ItemPage from './assets/components/ItemPage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup/>} />
        <Route path="*" element={<NotFound404/>} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/category/:categoryName/:itemName" element={<ItemPage />} />

      </Routes>


    </>
  )
}

export default App
