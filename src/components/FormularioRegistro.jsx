import { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { UsersProvider } from "../context/UsersContext";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
const FormularioRegistro = ({ editarUsuarios, handleClose }) => {
  const { addUser, editUsuario } = useContext(UsersProvider);

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    id: editarUsuarios ? editarUsuarios._id : uuidv4(),
    nombre: editarUsuarios ? editarUsuarios.nombre : "",
    apellido: editarUsuarios ? editarUsuarios.apellido : "",
    email: editarUsuarios ? editarUsuarios.email : "",
    password: editarUsuarios ? editarUsuarios.password : "",
    telefono: editarUsuarios ? editarUsuarios.telefono : "",
    direccion: editarUsuarios ? editarUsuarios.direccion : "",
    admin: editarUsuarios ? editarUsuarios.admin : false,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: name === "admin" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
console.log(usuario, "usuario <----------")

    if (editarUsuarios) {
      editUsuario(usuario);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usuario editado",
        showConfirmButton: false,
        timer: 1500,
      });
      handleClose();
    } else {
      addUser(usuario);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usuario registrado",
        showConfirmButton: false,
        timer: 1500,
      });
    //   navigate("/");
      setUsuario({
        id: uuidv4(),
        nombre: "",
        email: "",
        password: "",
        isAdmin: false,
      });
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={6} sm={12} lg={4} xl={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={usuario.nombre}
                onChange={handleChange}
                name="nombre"
                placeholder="Nombre del usuario"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>apellido</Form.Label>
              <Form.Control
                type="text"
                value={usuario.apellido}
                onChange={handleChange}
                name="apellido"
                placeholder="Apellido del usuario"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={usuario.email}
                name="email"
                onChange={handleChange}
                placeholder="Email del usuario"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={usuario.password}
                name="password"
                onChange={handleChange}
                placeholder="Contraseña del usuario"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="number"
                value={usuario.telefono}
                name="telefono"
                onChange={handleChange}
                placeholder="Telefono del usuario"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                type="text"
                value={usuario.direccion}
                name="direccion"
                onChange={handleChange}
                placeholder="Direccion del usuario"
              />
            </Form.Group>
            {editarUsuarios ? (
              <Form.Group className="mb-3">
                <Form.Label>Admin</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Admin"
                  checked={usuario.admin}
                  onChange={handleChange}
                  name="admin"
                />
              </Form.Group>
            ) : null}

            {editarUsuarios ? (
              <Button type="submit" variant="warning">
                Editar
              </Button>
            ) : (
              <Button type="submit" variant="success">
                Registrarse
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
FormularioRegistro.propTypes = {
  editarUsuarios: PropTypes.object,
  handleClose: PropTypes.func,
};

export default FormularioRegistro;
