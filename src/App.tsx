import { Routes, Route } from 'react-router-dom';
import AdministracaoDePratos from './paginas/Administracao/Pratos/administracaoDePratos';
import FormularioDePrato from './paginas/Administracao/Pratos/FormularioDePrato';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes/AdministracaoRestaurantes';
import FormularioRestaurante from './paginas/Administracao/Restaurantes/AdministracaoRestaurantes/FormularioRestaurante';
import PaginaBaseDoAdmin from './paginas/Administracao/Restaurantes/AdministracaoRestaurantes/PaginaBaseDoAdmin';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path='/admin' element={<PaginaBaseDoAdmin/>}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
        
        <Route path="pratos" element={<AdministracaoDePratos />} />
        <Route path="pratos/novo" element={<FormularioDePrato />} />
      </Route>

    </Routes>
  );
}

export default App;
