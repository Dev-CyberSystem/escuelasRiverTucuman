import { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import { AlumnoContext } from "../context/AlumnoContext";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import "moment-timezone";

const RegistroAsistencia = () => {
  const { alumnosEscuela, getAlumnos } = useContext(AlumnoContext);
  const [alumnosFiltrados, setAlumnosFiltrados] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [asistencias, setAsistencias] = useState([]);
  const [nombreFiltro, setNombreFiltro] = useState("");

  useEffect(() => {
    getAlumnos();
  }, []);

  useEffect(() => {
    if (fechaFiltro) {
      fetchAsistencias();
    } else {
      setAlumnosFiltrados([]);
    }
  }, [fechaFiltro]);

  const fetchAsistencias = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `https://backescuelariver.onrender.com/api/asistencias?fecha=${fechaFiltro}`,
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
    const alumnosConAsistencia = asistencias.map((a) => a.alumnoId._id);
    setAlumnosFiltrados(
      alumnosEscuela.filter(
        (alumno) =>
          alumno.nombre.toLowerCase().includes(nombreFiltro.toLowerCase()) &&
          !alumnosConAsistencia.includes(alumno._id)
      )
    );
  }, [nombreFiltro, alumnosEscuela, asistencias]);

  const handleAsistencia = async (alumnoId) => {
    const token = localStorage.getItem("token");
    const fechaFormateada = moment
      .tz(fechaFiltro, "America/Argentina/Buenos_Aires")
      .format("YYYY-MM-DD");
    try {
       await axios.post(
        `https://backescuelariver.onrender.com/api/asistencias/registro`,
        { alumnoId, fecha: fechaFormateada },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire(
        "Asistencia Registrada",
        "La asistencia ha sido registrada correctamente",
        "success"
      );
      fetchAsistencias();
    } catch (error) {
      console.error("Error al registrar asistencia:", error);
      if (error.response && error.response.status === 401) {
        Swal.fire("Error", "Acceso denegado, token no válido", "error");
      } else {
        Swal.fire(
          "Error",
          error.response.data.message ||
            "Hubo un problema al registrar la asistencia",
          "error"
        );
      }
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>Registro de Asistencia</h1>
          <Form.Group>
            <Form.Label>Buscar por nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre"
              value={nombreFiltro}
              onChange={(e) => setNombreFiltro(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              value={fechaFiltro}
              onChange={(e) => setFechaFiltro(e.target.value)}
              max={moment().format("YYYY-MM-DD")} // Deshabilita fechas futuras
            />
          </Form.Group>
          {fechaFiltro && (
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {alumnosFiltrados.map((alumno) => (
                  <tr key={alumno._id}>
                    <td>{alumno.nombre}</td>
                    <td>{alumno.apellido}</td>
                    <td>{alumno.categoria}</td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => handleAsistencia(alumno._id)}
                      >
                        Registrar Asistencia
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {fechaFiltro && alumnosFiltrados.length === 0 && (
            <p>
              No hay alumnos disponibles para registrar asistencia en esta
              fecha.
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RegistroAsistencia;
