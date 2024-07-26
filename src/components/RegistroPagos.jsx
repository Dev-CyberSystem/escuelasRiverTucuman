import { useContext, useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Table,
  Modal,
  Alert,
  Pagination,
} from "react-bootstrap";
import { AlumnoContext } from "../context/AlumnoContext";
import axios from "axios";
import Swal from "sweetalert2";
import "./StyleRegistroPagos.css";

const RegistroPagos = () => {
  const { alumnosEscuela, getAlumnos } = useContext(AlumnoContext);
  const [alumnosFiltrados, setAlumnosFiltrados] = useState([]);
  const [alumnoId, setAlumnoId] = useState("");
  const [mes, setMes] = useState("");
  const [monto, setMonto] = useState("");
  const [fechaPago, setFechaPago] = useState("");
  const [loading, setLoading] = useState(false);
  const [nombreFiltro, setNombreFiltro] = useState("");
  const [mesesAdeudados, setMesesAdeudados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [historialPagos, setHistorialPagos] = useState([]);
  const [alumnosConDeudas, setAlumnosConDeudas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const meses = [
    { nombre: "Enero", valor: 1 },
    { nombre: "Febrero", valor: 2 },
    { nombre: "Marzo", valor: 3 },
    { nombre: "Abril", valor: 4 },
    { nombre: "Mayo", valor: 5 },
    { nombre: "Junio", valor: 6 },
    { nombre: "Julio", valor: 7 },
    { nombre: "Agosto", valor: 8 },
    { nombre: "Septiembre", valor: 9 },
    { nombre: "Octubre", valor: 10 },
    { nombre: "Noviembre", valor: 11 },
    { nombre: "Diciembre", valor: 12 },
  ];

  useEffect(() => {
    getAlumnos();
  }, []);

  useEffect(() => {
    setAlumnosFiltrados(
      alumnosEscuela.filter(
        (alumno) =>
          alumno.nombre.toLowerCase().includes(nombreFiltro.toLowerCase()) &&
          alumno.habilitado
      )
    );
  }, [nombreFiltro, alumnosEscuela]);

  useEffect(() => {
    const alumnosConDeudas = alumnosFiltrados.map((alumno) => {
      const { estadoPago, mesesAdeudados } = verificarEstadoPago(alumno);
      return { ...alumno, estadoPago, mesesAdeudados };
    });
    setAlumnosConDeudas(alumnosConDeudas);
  }, [alumnosFiltrados]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const pago = { alumnoId, mes, monto, fechaPago };
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://backescuelariver.onrender.com/api/pagos",
        pago,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire(
        "Pago Registrado",
        "El pago ha sido registrado correctamente",
        "success"
      );
      setAlumnoId("");
      setMes("");
      setMonto("");
      setFechaPago("");
      fetchMesesAdeudados(alumnoId);
      getAlumnos(); // Actualiza la lista de alumnos después de registrar el pago
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire("Error", "Acceso denegado, token no válido", "error");
      } else {
        Swal.fire("Error", "Hubo un problema al registrar el pago", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNombreFiltroChange = (e) => {
    setNombreFiltro(e.target.value);
  };

  const fetchMesesAdeudados = async (alumnoId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `https://backescuelariver.onrender.com/api/alumno/${alumnoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const alumno = response.data;
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      const fechaIngreso = new Date(alumno.fechaIngreso);
      const mesIngreso = fechaIngreso.getMonth() + 1;
      const pagosRealizados = alumno.pagos.filter((pago) => {
        const pagoDate = new Date(pago.fechaPago);
        return (
          pagoDate.getFullYear() === currentYear && pago.mes <= currentMonth
        );
      });

      const mesesPagados = pagosRealizados.map((pago) => pago.mes);
      const adeudados = meses
        .slice(mesIngreso - 1, currentMonth)
        .filter(({ valor }) => !mesesPagados.includes(valor));

      setMesesAdeudados(adeudados);
    } catch (error) {
      console.log("Error al obtener los meses adeudados:", error);
    }
  };

  const handleAlumnoChange = (e) => {
    const alumnoId = e.target.value;
    setAlumnoId(alumnoId);
    if (alumnoId) {
      fetchMesesAdeudados(alumnoId);
    } else {
      setMesesAdeudados([]);
    }
  };

  const verificarEstadoPago = (alumno) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const fechaIngreso = new Date(alumno.fechaIngreso);
    const mesIngreso = fechaIngreso.getMonth() + 1;

    const pagosRealizados = alumno.pagos.filter((pago) => {
      const pagoDate = new Date(pago.fechaPago);
      return pagoDate.getFullYear() === currentYear && pago.mes <= currentMonth;
    });

    const mesesPagados = pagosRealizados.map((pago) => pago.mes);
    const mesesAdeudados = meses
      .slice(mesIngreso - 1, currentMonth)
      .filter(({ valor }) => !mesesPagados.includes(valor))
      .map(({ nombre }) => nombre);

    const estadoPago = mesesAdeudados.length > 0 ? "Con deuda" : "Al día";

    return { estadoPago, mesesAdeudados };
  };

  const handleShowModal = (alumno) => {
    setSelectedAlumno(alumno);
    setHistorialPagos(alumno.pagos);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAlumno(null);
    setHistorialPagos([]);
  };

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = alumnosConDeudas.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(alumnosConDeudas.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={8}>
          <h1>Registrar Pago</h1>
          <Form onSubmit={handleSubmit} className="registro-pagos-form">
            <Form.Group className="form-group-custom">
              <Form.Label>Buscar por nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre"
                value={nombreFiltro}
                onChange={handleNombreFiltroChange}
                className="rounded-input"
              />
            </Form.Group>
            <Form.Group className="form-group-custom">
              <Form.Label>Alumno</Form.Label>
              <Form.Control
                as="select"
                value={alumnoId}
                onChange={handleAlumnoChange}
                className="rounded-input"
              >
                <option value="">Seleccionar Alumno</option>
                {alumnosFiltrados.map((alumno) => (
                  <option key={alumno._id} value={alumno._id}>
                    {alumno.nombre} {alumno.apellido}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="form-group-custom">
                  <Form.Label>Mes</Form.Label>
                  <Form.Control
                    as="select"
                    value={mes}
                    onChange={(e) => setMes(e.target.value)}
                    className="rounded-input"
                  >
                    <option value="">Seleccionar Mes</option>
                    {mesesAdeudados.map((mes) => (
                      <option key={mes.valor} value={mes.valor}>
                        {mes.nombre}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group-custom">
                  <Form.Label>Monto</Form.Label>
                  <Form.Control
                    type="number"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    className="rounded-input"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="form-group-custom">
              <Form.Label>Fecha de Pago</Form.Label>
              <Form.Control
                type="date"
                value={fechaPago}
                onChange={(e) => setFechaPago(e.target.value)}
                className="rounded-input"
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              disabled={loading || !alumnoId || !mes || !monto || !fechaPago}
              className="rounded-input submit-button"
            >
              {loading ? "Registrando..." : "Registrar Pago"}
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h2>Alumnos</h2>
          <Table striped bordered hover className="styled-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Estado de Pago</th>
                <th>Meses Adeudados</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((alumno) => (
                <tr key={alumno._id}>
                  <td>{alumno.nombre}</td>
                  <td>{alumno.apellido}</td>
                  <td>{alumno.categoria}</td>
                  <td>{alumno.habilitado ? "Habilitado" : "Inhabilitado"}</td>
                  <td>{alumno.estadoPago}</td>
                  <td>{alumno.mesesAdeudados?.join(", ") || "Ninguno"}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => handleShowModal(alumno)}
                    >
                      Mostrar más
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Row>
      {alumnosConDeudas.length > 0 && (
        <Row className="mt-5">
          <Col>
            <Alert variant="warning" className="styled-alert">
              <Alert.Heading>Alumnos con Deudas</Alert.Heading>
              <ul>
                {alumnosConDeudas
                  .filter(
                    (alumno) =>
                      alumno.mesesAdeudados && alumno.mesesAdeudados.length > 0
                  )
                  .map((alumno) => (
                    <li key={alumno._id}>
                      {alumno.nombre} {alumno.apellido} (Categoría:{" "}
                      {alumno.categoria}) debe cuotas:{" "}
                      {alumno.mesesAdeudados.join(", ")}
                    </li>
                  ))}
              </ul>
            </Alert>
          </Col>
        </Row>
      )}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Historial de Pagos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAlumno && (
            <>
              <h5>
                {selectedAlumno.nombre} {selectedAlumno.apellido}
              </h5>
              <Table striped bordered hover className="styled-table">
                <thead>
                  <tr>
                    <th>Mes</th>
                    <th>Monto</th>
                    <th>Fecha de Pago</th>
                  </tr>
                </thead>
                <tbody>
                  {historialPagos.map((pago) => (
                    <tr key={pago._id}>
                      <td>{meses.find((m) => m.valor === pago.mes)?.nombre}</td>
                      <td>{pago.monto}</td>
                      <td>{pago.fechaPago.split("T")[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RegistroPagos;
