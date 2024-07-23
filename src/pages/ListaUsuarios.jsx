import { Col, Container, Row } from 'react-bootstrap'
import TablaUsuarios from '../components/TablaUsuarios'
import FormularioRegistro from '../components/FormularioRegistro'

const ListaUsuarios = () => {
  return (
    <Container fluid className='mt-5'>
        <Row>
            <Col>
            <TablaUsuarios />
            </Col>
            <Col>
            <FormularioRegistro />
            </Col>
        </Row>
    </Container>
  )
}

export default ListaUsuarios