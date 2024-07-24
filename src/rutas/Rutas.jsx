import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Profes from '../pages/Profes';
import Contacto from '../pages/Contacto';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute'; // Importa el componente de ruta protegida

const Rutas = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/profes' element={<Profes />} />
      <Route path='/contacto' element={<Contacto />} />
      <Route
        path='/api/admin'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path='/not-found' element={<NotFound />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Rutas;
