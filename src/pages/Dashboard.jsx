import { useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import Alumnos from "../components/Alumnos";
import "./styleDashboard.css"; // Asegúrate de importar el archivo CSS
import FormularioAlta from "../components/FormularioAlta";
import ListadoUsuarios from "./ListaUsuarios";
import EstadisticasAlumnos from "../components/EstadisticasAlumnos";
import RegistroPagos from "../components/RegistroPagos";
import Asistencia from "../components/Asistencia";
import Partidos from "./Partidos";
import PartidosProgramados from "../components/PartidosProgramados";
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("alumnos");

  const renderContent = () => {
    switch (activeTab) {
      case "alumnos":
        return <Alumnos />;
      case "formularioAltaAlumnos":
        return <FormularioAlta />;
      case "usuarios":
        return <ListadoUsuarios />;
      case "estadisticas":
        return <EstadisticasAlumnos />;
      case "Pagos":
        return <RegistroPagos />;
      case "asistencia":
        return <Asistencia />;
      case "partidos":
        return <Partidos />;
      case "fixture":
        return <PartidosProgramados />;
      default:
        return <Alumnos />;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3} sm={12} className="sidebar-col">
          <Nav className="flex-column sidebar-nav">
            <Nav.Link
              className={activeTab === "alumnos" ? "active" : ""}
              onClick={() => setActiveTab("alumnos")}
            >
              Alumnos
            </Nav.Link>
            <Nav.Link
              className={activeTab === "formularioAltaAlumnos" ? "active" : ""}
              onClick={() => setActiveTab("formularioAltaAlumnos")}
            >
              Formulario Alta Alumnos
            </Nav.Link>
            <Nav.Link
              className={activeTab === "usuarios" ? "active" : ""}
              onClick={() => setActiveTab("usuarios")}
            >
              Alta y lista de Usuarios
            </Nav.Link>
            <Nav.Link
              className={activeTab === "estadisticas" ? "active" : ""}
              onClick={() => setActiveTab("estadisticas")}
            >
              Estadisticas
            </Nav.Link>
            <Nav.Link
              className={activeTab === "Pagos" ? "active" : ""}
              onClick={() => setActiveTab("Pagos")}
            >
              Pagos
            </Nav.Link>
            <Nav.Link
              className={activeTab === "asistencia" ? "active" : ""}
              onClick={() => setActiveTab("asistencia")}
            >
              Asistencia
            </Nav.Link>
            <Nav.Link
              className={activeTab === "partidos" ? "active" : ""}
              onClick={() => setActiveTab("partidos")}
            >
              Programación Partidos
            </Nav.Link>
            <Nav.Link
              className={activeTab === "fixture" ? "active" : ""}
              onClick={() => setActiveTab("fixture")}
            >
              Fixture
            </Nav.Link>
          </Nav>
        </Col>
        <Col md={9} sm={12} className="main-content">
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
