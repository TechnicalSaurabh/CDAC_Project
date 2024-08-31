import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Header.css'

export default function Header() {
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light navbar fixed-top navbar-light bg-light">
   <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link class="nav-link" to="/">Home</Link>
      </li>
      <li class="nav-item active">
        <Link class="nav-link" to="/login">Login</Link>
      </li>
    
     
    </ul>
   
  </div>
</nav>
    </>
  )
}
