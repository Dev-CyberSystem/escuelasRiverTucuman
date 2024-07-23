// NotFound.js

import { Container, Row } from "react-bootstrap";
import Logo from "../../public/escudoRiver.png";
import "./styleNotFound.css";

const NotFound = () => {
  return (
    <Container fluid className="containerNotFound text-center">
      <Row className="justify-content-center">
        <img className="logoNotFound" src={Logo} alt="Logo Not Found" />
      </Row>
      <Row className="justify-content-center">
        <h1>Página no encontrada</h1>
      </Row>
    </Container>
  );
};

export default NotFound;
