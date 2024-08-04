import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Form, Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

const EditMatch = ({ match, onUpdate, onClose }) => {
  const [resultStatus, setResultStatus] = useState(
    match.resultStatus || "No jugado"
  );
  const [resultScore, setResultScore] = useState(match.resultScore || "");
  const [yellowCards, setYellowCards] = useState(match.yellowCards || 0);
  const [redCards, setRedCards] = useState(match.redCards || 0);
  const [goals, setGoals] = useState(match.goals || []);
  const [yellowCardPlayers, setYellowCardPlayers] = useState(
    match.yellowCardPlayers || []
  );
  const [redCardPlayers, setRedCardPlayers] = useState(
    match.redCardPlayers || []
  );
  const [observations, setObservations] = useState(match.observations || "");
  const convocatedPlayers = match.convocatedPlayers;

  const handleAddGoal = () => {
    setGoals([
      ...goals,
      { player: { _id: "", nombre: "", apellido: "" }, minute: "" },
    ]);
  };

  const handleAddYellowCard = () => {
    setYellowCardPlayers([
      ...yellowCardPlayers,
      { player: { _id: "", nombre: "", apellido: "" }, minute: "" },
    ]);
  };

  const handleAddRedCard = () => {
    setRedCardPlayers([
      ...redCardPlayers,
      { player: { _id: "", nombre: "", apellido: "" }, minute: "" },
    ]);
  };

  const handleGoalChange = (index, field, value) => {
    const newGoals = [...goals];
    if (field === "player") {
      const player = convocatedPlayers.find((p) => p._id === value);
      newGoals[index].player = {
        _id: player._id,
        nombre: player.nombre,
        apellido: player.apellido,
      };
    } else {
      newGoals[index][field] = value;
    }
    setGoals(newGoals);
  };

  const handleYellowCardChange = (index, field, value) => {
    const newYellowCards = [...yellowCardPlayers];
    if (field === "player") {
      const player = convocatedPlayers.find((p) => p._id === value);
      newYellowCards[index].player = {
        _id: player._id,
        nombre: player.nombre,
        apellido: player.apellido,
      };
    } else {
      newYellowCards[index][field] = value;
    }
    setYellowCardPlayers(newYellowCards);
  };

  const handleRedCardChange = (index, field, value) => {
    const newRedCards = [...redCardPlayers];
    if (field === "player") {
      const player = convocatedPlayers.find((p) => p._id === value);
      newRedCards[index].player = {
        _id: player._id,
        nombre: player.nombre,
        apellido: player.apellido,
      };
    } else {
      newRedCards[index][field] = value;
    }
    setRedCardPlayers(newRedCards);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedMatch = {
      resultStatus,
      resultScore,
      yellowCards,
      redCards,
      goals,
      yellowCardPlayers,
      redCardPlayers,
      observations,
    };
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/api/matches/match/${match._id}`,
        updatedMatch,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire(
        "Partido actualizado",
        "El partido ha sido actualizado correctamente",
        "success",
        { timer: 2000 }
      );
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating match:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Resultado</Form.Label>
        <Form.Control
          as="select"
          value={resultStatus}
          onChange={(e) => setResultStatus(e.target.value)}
        >
          <option value="Ganado">Ganado</option>
          <option value="Perdido">Perdido</option>
          <option value="Empatado">Empatado</option>
          <option value="No jugado">No jugado</option>
          <option value="Suspendido">Suspendido</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Puntaje (ej. 2-1)</Form.Label>
        <Form.Control
          type="text"
          value={resultScore}
          onChange={(e) => setResultScore(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Tarjetas Amarillas</Form.Label>
        <Form.Control
          type="number"
          value={yellowCards}
          onChange={(e) => setYellowCards(parseInt(e.target.value))}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Tarjetas Rojas</Form.Label>
        <Form.Control
          type="number"
          value={redCards}
          onChange={(e) => setRedCards(parseInt(e.target.value))}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Observaciones</Form.Label>
        <Form.Control
          type="text"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
        />
      </Form.Group>
      <hr />
      <h5>Goles</h5>
      {goals.map((goal, index) => (
        <Row key={index}>
          <Col>
            <Form.Group>
              <Form.Label>Jugador</Form.Label>
              <Form.Control
                as="select"
                value={goal.player._id}
                onChange={(e) =>
                  handleGoalChange(index, "player", e.target.value)
                }
              >
                <option value="">Seleccionar jugador</option>
                {convocatedPlayers.map((player) => (
                  <option key={player._id} value={player._id}>
                    {player.nombre} {player.apellido}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Minuto</Form.Label>
              <Form.Control
                type="number"
                value={goal.minute}
                onChange={(e) =>
                  handleGoalChange(index, "minute", e.target.value)
                }
              />
            </Form.Group>
          </Col>
        </Row>
      ))}
      <Button onClick={handleAddGoal} className="m-1" variant="success">
        Agregar Gol
      </Button>
      <hr />
      <h5>Tarjetas Amarillas</h5>
      {yellowCardPlayers.map((card, index) => (
        <Row key={index}>
          <Col>
            <Form.Group>
              <Form.Label>Jugador</Form.Label>
              <Form.Control
                as="select"
                value={card.player._id}
                onChange={(e) =>
                  handleYellowCardChange(index, "player", e.target.value)
                }
              >
                <option value="">Seleccionar jugador</option>
                {convocatedPlayers.map((player) => (
                  <option key={player._id} value={player._id}>
                    {player.nombre} {player.apellido}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Minuto</Form.Label>
              <Form.Control
                type="number"
                value={card.minute}
                onChange={(e) =>
                  handleYellowCardChange(index, "minute", e.target.value)
                }
              />
            </Form.Group>
          </Col>
        </Row>
      ))}
      <Button onClick={handleAddYellowCard} className="m-1" variant="warning">
        Agregar Tarjeta Amarilla
      </Button>
      <hr />
      <h5>Tarjetas Rojas</h5>
      {redCardPlayers.map((card, index) => (
        <Row key={index}>
          <Col>
            <Form.Group>
              <Form.Label>Jugador</Form.Label>
              <Form.Control
                as="select"
                value={card.player._id}
                onChange={(e) =>
                  handleRedCardChange(index, "player", e.target.value)
                }
              >
                <option value="">Seleccionar jugador</option>
                {convocatedPlayers.map((player) => (
                  <option key={player._id} value={player._id}>
                    {player.nombre} {player.apellido}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Minuto</Form.Label>
              <Form.Control
                type="number"
                value={card.minute}
                onChange={(e) =>
                  handleRedCardChange(index, "minute", e.target.value)
                }
              />
            </Form.Group>
          </Col>
        </Row>
      ))}
      <Button onClick={handleAddRedCard} className="m-1" variant="danger">
        Agregar Tarjeta Roja
      </Button>
      <hr />
      <Button variant="primary" type="submit">
        Guardar
      </Button>
    </Form>
  );
};

EditMatch.propTypes = {
  match: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    resultStatus: PropTypes.string,
    resultScore: PropTypes.string,
    yellowCards: PropTypes.number,
    redCards: PropTypes.number,
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
    convocatedPlayers: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        apellido: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditMatch;
