import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'

function Header() {
  return (
    <Navbar className="bg-dark">
        <Container>
          <Navbar.Brand>
            <Link to={'/'} style={{textDecoration:'none',color:'white',fontsize:'30px'}}>
            <i class="fa-solid fa-video fa-shake text-warning me-3" ></i>
            Viedo Player
            </Link>
          
          </Navbar.Brand>
        </Container>
      </Navbar>
  )
}

export default Header