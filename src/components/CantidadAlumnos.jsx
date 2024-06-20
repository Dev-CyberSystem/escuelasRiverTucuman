import fotoArco from "../assets/img/CantidadDeAlumnos.png";
import CountUp from "react-countup";
import "./styleCantidadAlumnos.css";

const CantidadAlumnos = () => {
  const targetCount = 70;
  return (
    <div className="image-container mt-5">
    <img src={fotoArco} alt="Cantidad de alumnos" className="main-image" />
    <div className="overlay-counter-box">
      <CountUp end={targetCount} duration={5} />
    </div>
  </div>
  );
};

export default CantidadAlumnos;
