import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdminDashboard from './pages/admin/home_admin/AdminDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <AdminDashboard/>
    </>
  )
}

export default App
