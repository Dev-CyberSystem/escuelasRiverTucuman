import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Profes from "../pages/Profes";



const Rutas = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profes" element={<Profes />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
};

export default Rutas;
