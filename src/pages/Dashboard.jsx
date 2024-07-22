import { useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import Alumnos from "../components/Alumnos";
import "./styleDashboard.css"; // Asegúrate de importar el archivo CSS
import FormularioAlta from "../components/FormularioAlta";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("alumnos");
  
    const renderContent = () => {
      switch (activeTab) {
        case "alumnos":
          return <Alumnos />;
        case "otro":
          return <FormularioAlta />;
        default:
          return <Alumnos />;
      }
    };
  
    return (
      <Container fluid>
        <Row>
          <Col md={3} className="sidebar-col">
            <Nav className="flex-column sidebar-nav">
              <Nav.Link
                className={activeTab === "alumnos" ? "active" : ""}
                onClick={() => setActiveTab("alumnos")}
              >
                Alumnos
              </Nav.Link>
              <Nav.Link
                className={activeTab === "otro" ? "active" : ""}
                onClick={() => setActiveTab("otro")}
              >
                Formulario Alta
              </Nav.Link>
              <Nav.Link
                className={activeTab === "otro" ? "active" : ""}
                onClick={() => setActiveTab("otro")}
              >
                Profes
              </Nav.Link>
              <Nav.Link
                className={activeTab === "otro" ? "active" : ""}
                onClick={() => setActiveTab("otro")}
              >
                Entrenamientos
              </Nav.Link>
              <Nav.Link
                className={activeTab === "otro" ? "active" : ""}
                onClick={() => setActiveTab("otro")}
              >
                Partidos
              </Nav.Link>
              {/* Agrega más opciones según sea necesario */}
            </Nav>
          </Col>
          <Col md={9} className="main-content">
            {renderContent()}
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default Dashboard;
