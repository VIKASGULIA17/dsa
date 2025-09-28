import React from 'react'
import { EnhancedNavbar } from '../Navbar/navbar'

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black p-10">
      <EnhancedNavbar />
      <main className="relative">
        {children}
      </main>
    </div>
  )
}