import { Container, Row, Col, Image } from "react-bootstrap";
import EscudoRiver from "../assets/img/escudoRiver.png";
import "./styleValores.css";

const Valores = () => {
  return (
    <Container className="mt-4 ">
      <Row>
        <Col>
          <p className="text-center fw-bolder textoValores">
            Entrená bajo la metodologia y los valores <br /> del Club Atletico River
            Plate
          </p>
        </Col>
        <Col xs={6} md={4}>
          <Image src={EscudoRiver} className="logoValores" />
        </Col>
      </Row>
    </Container>
  );
};

export default Valores;
