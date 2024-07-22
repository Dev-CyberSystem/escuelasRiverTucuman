import { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import logo from '../assets/img/logoEscuela.png';
import "./styleNav.css";

const Navegador = () => {
  const location = useLocation();
  const [navbarColor, setNavbarColor] = useState('navbar-transparent');

  const changeNavbarColorOnScroll = () => {
    if (window.scrollY >= 80) {
      setNavbarColor('navbar-colored');
    } else {
      setNavbarColor('navbar-transparent');
    }
  };

  useEffect(() => {
    if (location.pathname === '/dashboard' || location.pathname === '/contacto') {
      setNavbarColor('navbar-black');
      window.removeEventListener('scroll', changeNavbarColorOnScroll);
    } else {
      changeNavbarColorOnScroll(); // Inicializar el color del navbar según el scroll al cargar la página
      window.addEventListener('scroll', changeNavbarColorOnScroll);
    }
    
    return () => {
      window.removeEventListener('scroll', changeNavbarColorOnScroll);
    };
  }, [location]);

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
              <Nav.Link href="/profes">Profes</Nav.Link>
              <Nav.Link href="/contacto">Contacto</Nav.Link>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navegador;
