import { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlumnoContext } from '../context/AlumnoContext';
import './styleEstadisticas.css';

const EstadisticasAlumnos = () => {
  const { alumnosEscuela } = useContext(AlumnoContext);
  const [estadisticas, setEstadisticas] = useState({
    total: 0,
    habilitados: 0,
    deshabilitados: 0,
    porCategoria: {},
    generoMasculino: 0,
    generoFemenino: 0,
    porGenero: {
      masculino: { habilitados: 0, deshabilitados: 0, porCategoria: {} },
      femenino: { habilitados: 0, deshabilitados: 0, porCategoria: {} },
    },
  });

  useEffect(() => {
    const calcularEstadisticas = () => {
      const total = alumnosEscuela.length;
      const habilitados = alumnosEscuela.filter(alumno => alumno.habilitado).length;
      const deshabilitados = total - habilitados;
      const porCategoria = alumnosEscuela.reduce((acc, alumno) => {
        acc[alumno.categoria] = (acc[alumno.categoria] || 0) + 1;
        return acc;
      }, {});
      const generoMasculino = alumnosEscuela.filter(alumno => alumno.genero === 'Masculino').length;
      const generoFemenino = alumnosEscuela.filter(alumno => alumno.genero === 'Femenino').length;
      const porGenero = {
        masculino: alumnosEscuela
          .filter(alumno => alumno.genero === 'Masculino')
          .reduce(
            (acc, alumno) => {
              acc.habilitados += alumno.habilitado ? 1 : 0;
              acc.deshabilitados += alumno.habilitado ? 0 : 1;
              acc.porCategoria[alumno.categoria] = (acc.porCategoria[alumno.categoria] || 0) + 1;
              return acc;
            },
            { habilitados: 0, deshabilitados: 0, porCategoria: {} }
          ),
        femenino: alumnosEscuela
          .filter(alumno => alumno.genero === 'Femenino')
          .reduce(
            (acc, alumno) => {
              acc.habilitados += alumno.habilitado ? 1 : 0;
              acc.deshabilitados += alumno.habilitado ? 0 : 1;
              acc.porCategoria[alumno.categoria] = (acc.porCategoria[alumno.categoria] || 0) + 1;
              return acc;
            },
            { habilitados: 0, deshabilitados: 0, porCategoria: {} }
          ),
      };

      setEstadisticas({
        total,
        habilitados,
        deshabilitados,
        porCategoria,
        generoMasculino,
        generoFemenino,
        porGenero,
      });
    };

    calcularEstadisticas();
  }, [alumnosEscuela]);

  const dataHabilitacion = [
    { name: 'Habilitados', value: estadisticas.habilitados },
    { name: 'Deshabilitados', value: estadisticas.deshabilitados },
  ];

  const dataCategorias = Object.keys(estadisticas.porCategoria).map(categoria => ({
    name: `Categoría ${categoria}`,
    value: estadisticas.porCategoria[categoria],
  }));
  const dataHabilitacionMasculino = [
    { name: 'Habilitados', value: estadisticas.porGenero.masculino.habilitados },
    { name: 'Deshabilitados', value: estadisticas.porGenero.masculino.deshabilitados },
  ];

  const dataHabilitacionFemenino = [
    { name: 'Habilitados', value: estadisticas.porGenero.femenino.habilitados },
    { name: 'Deshabilitados', value: estadisticas.porGenero.femenino.deshabilitados },
  ];

  const dataCategoriasMasculino = Object.keys(estadisticas.porGenero.masculino.porCategoria).map(
    categoria => ({
      name: `Categoría ${categoria}`,
      value: estadisticas.porGenero.masculino.porCategoria[categoria],
    })
  );

  const dataCategoriasFemenino = Object.keys(estadisticas.porGenero.femenino.porCategoria).map(
    categoria => ({
      name: `Categoría ${categoria}`,
      value: estadisticas.porGenero.femenino.porCategoria[categoria],
    })
  );

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF', '#FF0000'];

  return (
    <Container fluid className="containerEstadisticas mt-5">
      <Row className="text-center">
        <Col>
          <h1>Estadísticas de Alumnos</h1>
          <p>
            Aquí se presentan algunas estadísticas importantes sobre los alumnos de la escuela.
          </p>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={3} className="mb-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total de Alumnos</Card.Title>
              <Card.Text>{estadisticas.total}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Alumnos Habilitados</Card.Title>
              <Card.Text>{estadisticas.habilitados}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Alumnos Deshabilitados</Card.Title>
              <Card.Text>{estadisticas.deshabilitados}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Género Masculino</Card.Title>
              <Card.Text>{estadisticas.generoMasculino}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Género Femenino</Card.Title>
              <Card.Text>{estadisticas.generoFemenino}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6} className="mb-3">
        <h4>Total Escuela</h4>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={dataHabilitacion}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {dataHabilitacion.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Col>
        <Col md={6} className="mb-3">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={dataCategorias}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                fill="#82ca9d"
                dataKey="value"
              >
                {dataCategorias.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6} className="mb-3">
          <h4>Género Masculino</h4>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={dataHabilitacionMasculino}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {dataHabilitacionMasculino.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={dataCategoriasMasculino}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                fill="#82ca9d"
                dataKey="value"
              >
                {dataCategoriasMasculino.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Col>
        <Col md={6} className="mb-3">
          <h4>Género Femenino</h4>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={dataHabilitacionFemenino}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {dataHabilitacionFemenino.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={dataCategoriasFemenino}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                fill="#82ca9d"
                dataKey="value"
              >
                {dataCategoriasFemenino.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default EstadisticasAlumnos;
