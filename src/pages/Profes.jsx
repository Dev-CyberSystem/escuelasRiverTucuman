import { Container, Row, Col, Card } from "react-bootstrap";
import Carrousel from "../components/Carrousel";
import Profe1 from "../assets/img/agustin.png";
import Profe2 from "../assets/img/profe2.png";
import Profe3 from "../assets/img/profe3.png";
import Profe4 from "../assets/img/profe4.png";
import Profe5 from "../assets/img/francisco.png";
import Profe6 from "../assets/img/ignacio.png";
import Profe7 from "../assets/img/matias.png";
import Profe8 from "../assets/img/sergio.png";

const Profes = () => {
  // cada profesor deberia tener un nombre, una especialidad y una foto
  const profesores = [
    {
      nombre: "Profesor 1",
      especialidad: "Especialista en defensa y mediocampo",
      foto: Profe1,
    },
    {
      nombre: "Profesor 2",
      especialidad: "Especialista en delantera y arqueros",
      foto: Profe2,
    },
    {
      nombre: "Profesor 3",
      especialidad: "Especialista en defensa y mediocampo",
      foto: Profe3,
    },
    {
      nombre: "Profesor 4",
      especialidad: "Especialista en delantera y arqueros",
      foto: Profe4,
    },
    {
      nombre: "Francisco",
      especialidad: "Especialista en defensa y mediocampo",
      foto: Profe5,
    },
    {
      nombre: "Ignacio",
      especialidad: "Especialista en delantera y arqueros",
      foto: Profe6,
    },
    {
      nombre: "Matias",
      especialidad: "Especialista en defensa y mediocampo",
      foto: Profe7,
    },
    {
      nombre: "Sergio",
      especialidad: "Especialista en delantera y arqueros",
      foto: Profe8,
    },
  ];

  return (
    <Container fluid className="containerProfes">
      <Carrousel />
      <Row className="mt-5 text-center">
        <Col>
          <h1>Profes</h1>
          <p>
            Nuestros profesores son los mejores, con años de experiencia en el
            club y en la docencia.
          </p>
        </Col>
      </Row>
      <Row className="mt-3 d-flex justify-content-center">
        {profesores.map((profesor, index) => (
          <Col
            key={index}
            xs={12}
            sm={6}
            md={4}
            className="d-flex justify-content-center mb-4"
          >
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={profesor.foto} />
              <Card.Body>
                <Card.Title>{profesor.nombre}</Card.Title>
                <Card.Text>{profesor.especialidad}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Profes;
