import { useContext, useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import "./styleFormularioAlta.css";
import { AlumnoContext } from "../context/AlumnoContext";
import Swal from "sweetalert2";

const FormularioAlta = () => {
  const { addAlumnos } = useContext(AlumnoContext);

  const [alumno, setAlumno] = useState({
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
    const formData = new FormData();
    for (const key in alumno) {
      formData.append(key, alumno[key]);
    }
    addAlumnos(formData)
      .then(() => {
        Swal.fire({
          title: "Alumno Agregado",
          text: "El alumno ha sido agregado correctamente",
          icon: "success",
          confirmButtonText: "Aceptar",
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
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Tenes que completar todos los campos",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        console.log(error, "error")
      });
  };

  return (
    <Container className="containerFormularioAlta">
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
                type="number"
                placeholder="Categoría"
                value={alumno.categoria}
                onChange={handleChange}
                name="categoria"
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
            <Button type="submit" variant="outline-primary" className="mt-4">
              Guardar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormularioAlta;
