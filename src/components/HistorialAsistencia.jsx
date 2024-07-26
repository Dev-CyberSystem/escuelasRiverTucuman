import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form } from "react-bootstrap";
import axios from "axios";


const HistorialAsistencia = () => {
  const [asistencias, setAsistencias] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState("");

  const fetchAsistencias = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:8080/api/asistencias?fecha=${fechaFiltro}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAsistencias(response.data);
    } catch (error) {
      console.error("Error al obtener asistencias:", error);
    }
  };

  useEffect(() => {
    if (fechaFiltro) {
      fetchAsistencias();
    } else {
      setAsistencias([]);
    }
  }, [fechaFiltro]);

  const handleFechaChange = (e) => {
    setFechaFiltro(e.target.value);
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>Historial de Asistencia</h1>
          <Form.Group>
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              value={fechaFiltro}
              onChange={handleFechaChange}
            />
          </Form.Group>
          {asistencias.length > 0 ? (
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Categoría</th>
                  <th>Fecha de Asistencia</th>
                </tr>
              </thead>
              <tbody>
                {asistencias.map((asistencia) => (
                  <tr key={asistencia._id}>
                    <td>{asistencia.alumnoId.nombre}</td>
                    <td>{asistencia.alumnoId.apellido}</td>
                    <td>{asistencia.alumnoId.categoria}</td>
                    <td>{asistencia.fecha.split('T')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No hay registros de asistencia para esta fecha.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HistorialAsistencia;
