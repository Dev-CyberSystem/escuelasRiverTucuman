import { Container, Col, Row } from "react-bootstrap";
import Player1 from "../assets/img/player1.png";
import "./styleMisionVision.css";

const MisionVision = () => {
  return (
    <Container className="contenedorMisionVision">
      <Row>
        <Col>
          <img src={Player1} alt="Jugador" className="img-player1" />
        </Col>
        <Col>
          <h1>Misión y Visión</h1>
          <h2>Misión</h2>
          <p>
            La Escuela de Fútbol de River Plate tiene como misión formar
            personas a través del fútbol, transmitiendo valores y conocimientos
            que les permitan a los alumnos desarrollarse en el deporte y en la
            vida.
          </p>
          <h2>Visión</h2>
          <p>
            La Escuela de Fútbol de River Plate busca ser un referente en la
            formación de jugadores y personas, a través de un proceso de
            enseñanza integral, que les permita a los alumnos alcanzar su máximo
            potencial en el fútbol y en la vida.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default MisionVision;
