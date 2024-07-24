import { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Pagination, Alert } from "react-bootstrap";
import { AlumnoContext } from "../context/AlumnoContext";
import axios from "axios";
import Swal from "sweetalert2";

const HistorialAsistencia = () => {
  const { alumnosEscuela, getAlumnos } = useContext(AlumnoContext);
  const [asistencias, setAsistencias] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [generoFiltro, setGeneroFiltro] = useState("");
  const [nombreFiltro, setNombreFiltro] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    getAlumnos();
  }, []);

  useEffect(() => {
    if (fechaFiltro) {
      fetchAsistencias();
    } else {
      setAsistencias([]);
    }
  }, [fechaFiltro, categoriaFiltro, generoFiltro, nombreFiltro]);

  const fetchAsistencias = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get("https://backescuelariver.onrender.com/api/asistencias", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          fecha: fechaFiltro,
          categoria: categoriaFiltro,
          genero: generoFiltro,
        },
      });
      setAsistencias(response.data);
      setCurrentPage(1); // Reset pagination to the first page
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al obtener las asistencias", "error");
    } finally {
      setLoading(false);
    }
  };

  const alumnosFiltrados = asistencias.filter(asistencia => {
    const alumno = asistencia.alumnoId;
    const asistenciaFecha = new Date(asistencia.fecha);
    const filtroFecha = new Date(fechaFiltro);
    const mismaFecha = asistenciaFecha.toDateString() === filtroFecha.toDateString();

    return (
      (!fechaFiltro || mismaFecha) &&
      (categoriaFiltro === "" || alumno.categoria === parseInt(categoriaFiltro)) &&
      (generoFiltro === "" || alumno.genero === generoFiltro) &&
      (nombreFiltro === "" || alumno.nombre.toLowerCase().includes(nombreFiltro.toLowerCase()))
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = alumnosFiltrados.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES");
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>Historial de Asistencia</h1>
          <Form.Group>
            <Form.Label>Buscar por fecha</Form.Label>
            <Form.Control
              type="date"
              value={fechaFiltro}
              onChange={(e) => setFechaFiltro(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Buscar por categoría</Form.Label>
            <Form.Control
              as="select"
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
            >
              <option value="">Todas</option>
              {[...new Set(alumnosEscuela.map((alumno) => alumno.categoria))].map(
                (categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                )
              )}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Buscar por género</Form.Label>
            <Form.Control
              as="select"
              value={generoFiltro}
              onChange={(e) => setGeneroFiltro(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </Form.Control>
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
          {loading ? (
            <Alert variant="info" className="mt-3">
              Cargando...
            </Alert>
          ) : alumnosFiltrados.length > 0 ? (
            <>
              <Table striped bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Categoría</th>
                    <th>Género</th>
                    <th>Fecha de Asistencia</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((asistencia) => {
                    const alumno = asistencia.alumnoId;
                    return (
                      <tr key={asistencia._id}>
                        <td>{alumno.nombre}</td>
                        <td>{alumno.apellido}</td>
                        <td>{alumno.categoria}</td>
                        <td>{alumno.genero}</td>
                        <td>{formatDate(asistencia.fecha)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Pagination>
                {Array.from({ length: Math.ceil(alumnosFiltrados.length / itemsPerPage) }, (_, index) => (
                  <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </>
          ) : (
            !loading && fechaFiltro && (
              <Alert variant="info" className="mt-3">
                Fecha sin actividad
              </Alert>
            )
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HistorialAsistencia;
