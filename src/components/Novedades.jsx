import { Card, CardGroup } from "react-bootstrap";
import inferiores from "../assets/img/divisionesInferiores.png";
import n1 from "../assets/img/n1.png";
import n2 from "../assets/img/n2.png";

const Novedades = () => {
  const cardInfo = [
    {
      img: inferiores,
      title: "Inferiores",
      text: "Atletico Tucuman vs River Plate , Divisiones formativas , Juveniles AFA 7ma, 8va y 9va del Club Atlético River Plate",
    },
    {
      img: n1,
      title: "Encuentro con Franco Armani",
      text: "Queremos agradecer a la Comisión de Filiales @comisiondefilialescarp por que través de su gestión pudimos hacer un reconocimiento a nuestro primer arquero Franco Armani con un cuadro pintado a mano por el artista Brian Abregu (integrante de nuestra Filial). Este obsequio fue entregado personalmente a Armani en el Hotel dónde el plantel concentró para el partido vs Atlético Tucumán allí pudimos charlar y agradecerle personalmente todas las alegrías que nos dio vistiendo la camiseta de River por la 5° fecha de la Copa Liga Argentina. Muchas gracias a @fabiotucznio y @miguee64 y al @riverplate por permitirnos hacer este reconocimiento",
    },
    {
      img: n2,
      title: "Reunion de filiales en Santiago del Estero",
      text: "Con Motivo de jugarse el último partido del año 2023 de River @riverplate en Santiago del Estero ,el día Viernes 22 de diciembre se realizó la reunión de Filiales del Norte , en la misma estuvo presente el Presidente Jorge Brito @jorgebrito_ok , Vicepresidentes: Matias Patanian @matias.patanian Ignacio Villarroel @ignaciovillarroel , Tesorero Ignacio Amui, Relaciones Instituciones Santiago Poblet @santiagopobletvidela también estuvieron presentes Miembros de Comisión de Filiales Fabio Tucznio @fabiotucznio Miguel Ponce @miguee64 Pablo Rossi @pablo_.rossi Pablo Quiroz @pablo_q76 Fundación River Clara Donofrio @claradonofrio y la sorpresiva presencia de nuestro DT Martin Demichelis donde pasó a saludarnos y a pedirnos que apoyemos al club desde nuestro lugar para que el 2024 sea un excelente año para nuestro amado Club. En Dicha reunión también se trataron distintos temas positivos para todas las Filiales del interior. Un Agradecimiento especial para nuestro Presidente de comision de filiales @comisiondefilialescarp Fabio Tuzcnio por su gran gestión y apoyo hacia las Filiales del interior. Por un 2024 de grandes éxitos",
    },
  ];

  return (
    <>
      <div>
        <h2 style={{ color: "red" }}>NOVEDADES</h2>
      </div>

      <CardGroup>
        {cardInfo.map((card, index) => {
          return (
            <>
              <Card key={index}>
                <Card.Img variant="top" src={card.img} />
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.text}</Card.Text>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </CardGroup>
    </>
  );
};

export default Novedades;
