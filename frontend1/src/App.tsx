import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CriarPedido from './CriarPedido';
import MostrarPedido from './MostrarPedido';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CriarPedido />} />
        <Route path="/pedidos" element={<MostrarPedido />} />
      </Routes>
    </Router>
  );
}

export default App;
