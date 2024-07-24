import { Container, Col, Row } from "react-bootstrap"
import RegistroAsistencia from "./RegistroAsistencia"
import HistorialAsistencia from "./HistorialAsistencia"


const Asistencia = () => {
  return (
    <Container>
        <Row>
            <Col>
            <RegistroAsistencia />
            </Col>
            <Col>
            <HistorialAsistencia />
            </Col>
        </Row>
    </Container>
  )
}

export default Asistencia