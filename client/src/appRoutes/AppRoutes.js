import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Repository from '../pages/Repository'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/repo' element={<Repository />}/>
    </Routes>
  )
}

export default AppRoutes