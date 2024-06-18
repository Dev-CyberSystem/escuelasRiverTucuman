import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import QuienesSomos from "../pages/QuienesSomos";



const Rutas = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<QuienesSomos />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
};

export default Rutas;
