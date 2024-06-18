import { Container, Carousel } from "react-bootstrap";
import estadio from "../assets/img/1.png";
import enzo from "../assets/img/2.png";
import filial from "../assets/img/3.png";
import "./styleCarrousel.css";

const Carrousel = () => {

  return (
    <>
    <Container fluid className="containerCarusel">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={estadio}
            alt="Estadio"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={enzo}
            alt="Enzo"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={filial}
            alt="Filial"
          />
        </Carousel.Item>
      </Carousel>
    </Container>
  </>
  );
};

export default Carrousel;
