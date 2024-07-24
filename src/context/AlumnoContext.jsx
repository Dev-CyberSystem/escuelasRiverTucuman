// import axios from "axios";
// import { createContext, useEffect, useState } from "react";

// const AlumnoContext = createContext();

// // eslint-disable-next-line react/prop-types
// const AlumnoProvider = ({ children }) => {
//   const [alumnosEscuela, setAlumnosEscuela] = useState([]);

//   const getAlumnos = async () => {
//     try {
//       const response = await axios.get("https://backescuelariver.onrender.com/api/alumnos");
//       setAlumnosEscuela(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const addAlumnos = async (alumno) => {
//     try {
//       await axios.post("https://backescuelariver.onrender.com/api/alumnos", alumno, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       getAlumnos(); // Actualiza la lista de alumnos después de agregar uno nuevo
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   };

//   const deleteAlumno = async (id) => {
//     try {
//       await axios.delete(`https://backescuelariver.onrender.com/api/alumnos/${id}`);
//       getAlumnos(); // Actualiza la lista de alumnos después de eliminar uno
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   };

//   const updateAlumno = async (alumno) => {
//     console.log(alumno, "alumno EDICION <--------------")
//     try {
//         await axios.put(`https://backescuelariver.onrender.com/api/alumno/${alumno._id}`, alumno, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });
//       getAlumnos(); // Actualiza la lista de alumnos después de editar uno
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }

//   useEffect(() => {
//     getAlumnos();
//   }, []);

//   return (
//     <AlumnoContext.Provider value={{ alumnosEscuela, addAlumnos, deleteAlumno, updateAlumno, getAlumnos }}>
//       {children}
//     </AlumnoContext.Provider>
//   );
// };

// export { AlumnoContext, AlumnoProvider };
// export default AlumnoContext;

import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AlumnoContext = createContext();

// eslint-disable-next-line react/prop-types
const AlumnoProvider = ({ children }) => {
  const [alumnosEscuela, setAlumnosEscuela] = useState([]);

  const getToken = () => localStorage.getItem('token');

  // const getAlumnos = async () => {
  //   const token = getToken();
  //   try {
  //     const response = await axios.get("https://backescuelariver.onrender.com/api/alumnos", {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     setAlumnosEscuela(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const getAlumnos = async () => {
    try {
      const response = await axios.get('https://backescuelariver.onrender.com/api/alumnos');
      setAlumnosEscuela(response.data);
    } catch (error) {
      console.log('Error al obtener alumnos:', error);
    }
  };
  const addAlumnos = async (alumno) => {
    const token = getToken();
    try {
      await axios.post("https://backescuelariver.onrender.com/api/alumnos", alumno, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });
      getAlumnos(); // Actualiza la lista de alumnos después de agregar uno nuevo
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteAlumno = async (id) => {
    const token = getToken();
    try {
      await axios.delete(`https://backescuelariver.onrender.com/api/alumnos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getAlumnos(); // Actualiza la lista de alumnos después de eliminar uno
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateAlumno = async (alumno) => {
   const token = getToken();
    try {
      await axios.put(`https://backescuelariver.onrender.com/api/alumno/${alumno._id}`, alumno, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });
      getAlumnos(); // Actualiza la lista de alumnos después de editar uno
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const registrarPago = async (alumnoId, mes) => {
    const token = getToken();
    try {
      await axios.post(`https://backescuelariver.onrender.com/api/alumnos/${alumnoId}/pagos`, { mes }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    getAlumnos();
  }, []);

  return (
    <AlumnoContext.Provider value={{ alumnosEscuela, getAlumnos, addAlumnos, deleteAlumno, updateAlumno, registrarPago }}>
      {children}
    </AlumnoContext.Provider>
  );
};

export { AlumnoContext, AlumnoProvider };
export default AlumnoContext;

