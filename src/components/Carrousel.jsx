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
            <img src={estadio} alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={enzo} alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={filial} alt="" />
          </Carousel.Item>
        </Carousel>
      </Container>
    </>
  );
};

export default Carrousel;
