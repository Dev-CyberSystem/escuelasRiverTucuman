/* eslint-disable react/no-unescaped-entities */
import { Container, Col, Row } from "react-bootstrap";
import Player1 from "../assets/img/player1.png";
import "./styleMisionVision.css";
import escudo from "../assets/img/escudoRiver.png";

const MisionVision = () => {
  return (
    <Container className="contenedorMisionVision">
      <Row>
        <Col md={4}>
          <img src={Player1} alt="Jugador" className="img-player1" />
        </Col>
        <Col md={6}>
          <h1>FILOSOFIA RIVER</h1>
          <p>
            Más allá de sostener <b>"El Mas Grande"</b>, River quiere definirse
            por sus valores y sus valores tienen que ver con{" "}
            <b>"Vivir y Jugar con Grandeza"</b>, que abarca más que ser{" "}
            <b>"El Mas Grande"</b>. Porque la grandeza no está al final del
            camino. Las formas, as convicciones, la manera de llegar a lo que te
            propones. <br />
            Grandeza es un camino de humildad que está en la historia de{" "}
            <b> RIVER </b>, en sus logros y en el aspiracional hacia un futuro.{" "}
            <br />
            Grandeza para honrar nuestra filosofía de juego en cualquier campo,
            ser humildes en las victorias y sobreponernos a las derrotas,
            reconocer los errores y aprender de ellos, honrar a nuestro ídolos y
            formar a nuestros jóvenes, promover valores dentro y fuera de la
            cancha, ver en los rivales adversarios y no enemigos, anteponer las
            formas a los resultados, priorizar lo colectivo por sobre lo
            individual, comprometernos con la sociedad y trabajar en pos de la
            igualdad. Ser un club, una escuela y una familia. <br />
            <b>SER DE RIVER ES VIVIR Y JUGAR CON GRANDEZA</b>
          </p>
          <h2>NUESTROS OBJETIVOS</h2>
          <p>
            <img src={escudo} alt="" className="escudoObjetivos" /> {""}
            Ser una institución ejemplar por su excelencia deportiva y su
            compromiso con el juego limpio, la educación, la cultura y la acción
            social.
          </p>
          <p>
            <img src={escudo} alt="" className="escudoObjetivos" /> {""}
            Son los empleados, quienes forman parte de la vida diaria de River
            Plate, los que hacen que el club sea una institución modelo
          </p>
          <p>
            <img src={escudo} alt="" className="escudoObjetivos" /> {""}
            River se compromete con la excelencia deportiva y con el progreso
            social, elevando el nivel de la libertad de todos sus miembros
          </p>
          <p>
            <img src={escudo} alt="" className="escudoObjetivos" /> {""}
            <b>
              <i> Ser de River es vivir y jugar con grandeza. </i>
            </b>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default MisionVision;
