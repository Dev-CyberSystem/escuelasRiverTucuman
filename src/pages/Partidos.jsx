import { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import CategoryList from "../components/CategoryList";
import MatchScheduler from "../components/MatchScheduler";
import "./StylePartidos.css"; // Importa el archivo CSS

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("http://localhost:8080/api/categorias");
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedStudents([]); // Reset the selected students when category changes
  };

  const filteredCategories = selectedCategory
    ? categories.filter((category) => category.toString() === selectedCategory)
    : categories;

  return (
    <Container>
      <Row className="mt-5 text-center">
        <h1>Programación de Partidos</h1>
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
      </Row>
      <Row className="mt-5 categories-container">
        {filteredCategories.map((category) => (
          <div key={category} className="category-box">
            <CategoryList
              category={category}
              selectedStudents={selectedStudents}
              setSelectedStudents={setSelectedStudents}
            />
            <MatchScheduler
              category={category}
              selectedStudents={selectedStudents}
            />
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
