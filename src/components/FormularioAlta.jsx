import { useContext, useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { AlumnoContext } from "../context/AlumnoContext";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import axios from "axios";

const FormularioAlta = ({ selectedAlumno, handleCloseModalEdicion }) => {

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
    genero: selectedAlumno ? selectedAlumno.genero : "Masculino",
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

  const validateForm = () => {
    if (
      alumno.nombre === "" ||
      alumno.apellido === "" ||
      alumno.dni === "" ||
      alumno.categoria === "" ||
      alumno.fechaNacimiento === "" ||
      alumno.telefono === "" ||
      alumno.direccion === "" ||
      alumno.email === "" ||
      alumno.padreTutor === "" ||
      alumno.telefonoContacto === "" ||
      alumno.posicion === "" ||
      alumno.fechaIngreso === "" ||
      alumno.genero === "" ||
      alumno.observaciones === "" ||
      alumno.imagen === null
    ) {
      Swal.fire({
        title: "Error",
        text: "Todos los campos son obligatorios",
        icon: "error",
        confirmButtonText: "Aceptar",
        timer: 2000,
      });
      return false;
    }

    if (alumno.dni.length !== 8) {
      Swal.fire({
        title: "Error",
        text: "El DNI debe tener 8 dígitos",
        icon: "error",
        confirmButtonText: "Aceptar",
        timer: 2000,
      });
      return false;
    }

    if (alumno.telefono.length !== 10) {
      Swal.fire({
        title: "Error",
        text: "El teléfono debe tener 10 dígitos",
        icon: "error",
        confirmButtonText: "Aceptar",
        timer: 2000,
      });
      return false;
    }

    if (alumno.telefonoContacto.length !== 10) {
      Swal.fire({
        title: "Error",
        text: "El teléfono de contacto debe tener 10 dígitos",
        icon: "error",
        confirmButtonText: "Aceptar",
        timer: 2000,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (selectedAlumno) {
        await updateAlumno(alumno);
        Swal.fire({
          title: "Alumno Editado",
          text: "El alumno ha sido editado correctamente",
          icon: "success",
          confirmButtonText: "Aceptar",
          timer: 2000,
        });
        handleCloseModalEdicion();
      } else {
        // Verificar si el DNI ya existe en la base de datos
        try {
          const response = await axios.get(`https://backescuelariver.onrender.com/api/alumno/dni/${alumno.dni}`);
          if (response.data) {
            Swal.fire({
              title: "Error",
              text: "El DNI ya existe en la base de datos",
              icon: "error",
              confirmButtonText: "Aceptar",
              timer: 2000,
            });
            return;
          }
        } catch (error) {
          if (error.response && error.response.status !== 404) {
            // Si no es un error 404, manejarlo
            Swal.fire({
              title: "Error",
              text: "Ocurrió un error al verificar el DNI",
              icon: "error",
              confirmButtonText: "Aceptar",
              timer: 2000,
            });
            return;
          }
          // Si es un error 404, continuar con la creación del alumno
        }

        const formData = new FormData();
        for (const key in alumno) {
          formData.append(key, alumno[key]);
        }

        await addAlumnos(formData);
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
          genero: "Masculino",
          observaciones: "",
          imagen: null,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          title: "Error",
          text: "Error de validación: " + error.response.data.message,
          icon: "error",
          confirmButtonText: "Aceptar",
          timer: 2000,
        });
      } else if (error.response && error.response.status === 500) {
        Swal.fire({
          title: "Error",
          text: "Error del servidor, por favor intente nuevamente más tarde",
          icon: "error",
          confirmButtonText: "Aceptar",
          timer: 2000,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error inesperado",
          icon: "error",
          confirmButtonText: "Aceptar",
          timer: 2000,
        });
      }
      console.error(error);
    }
  };

  return (
    <Container className="containerFormularioAlta mt-5">
      <Row>
        <Col>
          <h1>Formulario de Alta</h1>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
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
              </Col>
              <Col md={6}>
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
              </Col>
            </Row>
            <Row>
              <Col md={6}>
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
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Categoría</Form.Label>
                  <Form.Control
                    value={alumno.categoria}
                    onChange={handleChange}
                    name="categoria"
                    type="number"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
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
              </Col>
              <Col md={6}>
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
              </Col>
            </Row>
            <Row>
              <Col md={6}>
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
              </Col>
              <Col md={6}>
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
              </Col>
            </Row>
            <Row>
              <Col md={6}>
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
              </Col>
              <Col md={6}>
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
              </Col>
            </Row>
            <Row>
              <Col md={6}>
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
              </Col>
              <Col md={6}>
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
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Género</Form.Label>
                  <Form.Control
                    as="select"
                    value={alumno.genero}
                    onChange={handleChange}
                    name="genero"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
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
            <Button type="submit" className="btn btn-primary mt-3">
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
