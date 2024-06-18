import { Card } from "react-bootstrap";
import inferiores from "../assets/img/divisionesInferiores.png";
const TarjetasInfo = () => {
  return (
    <>
      <Card>
        <Card.Img variant="top" src={inferiores} />
        <Card.Body>
          <Card.Title>Inferiores</Card.Title>
          <Card.Text>
            Atletico Tucuman vs River Plate , Divisiones formativas , Juveniles
            AFA 7ma, 8va y 9va del Club Atlético River Plate
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default TarjetasInfo;