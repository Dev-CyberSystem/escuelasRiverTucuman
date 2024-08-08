import axios from "axios";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./StyleMatchScheduler.css"; 
import Swal from "sweetalert2";
import moment from "moment";

const MatchScheduler = ({ category, selectedStudents, setSelectedStudents }) => {
  const initialValues = {
    date: "",
    time: "",
    opponent: "",
    field: "",
    address: "",
    location: "Local"
  };

  const validationSchema = Yup.object({
    date: Yup.date()
      .required("La fecha es obligatoria")
      .min(moment().startOf('day').toDate(), "La fecha no puede ser anterior a hoy"),
    time: Yup.string().required("La hora es obligatoria"),
    opponent: Yup.string()
      .required("El rival es obligatorio")
      .min(3, "El rival debe tener al menos 3 caracteres")
      .max(50, "El rival no puede exceder los 50 caracteres"),
    field: Yup.string()
      .required("La cancha es obligatoria")
      .min(3, "La cancha debe tener al menos 3 caracteres")
      .max(50, "La cancha no puede exceder los 50 caracteres"),
    address: Yup.string()
      .required("La dirección es obligatoria")
      .min(3, "La dirección debe tener al menos 3 caracteres")
      .max(100, "La dirección no puede exceder los 100 caracteres"),
    location: Yup.string().required("La ubicación es obligatoria")
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const match = {
      category,
      date: values.date,
      time: values.time,
      opponent: values.opponent,
      convocatedPlayers: selectedStudents,
      field: values.field,
      address: values.address,
      location: values.location
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("https://backescuelariver.onrender.com/api/matches", match, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Partido Programado",
          text: "El partido ha sido programado exitosamente",
          timer: 2000,
        });

        resetForm();
        setSelectedStudents([]);  // Clear selected students
      } else {
        throw new Error("Error inesperado al programar el partido");
      }
    } catch (error) {
      console.error("Error scheduling match:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al programar el partido",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const today = moment().format("YYYY-MM-DD");

  return (
    <div className="match-scheduler-container">
      <h2 className="match-scheduler-title">
        Programar Partido para Categoría {category}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="match-scheduler-form">
            <div className="match-scheduler-form-group">
              <label className="match-scheduler-label">Fecha:</label>
              <Field
                className="match-scheduler-input"
                type="date"
                name="date"
                min={today}
              />
              <ErrorMessage name="date" component="div" className="error" />
            </div>
            <div className="match-scheduler-form-group">
              <label className="match-scheduler-label">Hora:</label>
              <Field
                className="match-scheduler-input"
                type="time"
                name="time"
              />
              <ErrorMessage name="time" component="div" className="error" />
            </div>
            <div className="match-scheduler-form-group">
              <label className="match-scheduler-label">Rival:</label>
              <Field
                className="match-scheduler-input"
                type="text"
                name="opponent"
              />
              <ErrorMessage name="opponent" component="div" className="error" />
            </div>
            <div className="match-scheduler-form-group">
              <label className="match-scheduler-label">Cancha:</label>
              <Field
                className="match-scheduler-input"
                type="text"
                name="field"
              />
              <ErrorMessage name="field" component="div" className="error" />
            </div>
            <div className="match-scheduler-form-group">
              <label className="match-scheduler-label">Dirección:</label>
              <Field
                className="match-scheduler-input"
                type="text"
                name="address"
              />
              <ErrorMessage name="address" component="div" className="error" />
            </div>
            <div className="match-scheduler-form-group">
              <label className="match-scheduler-label">Ubicación:</label>
              <Field as="select" className="match-scheduler-select" name="location">
                <option value="Local">Local</option>
                <option value="Visitante">Visitante</option>
              </Field>
              <ErrorMessage name="location" component="div" className="error" />
            </div>
            <button
              className="match-scheduler-button"
              type="submit"
              disabled={isSubmitting || !isValid || selectedStudents.length === 0}
            >
              Programar Partido
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

MatchScheduler.propTypes = {
  category: PropTypes.number.isRequired,
  selectedStudents: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedStudents: PropTypes.func.isRequired,
};

export default MatchScheduler;
