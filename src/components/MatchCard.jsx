import { useState } from "react";
import { Card, Button, ListGroup, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import EditMatch from "./EditMatch";
import moment from "moment";

const MatchCard = ({ match, onUpdate }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
  };

  const formattedDate = moment(match.date).format("YYYY-MM-DD");

  console.log(match, "match");
  return (
    <>
      <Card className="mb-3">
        <Card.Header>
          {formattedDate} - {match.time}{" "}
          <strong> Categoria: {match.category} </strong>{" "}
        </Card.Header>
        <Card.Body>
          <Card.Title>{match.opponent}</Card.Title>
          <Card.Text>
            <strong>Cancha:</strong> {match.field}
            <br />
            <strong>Dirección:</strong> {match.address} <br />
            <strong>Resultado:</strong> {match.resultStatus} <br />
            <strong>Goles:</strong> {match.resultScore} <br />
            <strong>Condición:</strong> {match.location}
          </Card.Text>
          <Button variant="success m-1" onClick={toggleDetails}>
            {showDetails ? "Ocultar Detalles" : "Mostrar Detalles"}
          </Button>
          <Button variant="warning" onClick={handleEditClick} className="ml-2">
            Editar
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showDetails} onHide={toggleDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Partido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup className="mt-3">
            <ListGroup.Item>
              <strong>Convocados:</strong>
            </ListGroup.Item>
            {match.convocatedPlayers.map((player) => (
              <ListGroup.Item key={player._id}>
                {player.nombre} {player.apellido}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <ListGroup className="mt-3">
            <ListGroup.Item>
              <strong>Goles:</strong>
            </ListGroup.Item>
            {match.goals.map((goal, index) => (
              <ListGroup.Item key={index}>
                {goal.player.nombre} {goal.player.apellido} - Minuto{" "}
                {goal.minute}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <ListGroup className="mt-3">
            <ListGroup.Item>
              <strong>Tarjetas Amarillas:</strong>
            </ListGroup.Item>
            {match.yellowCardPlayers.map((card, index) => (
              <ListGroup.Item key={index}>
                {card.player.nombre} {card.player.apellido} - Minuto{" "}
                {card.minute}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <ListGroup className="mt-3">
            <ListGroup.Item>
              <strong>Tarjetas Rojas:</strong>
            </ListGroup.Item>
            {match.redCardPlayers.map((card, index) => (
              <ListGroup.Item key={index}>
                {card.player.nombre} {card.player.apellido} - Minuto{" "}
                {card.minute}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <ListGroup className="mt-3">
            <ListGroup.Item>
              <strong>Observaciones:</strong>
            </ListGroup.Item>
            <ListGroup.Item>{match.observations}</ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleDetails}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Partido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditMatch
            match={match}
            onUpdate={onUpdate}
            onClose={handleEditClose}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

MatchCard.propTypes = {
  match: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    opponent: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    result: PropTypes.string,
    category: PropTypes.number.isRequired,
    resultStatus: PropTypes.string,
    resultScore: PropTypes.string,
    convocatedPlayers: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        apellido: PropTypes.string.isRequired,
      })
    ).isRequired,
    goals: PropTypes.arrayOf(
      PropTypes.shape({
        player: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          nombre: PropTypes.string.isRequired,
          apellido: PropTypes.string.isRequired,
        }).isRequired,
        minute: PropTypes.number.isRequired,
      })
    ),
    yellowCardPlayers: PropTypes.arrayOf(
      PropTypes.shape({
        player: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          nombre: PropTypes.string.isRequired,
          apellido: PropTypes.string.isRequired,
        }).isRequired,
        minute: PropTypes.number.isRequired,
      })
    ),
    redCardPlayers: PropTypes.arrayOf(
      PropTypes.shape({
        player: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          nombre: PropTypes.string.isRequired,
          apellido: PropTypes.string.isRequired,
        }).isRequired,
        minute: PropTypes.number.isRequired,
      })
    ),
    observations: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MatchCard;
