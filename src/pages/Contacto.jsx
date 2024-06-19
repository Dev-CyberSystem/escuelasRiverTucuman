import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button } from "react-bootstrap";
import EscuelasRiver from "../assets/img/logoEscuela.png";
import "./styleContacto.css";

const Contacto = () => {
  const initialValues = {
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    consulta: "",
  };

  const validationSchema = Yup.object({
    nombre: Yup.string().required("Nombre es requerido"),
    apellido: Yup.string().required("Apellido es requerido"),
    telefono: Yup.string().required("Teléfono es requerido"),
    email: Yup.string().email("Email inválido").required("Email es requerido"),
    consulta: Yup.string().required("Consulta es requerida"),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Formulario enviado", values);
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviar los datos a una API
    setSubmitting(false);
    resetForm();
  };
  return (
    <Container fluid className="contact-form-container mt-5">
      <Row className="justify-content-center align-items-center h-100">
        <Col md={6} className="form-box">
          <h2>Contacto</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <Field type="text" name="nombre" className="form-control" />
                  <ErrorMessage
                    name="nombre"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="apellido">Apellido</label>
                  <Field type="text" name="apellido" className="form-control" />
                  <ErrorMessage
                    name="apellido"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <Field type="text" name="telefono" className="form-control" />
                  <ErrorMessage
                    name="telefono"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field type="email" name="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="consulta">Consulta</label>
                  <Field
                    as="textarea"
                    name="consulta"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="consulta"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="mt-3">
                  Enviar
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
        <Col md={6}>
          <img src={EscuelasRiver} alt="Contacto" className="logoContacto img-fluid" />
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;
