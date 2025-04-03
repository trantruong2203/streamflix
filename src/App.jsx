import { useContext, useState } from 'react'
import './App.css'
import AdminDashboard from './pages/admin/home_admin/AdminDashboard';
import Home from './pages/client/home/Home'
import { ContextAuth } from "./context/AuthProvider";


function App() {
 
  const { accountLogin } = useContext(ContextAuth);
console.log(accountLogin);

  return (
    <>
    {accountLogin?.role === "admin" ? <AdminDashboard/> :   <Home/>}
    </>
  )
}

export default App
