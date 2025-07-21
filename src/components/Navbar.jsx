import React from 'react'
import Logo from '../MovieLogo.png'

import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full flex border-b space-x-8 items-center px-6 py-4 bg-white'>
      <img src={Logo} className='w-[40px] rounded-full' alt="Logo" />  
      <Link to="/" className='text-blue-400 text-xl'>Movies</Link> 
      <Link to="/watchlist" className='text-blue-400 text-xl'>WatchList</Link >
    </div>
  )
}

export default Navbar
