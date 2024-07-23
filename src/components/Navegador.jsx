import { useContext } from "react";
import { useState, useEffect } from "react";
import { Navbar, Container, Nav, Button, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/img/logoEscuela.png";
import { UsersProvider } from "../context/UsersContext";
import Login from "./Login";
import "./styleNav.css";

const Navegador = () => {
  const location = useLocation();
  const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const { logOut } = useContext(UsersProvider);

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const changeNavbarColorOnScroll = () => {
    if (window.scrollY >= 80) {
      setNavbarColor("navbar-colored");
    } else {
      setNavbarColor("navbar-transparent");
    }
  };

  useEffect(() => {
    if (
      location.pathname === "/api/admin" ||
      location.pathname === "/contacto"
    ) {
      setNavbarColor("navbar-black");
      window.removeEventListener("scroll", changeNavbarColorOnScroll);
    } else {
      changeNavbarColorOnScroll(); // Inicializar el color del navbar según el scroll al cargar la página
      window.addEventListener("scroll", changeNavbarColorOnScroll);
    }

    return () => {
      window.removeEventListener("scroll", changeNavbarColorOnScroll);
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
            />{" "}
            Escuelas River
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/profes">Profes</Nav.Link>
              <Nav.Link href="/contacto">Contacto</Nav.Link>
              {user?.admin ? (
                <Nav.Link onClick={() => navigate("/api/admin")}>
                  Dashboard
                </Nav.Link>
              ) : null}

              {user ? (
                <Button variant="danger" onClick={() => logOut()}>
                  Cerrar Sesión
                </Button>
              ) : (
                <Button variant="success" onClick={handleShow}>
                  Iniciar Sesión
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Inicio de sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navegador;
