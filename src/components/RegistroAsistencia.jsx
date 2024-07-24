import { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button, Alert, Pagination } from "react-bootstrap";
import { AlumnoContext } from "../context/AlumnoContext";
import axios from "axios";
import Swal from "sweetalert2";

const RegistroAsistencia = () => {
  const { alumnosEscuela, getAlumnos } = useContext(AlumnoContext);
  const [alumnosFiltrados, setAlumnosFiltrados] = useState([]);
  const [nombreFiltro, setNombreFiltro] = useState("");
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    getAlumnos();
  }, []);

  useEffect(() => {
    if (fechaFiltro) {
      fetchAsistencias();
    } else {
      setAlumnosFiltrados(alumnosEscuela);
    }
  }, [fechaFiltro, alumnosEscuela]);

  useEffect(() => {
    if (!fechaFiltro) {
      setAlumnosFiltrados(alumnosEscuela.filter(alumno =>
        alumno.nombre.toLowerCase().includes(nombreFiltro.toLowerCase())
      ));
    }
  }, [nombreFiltro, alumnosEscuela, fechaFiltro]);

  const fetchAsistencias = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("https://backescuelariver.onrender.com/api/asistencias", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { fecha: fechaFiltro },
      });
      const asistenciasRegistradas = response.data;
      const alumnosConAsistencia = asistenciasRegistradas.map(asistencia => asistencia.alumnoId._id);
      const alumnosDisponibles = alumnosEscuela.filter(alumno => !alumnosConAsistencia.includes(alumno._id));
      setAlumnosFiltrados(alumnosDisponibles);
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al obtener las asistencias", "error");
    }
  };

  const handleAsistencia = async (alumnoId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "https://backescuelariver.onrender.com/api/asistencias",
        { alumnoId, fecha: fechaFiltro },
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
      fetchAsistencias(); // Actualiza la lista de alumnos disponibles
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire("Error", "Acceso denegado, token no válido", "error");
      } else {
        Swal.fire("Error", error.response.data.message || "Hubo un problema al registrar la asistencia", "error");
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = alumnosFiltrados
    .filter(alumno => alumno.nombre.toLowerCase().includes(nombreFiltro.toLowerCase()))
    .slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(alumnosFiltrados.length / itemsPerPage);

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>Registro de Asistencia</h1>
          <Form.Group>
            <Form.Label>Buscar por fecha</Form.Label>
            <Form.Control
              type="date"
              value={fechaFiltro}
              onChange={(e) => setFechaFiltro(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Buscar por nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre"
              value={nombreFiltro}
              onChange={(e) => setNombreFiltro(e.target.value)}
            />
          </Form.Group>
          {currentItems.length > 0 ? (
            <>
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
                  {currentItems.map((alumno) => (
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
              <Pagination className="mt-3">
                {Array.from({ length: totalPages }, (_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </>
          ) : (
            <Alert variant="info" className="mt-3">
              No hay alumnos disponibles para registrar asistencia en esta fecha.
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RegistroAsistencia;
