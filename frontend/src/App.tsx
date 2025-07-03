import React from 'react'
import { Routes } from 'react-router-dom'
import UserRoutes from './routes/UserRoutes'

const App:React.FC = () => {
  return (
    <Routes>
      {UserRoutes}
    </Routes>
  )
}

export default App