import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Chatbot from '@/components/Chatbot'

const MainLayout = () => {
  return (
      <div>
          <Navbar />
          <div>
              <Outlet/>
          </div>
          <Chatbot />
    </div>
  )
}

export default MainLayout