import { Container, Row, Col } from "react-bootstrap";
import "./StyleFooter.css";
import filial from "../assets/img/logoEscuela.png";
const Footer = () => {
  return (
    <>
      <Container fluid className="containerFooter mt-2">
        <Row>
          <Col className="text-center mt-4">
            <img src={filial} alt="" className="logoFooter" />
            <div className="mt-2">
              <h2>ESCUELAS</h2>
              <h2>RIVER</h2>
              <h2>TUCUMÁN</h2>
            </div>
          </Col>
          <Col className="mt-4">
            <h2>Seguinos en nuestras redes!</h2>
          </Col>
          <Col className="mt-4">
            <h2>Contactanos</h2>
            <p>Telefono: 381-155555555</p>
          </Col>
        </Row>
      </Container>
      <Container fluid className="containerFooter2">
        <p> Desarrollado por: Cibersystem</p>
      </Container>
    </>
  );
};

export default Footer;
