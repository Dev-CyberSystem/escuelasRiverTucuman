import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Card, ListGroup, Pagination } from "react-bootstrap"; // Asegúrate de importar los componentes necesarios
import axios from "axios";
import "./StyleMatchStatistics.css";

const MatchStatistics = () => {
  const [categories, setCategories] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("http://localhost:8080/api/categorias");
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:8080/api/matches", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMatches(response.data);
      } catch (error) {
        console.error("Error al obtener partidos:", error);
      }
    };
    fetchMatches();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const filteredMatches = matches.filter((match) => {
    const matchDate = new Date(match.date);
    const matchMonth = matchDate.getMonth() + 1; // Months are zero-based
    const matchYear = matchDate.getFullYear();

    return (
      (!selectedCategory || match.category === Number(selectedCategory)) &&
      (!selectedMonth || matchMonth === Number(selectedMonth)) &&
      (!selectedYear || matchYear === Number(selectedYear))
    );
  });

  const statistics = {
    played: filteredMatches.length,
    goalsFor: filteredMatches.reduce((acc, match) => acc + match.goals.length, 0),
    goalsAgainst: 0, 
    topScorers: {},
    yellowCards: 0,
    redCards: 0,
    yellowCardPlayers: {},
    redCardPlayers: {},
    won: filteredMatches.filter((match) => match.resultStatus === "Ganado").length,
    lost: filteredMatches.filter((match) => match.resultStatus === "Perdido").length,
    drawn: filteredMatches.filter((match) => match.resultStatus === "Empatado").length,
  };

  filteredMatches.forEach((match) => {
    match.goals.forEach((goal) => {
      if (statistics.topScorers[goal.player._id]) {
        statistics.topScorers[goal.player._id].goals += 1;
      } else {
        statistics.topScorers[goal.player._id] = {
          nombre: goal.player.nombre,
          apellido: goal.player.apellido,
          goals: 1,
        };
      }
    });

    match.yellowCardPlayers.forEach((card) => {
      statistics.yellowCards += 1;
      if (statistics.yellowCardPlayers[card.player._id]) {
        statistics.yellowCardPlayers[card.player._id].cards += 1;
      } else {
        statistics.yellowCardPlayers[card.player._id] = {
          nombre: card.player.nombre,
          apellido: card.player.apellido,
          cards: 1,
        };
      }
    });

    match.redCardPlayers.forEach((card) => {
      statistics.redCards += 1;
      if (statistics.redCardPlayers[card.player._id]) {
        statistics.redCardPlayers[card.player._id].cards += 1;
      } else {
        statistics.redCardPlayers[card.player._id] = {
          nombre: card.player.nombre,
          apellido: card.player.apellido,
          cards: 1,
        };
      }
    });
  });

  const itemsPerPage = 10;

  const handlePaginationChange = (newPage) => {
    setPage(newPage);
  };

  const renderPagination = (totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
      paginationItems.push(
        <Pagination.Item key={number} active={number === page} onClick={() => handlePaginationChange(number)}>
          {number}
        </Pagination.Item>
      );
    }
    return <Pagination>{paginationItems}</Pagination>;
  };

  const paginate = (items) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  };

  return (
    <Container>
      <h1>Estadísticas de Partidos</h1>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group controlId="categoryFilter">
            <Form.Label>Filtrar por Categoría</Form.Label>
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Todas las Categorías</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="monthFilter">
            <Form.Label>Filtrar por Mes</Form.Label>
            <Form.Control
              as="select"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              <option value="">Todos los Meses</option>
              {[...Array(12).keys()].map((month) => (
                <option key={month + 1} value={month + 1}>
                  {new Date(0, month).toLocaleString("es-ES", { month: "long" })}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="yearFilter">
            <Form.Label>Filtrar por Año</Form.Label>
            <Form.Control
              as="select"
              value={selectedYear}
              onChange={handleYearChange}
            >
              <option value="">Todos los Años</option>
              {[...new Set(matches.map((match) => new Date(match.date).getFullYear()))].map(
                (year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                )
              )}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Partidos Jugados</Card.Title>
              <Card.Text>{statistics.played}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Goles a Favor</Card.Title>
              <Card.Text>{statistics.goalsFor}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Goles en Contra</Card.Title>
              <Card.Text>{statistics.goalsAgainst}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Partidos Ganados</Card.Title>
              <Card.Text>{statistics.won}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Partidos Perdidos</Card.Title>
              <Card.Text>{statistics.lost}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Partidos Empatados</Card.Title>
              <Card.Text>{statistics.drawn}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card border="danger">
            <Card.Body>
              <Card.Title>Tarjetas Rojas</Card.Title>
              <Card.Text>{statistics.redCards}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card border="warning">
            <Card.Body>
              <Card.Title>Tarjetas Amarillas</Card.Title>
              <Card.Text>{statistics.yellowCards}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Goleadores</Card.Title>
              <ListGroup>
                {paginate(Object.values(statistics.topScorers)).map((scorer, index) => (
                  <ListGroup.Item key={index}>
                    {scorer.nombre} {scorer.apellido} - {scorer.goals} goles
                  </ListGroup.Item>
                ))}
              </ListGroup>
              {renderPagination(Object.values(statistics.topScorers).length)}
            </Card.Body>
          </Card>
        </Col>
      
        <Col md={6}>
          <Card border="warning">
            <Card.Body>
              <Card.Title>Jugadores con Tarjetas Amarillas</Card.Title>
              <ListGroup>
                {paginate(Object.values(statistics.yellowCardPlayers)).map((player, index) => (
                  <ListGroup.Item key={index}>
                    {player.nombre} {player.apellido} - {player.cards} tarjetas
                  </ListGroup.Item>
                ))}
              </ListGroup>
              {renderPagination(Object.values(statistics.yellowCardPlayers).length)}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card border="danger">
            <Card.Body>
              <Card.Title>Jugadores con Tarjetas Rojas</Card.Title>
              <ListGroup>
                {paginate(Object.values(statistics.redCardPlayers)).map((player, index) => (
                  <ListGroup.Item key={index}>
                    {player.nombre} {player.apellido} - {player.cards} tarjetas
                  </ListGroup.Item>
                ))}
              </ListGroup>
              {renderPagination(Object.values(statistics.redCardPlayers).length)}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MatchStatistics;
