import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Profes from "../pages/Profes";
import Contacto from "../pages/Contacto";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";


const Rutas = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profes" element={<Profes />} />
        <Route path="/contacto" element={<Contacto />} />
        {user && user.admin ? (
          <Route path="/api/admin" element={<Dashboard />} />
        ) : null}
        <Route path="*" className="mt-5" element={<NotFound />} />
      </Routes>
  
  );
};

export default Rutas;
