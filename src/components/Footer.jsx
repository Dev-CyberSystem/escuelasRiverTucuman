import { Container, Row, Col } from "react-bootstrap";
import "./StyleFooter.css";
import filial from "../assets/img/logoEscuela.png";
import "bootstrap-icons/font/bootstrap-icons.css";


const Footer = () => {
  return (
    <>
      <Container fluid className="containerFooter">
        <Row className="text-center text-md-left mt-4">
          <Col xs={12} md={6} lg={3} className="mb-4 mb-lg-0 d-flex flex-column align-items-center align-items-md-start">
            <img src={filial} alt="" className="logoFooter" />
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4 mb-lg-0 d-flex flex-column align-items-center align-items-md-start">
            <div>
              <h2>ESCUELAS</h2>
              <h2>RIVER</h2>
              <h2>TUCUMÁN</h2>
            </div>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4 mb-lg-0 d-flex flex-column align-items-center align-items-md-start">
            <h4>Seguinos en nuestras redes!</h4>
            <a
              href="https://www.instagram.com/escuelarivertucuman/"
              target="_blank"
              rel="noreferrer"
            >
             <i className="bi bi-instagram"></i> Escuelas River Tucumán
            </a>
          </Col>
          <Col xs={12} md={6} lg={3} className="d-flex flex-column align-items-center align-items-md-start">
            <h2>Contactanos</h2>
            <p>
              <a
                href="https://wa.me/5493812373837"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
               <i className="bi bi-whatsapp"></i>  Telefono: +54 9 381 237-3837
              </a>
            </p>
          </Col>
        </Row>
      </Container>
      <Container fluid className="containerFooter2">
        <p>Desarrollado por: Cibersystem</p>
      </Container>
    </>
  );
};

export default Footer;
