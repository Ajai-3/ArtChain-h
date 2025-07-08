import React from 'react'
import { Routes } from 'react-router-dom'
import UserRoutes from './routes/UserRoutes'
import AdminRoutes from './routes/AdminRoutes'

const App:React.FC = () => {
  return (
    <Routes>
      {AdminRoutes}
      {UserRoutes}
    </Routes>
  )
}

export default App