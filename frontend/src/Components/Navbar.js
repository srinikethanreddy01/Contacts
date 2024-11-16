import React from 'react'
import logo from './logo.svg'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <div className='myNavbar'>
    
      <img src={logo} width={32}></img>
      lorem


      <div className='nav-link'>
        <Link to={'/'} style={{color:'white '}}>create</Link>
        <Link to={'/details'} style={{color:'white'}}>view</Link>
      </div>
    </div>
  )
}

export default Navbar
