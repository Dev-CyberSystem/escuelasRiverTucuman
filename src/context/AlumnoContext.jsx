import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AlumnoContext = createContext();

// eslint-disable-next-line react/prop-types
const AlumnoProvider = ({ children }) => {
  const [alumnosEscuela, setAlumnosEscuela] = useState([]);

  const getAlumnos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/alumnos");
      setAlumnosEscuela(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addAlumnos = async (alumno) => {
    try {
      await axios.post("http://localhost:8080/api/alumnos", alumno, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      getAlumnos(); // Actualiza la lista de alumnos después de agregar uno nuevo
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteAlumno = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/alumnos/${id}`);
      getAlumnos(); // Actualiza la lista de alumnos después de eliminar uno
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    getAlumnos();
  }, []);

  return (
    <AlumnoContext.Provider value={{ alumnosEscuela, addAlumnos, deleteAlumno }}>
      {children}
    </AlumnoContext.Provider>
  );
};

export { AlumnoContext, AlumnoProvider };
export default AlumnoContext;
