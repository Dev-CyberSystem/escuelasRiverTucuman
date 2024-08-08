import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Pagination } from "react-bootstrap";
import MatchCard from "../components/MatchCard";
import axios from "axios";

const PartidosProgramados = () => {
  const [matches, setMatches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const matchesPerPage = 9;

  const fetchCategories = async () => {
    const response = await axios.get("http://localhost:8080/api/categorias");
    setCategories(response.data);
  };

  const fetchMatches = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`http://localhost:8080/api/matches`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMatches(response.data);
    } catch (error) {
      console.error("Error al obtener partidos:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchMatches();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setCurrentPage(1);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setCurrentPage(1);
  };

  const filteredMatches = matches.filter((match) => {
    const matchDate = new Date(match.date);
    const matchMonth = matchDate.getMonth() + 1;
    const matchYear = matchDate.getFullYear();

    return (
      (selectedCategory === "" || match.category === parseInt(selectedCategory)) &&
      (selectedMonth === "" || matchMonth === parseInt(selectedMonth)) &&
      (selectedYear === "" || matchYear === parseInt(selectedYear))
    );
  });

  // Calcula el índice de los partidos a mostrar en la página actual
  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = filteredMatches.slice(indexOfFirstMatch, indexOfLastMatch);

  const totalPages = Math.ceil(filteredMatches.length / matchesPerPage);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-5 text-center">
      <h1>Partidos Programados</h1>
     
      <Form>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="categorySelect">
              <Form.Label>Categoría</Form.Label>
              <Form.Control as="select" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Todas</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    Categoría {category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="monthSelect">
              <Form.Label>Mes</Form.Label>
              <Form.Control as="select" value={selectedMonth} onChange={handleMonthChange}>
                <option value="">Todos</option>
                <option value="1">Enero</option>
                <option value="2">Febrero</option>
                <option value="3">Marzo</option>
                <option value="4">Abril</option>
                <option value="5">Mayo</option>
                <option value="6">Junio</option>
                <option value="7">Julio</option>
                <option value="8">Agosto</option>
                <option value="9">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="yearSelect">
              <Form.Label>Año</Form.Label>
              <Form.Control as="select" value={selectedYear} onChange={handleYearChange}>
                <option value="">Todos</option>
                {Array.from(new Set(matches.map((match) => new Date(match.date).getFullYear()))).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      
      <Row>
        {currentMatches.map((match) => (
          <Col md={4} key={match._id}>
            <MatchCard match={match} onUpdate={fetchMatches} />
          </Col>
        ))}
      </Row>

      <Pagination className="justify-content-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePaginationClick(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default PartidosProgramados;
