import { useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  Pagination,
} from "react-bootstrap";
import { AlumnoContext } from "../context/AlumnoContext";
import "./styleAlumnos.css";
import Swal from "sweetalert2";
import FormularioAlta from "./FormularioAlta";

const Alumnos = () => {
  const { alumnosEscuela, deleteAlumno, updateAlumno } = useContext(AlumnoContext);

  const [nombreFiltro, setNombreFiltro] = useState("");
  const [posicionFiltro, setPosicionFiltro] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalEdicion, setShowModalEdicion] = useState(false);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [habilitadoFiltro, setHabilitadoFiltro] = useState(""); // Nuevo filtro


  const alumnosPerPage = 12;

  const handleNombreFiltroChange = (e) => {
    setNombreFiltro(e.target.value);
  };

  const handlePosicionFiltroChange = (e) => {
    setPosicionFiltro(e.target.value);
  };

  const handleCategoriaFiltroChange = (e) => {
    setCategoriaFiltro(e.target.value);
  };
  const handleHabilitadoFiltroChange = (e) => {
    setHabilitadoFiltro(e.target.value);
  };

  const alumnosFiltrados = alumnosEscuela.filter(
    (alumno) =>
      alumno.nombre?.toLowerCase().includes(nombreFiltro.toLowerCase()) &&
      (posicionFiltro === "" || alumno.posicion === posicionFiltro) &&
      (categoriaFiltro === "" || alumno.categoria === parseInt(categoriaFiltro)) &&
      (habilitadoFiltro === "" || alumno.habilitado === (habilitadoFiltro === "true"))
  );

  const handleClear = (_id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este alumno",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAlumno(_id)
          .then(() => {
            Swal.fire("Borrado", "El alumno ha sido eliminado", "success");
          })
          .catch((error) => {
            Swal.fire(
              "Error",
              "Hubo un problema al eliminar el alumno",
              "error"
            );
            console.log(error, "error");
          });
      }
    });
  };

  const handleToggleHabilitado = (alumno) => {
    const updatedAlumno = { ...alumno, habilitado: !alumno.habilitado };
    updateAlumno(updatedAlumno)
      .then(() => {
        const action = alumno.habilitado ? 'inhabilitado' : 'habilitado';
        Swal.fire("Actualizado", `El alumno ha sido ${action}`, "success");
      })
      .catch((error) => {
        Swal.fire("Error", "Hubo un problema al actualizar el alumno", "error");
        console.log(error, "error");
      });
  };

  const handleShowModal = (alumno) => {
    setSelectedAlumno(alumno);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAlumno(null);
  };

  const handleEdit = () => {
    setShowModal(false);
    setShowModalEdicion(true);
  };

  const handleCloseModalEdicion = () => {
    setShowModalEdicion(false);
  };

  // Paginación
  const indexOfLastAlumno = currentPage * alumnosPerPage;
  const indexOfFirstAlumno = indexOfLastAlumno - alumnosPerPage;
  const currentAlumnos = alumnosFiltrados.slice(
    indexOfFirstAlumno,
    indexOfLastAlumno
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(alumnosFiltrados.length / alumnosPerPage);

  return (
    <Container fluid className="containerProfes">
      <Row className="mt-5 text-center">
        <Col>
          <h1>Alumnos</h1>
          <p>
            A continuación se presentan los alumnos de la escuela, los cuales se
            destacan por su dedicación y esfuerzo.
          </p>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6} className="mb-3">
          <Form.Control
            type="text"
            placeholder="Buscar por nombre"
            value={nombreFiltro}
            onChange={handleNombreFiltroChange}
          />
        </Col>
        <Col md={6} className="mb-3">
          <Form.Control
            as="select"
            value={posicionFiltro}
            onChange={handlePosicionFiltroChange}
          >
            <option value="">Todas las Posiciones</option>
            {[...new Set(alumnosEscuela.map((alumno) => alumno.posicion))].map(
              (posicion, index) => (
                <option key={index} value={posicion}>
                  {posicion}
                </option>
              )
            )}
          </Form.Control>
        </Col>
        <Col md={6} className="mb-3">
          <Form.Control
            as="select"
            value={categoriaFiltro}
            onChange={handleCategoriaFiltroChange}
          >
            <option value="">Todas las categorías</option>
            {[...new Set(alumnosEscuela.map((alumno) => alumno.categoria))].map(
              (categoria, index) => (
                <option key={index} value={categoria}>
                  {categoria}
                </option>
              )
            )}
          </Form.Control>
        </Col>
        <Col md={6} className="mb-3">
          <Form.Control
            as="select"
            value={habilitadoFiltro}
            onChange={handleHabilitadoFiltroChange}
          >
            <option value="">Todos los Estados</option>
            <option value="true">Habilitados</option>
            <option value="false">Inhabilitados</option>
          </Form.Control>
        </Col>
      </Row>
      <Row className="mt-3 d-flex justify-content-center">
        {currentAlumnos.map((alumno, index) => (
          <Col
            key={index}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="d-flex justify-content-center mb-4"
          >
            <Card className={`card-custom ${!alumno.habilitado && 'inhabilitado'}`}>
              <Card.Img
                variant="top"
                src={alumno.imagen}
                className="card-img-top"
              />
              <Card.Body className="card-body-custom">
                <Card.Title className="card-title-custom">
                  Nombre: {alumno.nombre} {alumno.apellido}
                </Card.Title>
                <Card.Text className="card-text-custom">
                  Posición: {alumno.posicion}
                </Card.Text>
                <Card.Text className="card-text-custom">
                  Categoria: {alumno.categoria}
                </Card.Text>
                <Card.Text className="card-text-custom">
                  Estado: {alumno.habilitado ? 'Habilitado' : 'Inhabilitado'}
                </Card.Text>
                <Button
                  variant="primary"
                  className="card-button-custom m-2"
                  onClick={() => handleShowModal(alumno)}
                >
                  Ver más
                </Button>
                <Button
                  variant="outline-danger"
                  className="card-button-custom ms-2 m-2"
                  onClick={() => handleClear(alumno._id)}
                >
                  Borrar
                </Button>
                <Button
                  variant={alumno.habilitado ? "outline-warning" : "outline-success"}
                  className="card-button-custom ms-2 m-2"
                  onClick={() => handleToggleHabilitado(alumno)}
                >
                  {alumno.habilitado ? "Inhabilitar" : "Habilitar"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-3">
        <Col className="d-flex justify-content-center">
          <Pagination>
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Row>

      {selectedAlumno && (
        <>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title className="modal-title-custom">
                Información del Alumno
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-content-custom">
              <img
                src={selectedAlumno.imagen}
                alt="Imagen del alumno"
                className="img-fluid-custom mb-3"
              />

              <p>
                <strong>Nombre:</strong> {selectedAlumno.nombre}
              </p>
              <p>
                <strong>Apellido:</strong> {selectedAlumno.apellido}
              </p>
              <p>
                <strong>DNI:</strong> {selectedAlumno.dni}
              </p>
              <p>
                <strong>Fecha de Nacimiento:</strong>{" "}
                {selectedAlumno.fechaNacimiento}
              </p>
              <p>
                <strong>Teléfono:</strong> {selectedAlumno.telefono}
              </p>
              <p>
                <strong>Dirección:</strong> {selectedAlumno.direccion}
              </p>
              <p>
                <strong>Email:</strong> {selectedAlumno.email}
              </p>
              <p>
                <strong>Padre/Tutor:</strong> {selectedAlumno.padreTutor}
              </p>
              <p>
                <strong>Teléfono de Contacto:</strong>{" "}
                {selectedAlumno.telefonoContacto}
              </p>
              <p>
                <strong>Posición:</strong> {selectedAlumno.posicion}
              </p>
              <p>
                <strong>Fecha de Ingreso:</strong> {selectedAlumno.fechaIngreso}
              </p>
              <p>
                <strong>Genero:</strong> {selectedAlumno.genero}
              </p>
              <p>
                <strong>Observaciones:</strong> {selectedAlumno.observaciones}
              </p>
              <p>
                <strong>Estado:</strong> {selectedAlumno.habilitado ? 'Habilitado' : 'Inhabilitado'}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleEdit}>
                Editar
              </Button>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showModalEdicion} onHide={handleCloseModalEdicion}>
            <Modal.Header closeButton>
              <Modal.Title className="modal-title-custom">
                Editar Información del Alumno
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-content-custom">
              <FormularioAlta
                selectedAlumno={selectedAlumno}
                handleCloseModalEdicion={handleCloseModalEdicion}
              />
            </Modal.Body>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default Alumnos;
