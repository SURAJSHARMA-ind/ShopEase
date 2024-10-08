import React from 'react'
import { Outlet } from "react-router-dom";
import { Footer, Home, Navbar } from './components';
import UserContextProvider from './context/userDetail/UserContextProvider';
import AuthProvider from './context/Auth/AuthContextProvider';

function App() {
  return (
    <>
      <AuthProvider>
        <UserContextProvider>
          <Navbar />
          <Outlet />
          <Footer />
        </UserContextProvider>
      </AuthProvider>
    </>
  )
}

export default App
