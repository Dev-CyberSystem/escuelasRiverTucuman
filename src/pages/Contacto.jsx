import { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button } from "react-bootstrap";
import EscuelasRiver from "../assets/img/logoEscuela.png";
import "./styleContacto.css";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import Footer from "../components/Footer";

const Contacto = () => {
  const form = useRef();

  const initialValues = {
    user_name: "",
    user_lastname: "",
    user_phone: "",
    user_email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    user_name: Yup.string().required("Nombre es requerido"),
    user_lastname: Yup.string().required("Apellido es requerido"),
    user_phone: Yup.number().required("Teléfono es requerido"),
    user_email: Yup.string()
      .email("Email inválido")
      .required("Email es requerido"),
    message: Yup.string().required("Consulta es requerida"),
  });

  const sendEmail = (values, { setSubmitting, resetForm }) => {
    emailjs
      .sendForm(
        "service_uf7dx3g",
        "template_1poikpi",
        form.current,
        "ctVq2-fx4RDYLyBq2"
      )
      .then(
        () => {
          Swal.fire({
            title: "Consulta enviada",
            text: "Gracias por contactarte con Escuelas River Tucumán. Te responderemos a la brevedad.",
            imageUrl: EscuelasRiver,
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: "Logo Escuelas River",
            timer: 4000,

          });
          setSubmitting(false);
          resetForm();
        },
        (error) => {

          Swal.fire({
            title: "Error al enviar la consulta",
            text: "Por favor, intente nuevamente.",
            imageUrl: EscuelasRiver,
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: "Logo Escuelas River",
            timer: 4000,
          });
          console.log("FAILED...", error);
          setSubmitting(false);
        }
      );
  };

  return (
    <>
    <Container fluid className="contact-form-container mt-5">
      <Row className="justify-content-center align-items-center h-100">
        <Col md={6} className="form-box">
          <h2>Contacto</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={sendEmail}
          >
            {({ isSubmitting }) => (
              <Form ref={form}>
                <div className="form-group">
                  <label htmlFor="user_name">Nombre</label>
                  <Field
                    type="text"
                    name="user_name"
                    className="form-control"
                    maxLength="30"
                  />
                  <ErrorMessage
                    name="user_name"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="apellido">Apellido</label>
                  <Field
                    type="text"
                    name="user_lastname"
                    className="form-control"
                    maxLength="30"
                  />
                  <ErrorMessage
                    name="user_lastname"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <Field
                    type="number"
                    name="user_phone"
                    className="form-control"
                    maxLength="15"
                  />
                  <ErrorMessage
                    name="user_phone"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="user_email">Email</label>
                  <Field
                    type="email"
                    name="user_email"
                    className="form-control"
                    maxLength="50"
                  />
                  <ErrorMessage
                    name="user_email"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Consulta</label>
                  <Field
                    as="textarea"
                    name="message"
                    className="form-control"
                    maxLength="500"
                  />
                  <ErrorMessage
                    name="message"
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
          <img
            src={EscuelasRiver}
            alt="Contacto"
            className="logoContacto img-fluid"
          />
        </Col>
      </Row>
    </Container>
      <Footer />
      </>
  );
};

export default Contacto;
