import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navegador from "./components/Navegador";
import Footer from "./components/Footer";
import Rutas from "./rutas/Rutas";
import { AlumnoProvider } from "./context/AlumnoContext";

function App() {
  return (
    <AlumnoProvider>
      <Navegador />
      <Rutas />
      <Footer />
    </AlumnoProvider>
  );
}

export default App;
