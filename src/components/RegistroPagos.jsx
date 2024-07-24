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
} from "react-bootstrap";
import { AlumnoContext } from "../context/AlumnoContext";
import axios from "axios";
import Swal from "sweetalert2";

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
    const alumnosConDeudas = alumnosFiltrados.filter((alumno) => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      const pagosRealizados = alumno.pagos.filter((pago) => {
        const pagoDate = new Date(pago.fechaPago);
        return (
          pagoDate.getFullYear() === currentYear && pago.mes <= currentMonth
        );
      });

      const mesesPagados = pagosRealizados.map((pago) => pago.mes);
      const mesesAdeudados = meses
        .slice(0, currentMonth)
        .filter(({ valor }) => !mesesPagados.includes(valor));

      return mesesAdeudados.length > 0;
    });

    setAlumnosConDeudas(alumnosConDeudas);
  }, [alumnosFiltrados]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const pago = { alumnoId, mes, monto, fechaPago };
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:8080/api/pagos", pago, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    console.log(alumnoId, "alumnoId");
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:8080/api/pagos/alumno/${alumnoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data, "response.data");
      const pagos = response.data;
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      const adeudados = meses.filter(
        ({ valor }) =>
          !pagos.some(
            (pago) =>
              pago.mes === valor &&
              new Date(pago.fechaPago).getFullYear() === currentYear &&
              valor <= currentMonth
          )
      );
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
    console.log(alumno, "alumno")
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const pagosRealizados = alumno.pagos.filter((pago) => {
      const pagoDate = new Date(pago.fechaPago);
      return pagoDate.getFullYear() === currentYear && pago.mes <= currentMonth;
    });

    console.log(pagosRealizados, "----------< pagosRealizados")

    const mesesPagados = pagosRealizados.map((pago) => pago.mes);
    const mesesAdeudados = meses
      .slice(0, currentMonth)
      .filter(({ valor }) => !mesesPagados.includes(valor));

    return mesesAdeudados.length > 0 ? "Con deuda" : "Al día";
  };

  const handleShowModal = (alumno) => {
    setSelectedAlumno(alumno);
    fetchHistorialPagos(alumno._id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAlumno(null);
    setHistorialPagos([]);
  };

  const fetchHistorialPagos = async (alumnoId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:8080/api/pagos/alumno/${alumnoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data, "response.dataHISTORIAL")
      setHistorialPagos(response.data);
    } catch (error) {
      console.log("Error al obtener el historial de pagos:", error);
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>Registrar Pago</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Buscar por nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre"
                value={nombreFiltro}
                onChange={handleNombreFiltroChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Alumno</Form.Label>
              <Form.Control
                as="select"
                value={alumnoId}
                onChange={handleAlumnoChange}
              >
                <option value="">Seleccionar Alumno</option>
                {alumnosFiltrados.map((alumno) => (
                  <option key={alumno._id} value={alumno._id}>
                    {alumno.nombre} {alumno.apellido}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Mes</Form.Label>
              <Form.Control
                as="select"
                value={mes}
                onChange={(e) => setMes(e.target.value)}
              >
                <option value="">Seleccionar Mes</option>
                {mesesAdeudados.map((mes) => (
                  <option key={mes.valor} value={mes.valor}>
                    {mes.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Monto</Form.Label>
              <Form.Control
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha de Pago</Form.Label>
              <Form.Control
                type="date"
                value={fechaPago}
                onChange={(e) => setFechaPago(e.target.value)}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              disabled={loading || !alumnoId || !mes || !monto || !fechaPago}
            >
              {loading ? "Registrando..." : "Registrar Pago"}
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h2>Alumnos</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Estado de Pago</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnosFiltrados.map((alumno) => (
                <tr key={alumno._id}>
                  <td>{alumno.nombre}</td>
                  <td>{alumno.apellido}</td>
                  <td>{alumno.categoria}</td>
                  <td>{alumno.habilitado ? "Habilitado" : "Inhabilitado"}</td>
                  <td>{verificarEstadoPago(alumno)}</td>
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
        </Col>
      </Row>
      {alumnosConDeudas.length > 0 && (
        <Row className="mt-5">
          <Col>
            <Alert variant="warning">
              <Alert.Heading>Alumnos con Deudas</Alert.Heading>
              <ul>
                {alumnosConDeudas.map((alumno) => (
                  <li key={alumno._id}>
                    {alumno.nombre} {alumno.apellido} (Categoría:{" "}
                    {alumno.categoria}) debe cuotas
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
              <Table striped bordered hover>
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
                      <td>{new Date(pago.fechaPago).toLocaleDateString()}</td>
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
