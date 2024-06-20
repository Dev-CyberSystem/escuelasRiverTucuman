// import Carrousel from "../components/Carrousel";
import { Slide } from "react-awesome-reveal";
import "./styleHome.css";
// import Novedades from "../components/Novedades";
// import TarjetasInfo from "../components/TarjetasInfo";
import headerRiver from "../assets/img/header5.png";
import CantidadAlumnos from "../components/CantidadAlumnos";
import MisionVision from "../components/MisionVision";
import Valores from "../components/Valores";
import Ubicacion from "../components/Ubicacion";

const Home = () => {
  return (
    <>
      {/* <Carrousel className="styleCarusel" /> */}
      <div className="image-container">
        <img
          src={headerRiver}
          alt="logo escuelas river"
          className="header-image"
        />
        <div className="overlay-text-container">
          <Slide triggerOnce>
            <div className="overlay-text">
              <p>Vivir y jugar con grandeza.</p>
            </div>
          </Slide>
        </div>
     
      </div>
      <MisionVision />
      <CantidadAlumnos />
      <Valores />
      <Ubicacion />
     
    </>
  );
};

export default Home;
