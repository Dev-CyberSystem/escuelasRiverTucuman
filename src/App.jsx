// App.js

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navegador from "./components/Navegador";
// import Footer from "./components/Footer";
import Rutas from "./rutas/Rutas";
import { AlumnoProvider } from "./context/AlumnoContext";
import  UsersContext  from "./context/UsersContext";


function App() {
  return (
    <UsersContext>
      <AlumnoProvider>
        <div className="App">
          <Navegador />
          <main>
            <Rutas />
          </main>
          {/* <Footer /> */}
        </div>
      </AlumnoProvider>
    </UsersContext>
  );
}

export default App;
