import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const UsersProvider = createContext();

// eslint-disable-next-line react/prop-types
const UsersContext = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogueado, setUsuarioLogueado] = useState();

  const getUsers = async () => {
    try {
      const response = await axios.get("https://localhost:8080/api/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addUser = async (usuario) => {
    try {
      await axios.post("https://localhost:8080/api/usuarios", usuario);
      await getUsers(); //actualizar la lista de usuarios
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUsuario = async (id) => {
    try {
      await axios.delete(`https://localhost:8080/api/delete/${id}`);
      await getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const editUsuario = async (usuario) => {
    console.log(usuario, "editUsuario");
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No se proporcionó un token");
    }

    try {
      await axios.put(
        `https://localhost:8080/api/update/${usuario.id}`,
        usuario,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const loginUsuario = async (usuario) => {
    console.log(usuario, "loginUsuario");
    try {
      const response = await axios.post(
        "https://localhost:8080/api/login",
        usuario
      );
      console.log(response.data, "response.data desde el context");

      const { token } = response.data.data;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);

      setUsuarioLogueado(decoded);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <UsersProvider.Provider
      value={{
        usuarios,
        getUsers,
        addUser,
        logOut,
        deleteUsuario,
        editUsuario,
        loginUsuario,
        usuarioLogueado,
      }}
    >
      {children}
    </UsersProvider.Provider>
  );
};

export default UsersContext;
