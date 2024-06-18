import { useState, useEffect } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import logo from '../assets/img/logoEscuela.png'
import "./styleNav.css"


const Navegador = () => {

  const [navbarColor, setNavbarColor] = useState('navbar-transparent');

  const changeNavbarColor = () => {
      if (window.scrollY >= 80) {
          setNavbarColor('navbar-colored');
      } else {
          setNavbarColor('navbar-transparent');
      }
  };

  useEffect(() => {
      window.addEventListener('scroll', changeNavbarColor);
      return () => {
          window.removeEventListener('scroll', changeNavbarColor);
      };
  }, []);

  return (
   
   <>
    <Navbar className={`fixed-top ${navbarColor}`} expand="lg">
      <Container>
      <Navbar.Brand href="/">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Escuelas River
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about">Info Escuela</Nav.Link>
            <Nav.Link href="#link">Noticias</Nav.Link>
            <Nav.Link href="#link">Galeria</Nav.Link>
            <Nav.Link href="#link">Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
   </>
  )
}

export default Navegador