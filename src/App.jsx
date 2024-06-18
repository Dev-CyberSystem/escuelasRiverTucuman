import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navegador from "./components/Navegador";
import Footer from "./components/Footer";
import Rutas from "./rutas/Rutas";

function App() {
  return (
    <div className="styleapp">
      <Navegador />
      <Rutas />
      <Footer />
    </div>
  );
}

export default App;
