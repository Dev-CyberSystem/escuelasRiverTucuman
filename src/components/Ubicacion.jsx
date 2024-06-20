import { Col, Container, Row } from "react-bootstrap";
import "./styleUbicacion.css";
const Ubicacion = () => {
  return (
    <Container fluid className="containerUbicacion mt-5">
      <Row>
        <Col md={6}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3562.037313710727!2d-65.22999042378488!3d-26.775080487468752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d9a14c8d347%3A0x65dde5975646caec!2sComplejo%20Deportivo%20La%20Diagonal!5e0!3m2!1ses!2sar!4v1718850632015!5m2!1ses!2sar"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </Col>
        <Col md={6} className="datosUbicacion">
          <h2>Ubicación</h2>
          <p>Estamos ubicados en Cabo Quipildor y Alicia Garzón, Tafi Viejo</p>
          <p>Complejo Deportivo</p>
          <p>La Diagonal</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Ubicacion;
