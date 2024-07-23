import { useContext, useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { AlumnoContext } from "../context/AlumnoContext";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const FormularioAlta = ({ selectedAlumno, handleCloseModalEdicion }) => {

  console.log(selectedAlumno, "selectedAlumno Formulario<--------------")
  const { addAlumnos, updateAlumno } = useContext(AlumnoContext);

  const [alumno, setAlumno] = useState({
    id: selectedAlumno ? selectedAlumno._id : "",
    nombre: selectedAlumno ? selectedAlumno.nombre : "",
    apellido: selectedAlumno ? selectedAlumno.apellido : "",
    dni: selectedAlumno ? selectedAlumno.dni : "",
    categoria: selectedAlumno ? selectedAlumno.categoria : "",
    fechaNacimiento: selectedAlumno ? selectedAlumno.fechaNacimiento : "",
    telefono: selectedAlumno ? selectedAlumno.telefono : "",
    direccion: selectedAlumno ? selectedAlumno.direccion : "",
    email: selectedAlumno ? selectedAlumno.email : "",
    padreTutor: selectedAlumno ? selectedAlumno.padreTutor : "",
    telefonoContacto: selectedAlumno ? selectedAlumno.telefonoContacto : "",
    posicion: selectedAlumno ? selectedAlumno.posicion : "",
    fechaIngreso: selectedAlumno ? selectedAlumno.fechaIngreso : "",
    observaciones: selectedAlumno ? selectedAlumno.observaciones : "",
    imagen: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlumno((prevAlumno) => ({
      ...prevAlumno,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setAlumno((prevAlumno) => ({
      ...prevAlumno,
      imagen: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedAlumno) {
      updateAlumno(alumno);
      Swal.fire({
        title: "Alumno Editado",
        text: "El alumno ha sido editado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        timer: 2000,
      });
      handleCloseModalEdicion();
    } else {
      const formData = new FormData();
      for (const key in alumno) {
        formData.append(key, alumno[key]);
      }
      addAlumnos(formData);
      Swal.fire({
        title: "Alumno Agregado",
        text: "El alumno ha sido agregado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        timer: 2000,
      });
      setAlumno({
        nombre: "",
        apellido: "",
        dni: "",
        categoria: "",
        fechaNacimiento: "",
        telefono: "",
        direccion: "",
        email: "",
        padreTutor: "",
        telefonoContacto: "",
        posicion: "",
        fechaIngreso: "",
        observaciones: "",
        imagen: null,
      });
    }
  };

  return (
    <Container className="containerFormularioAlta mt-5">
      <Row>
        <Col>
          <h1>Formulario de Alta</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={alumno.nombre}
                onChange={handleChange}
                name="nombre"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apellido"
                value={alumno.apellido}
                onChange={handleChange}
                name="apellido"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>DNI</Form.Label>
              <Form.Control
                type="number"
                placeholder="DNI"
                value={alumno.dni}
                onChange={handleChange}
                name="dni"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                value={alumno.categoria}
                onChange={handleChange}
                name="categoria"
                type="number"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                placeholder="Fecha de Nacimiento"
                value={alumno.fechaNacimiento}
                onChange={handleChange}
                name="fechaNacimiento"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="number"
                placeholder="Teléfono"
                value={alumno.telefono}
                onChange={handleChange}
                name="telefono"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                placeholder="Dirección"
                value={alumno.direccion}
                onChange={handleChange}
                name="direccion"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={alumno.email}
                onChange={handleChange}
                name="email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Padre/Tutor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Padre/Tutor"
                value={alumno.padreTutor}
                onChange={handleChange}
                name="padreTutor"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Teléfono de Contacto</Form.Label>
              <Form.Control
                type="number"
                placeholder="Teléfono de Contacto"
                value={alumno.telefonoContacto}
                onChange={handleChange}
                name="telefonoContacto"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Posición</Form.Label>
              <Form.Control
                type="text"
                placeholder="Posición"
                value={alumno.posicion}
                onChange={handleChange}
                name="posicion"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha de Ingreso</Form.Label>
              <Form.Control
                type="date"
                placeholder="Fecha de Ingreso"
                value={alumno.fechaIngreso}
                onChange={handleChange}
                name="fechaIngreso"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Observaciones</Form.Label>
              <Form.Control
                type="text"
                placeholder="Observaciones"
                value={alumno.observaciones}
                onChange={handleChange}
                name="observaciones"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                name="imagen"
              />
            </Form.Group>
            <Button type="submit" className="btn btn-primary">
              Guardar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

FormularioAlta.propTypes = {
  selectedAlumno: PropTypes.object,
  handleCloseModalEdicion: PropTypes.func,
};

export default FormularioAlta;
