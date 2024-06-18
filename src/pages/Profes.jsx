import { Container, Row, Col, Card } from "react-bootstrap";
import Carrousel from "../components/Carrousel";
import Profe1 from "../assets/img/profe1.png";
import Profe2 from "../assets/img/profe2.png";
import Profe3 from "../assets/img/profe3.png";
import Profe4 from "../assets/img/profe4.png";

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
      foto:  Profe2,
    },
    {
      nombre: "Profesor 3",
      especialidad: "Especialista en defensa y mediocampo",
      foto: Profe3 ,
    },
    {
      nombre: "Profesor 4",
      especialidad: "Especialista en delantera y arqueros",
      foto:  Profe4,
    },
    {
      nombre: "Profesor 5",
      especialidad: "Especialista en defensa y mediocampo",
      foto: Profe1,
    },
    {
      nombre: "Profesor 6",
      especialidad: "Especialista en delantera y arqueros",
      foto:  Profe1 ,
    },
  ];

  return (
    <Container fluid className="containerProfes">
      <Carrousel />
      <Row className="mt-5">
        <h1>Profes</h1>
        <p>
          Nuestros profesores son los mejores, con años de experiencia en el
          club y en la docencia.
        </p>
        {profesores.map((profesor, index) => (
          <Col key={index} md={4}>
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
