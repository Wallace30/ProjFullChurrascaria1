import { useState, FormEvent } from 'react';
import { api } from './services/api'; 

const carnes = [
  { id: '1', nome: 'Alcatra', imagem: '/src/img/alcatra.jpg' },
  { id: '2', nome: 'Queijo Coalho', imagem: '/src/img/coalho.jpg' },
  { id: '3', nome: 'Contra Filé', imagem: '/src/img/contra.jpg' },
  { id: '4', nome: 'Costela', imagem: '/src/img/costela.jpg' },
  { id: '5', nome: 'Costelinha', imagem: '/src/img/costelinha.jpg' },
  { id: '6', nome: 'Frango', imagem: '/src/img/frango.jpg' },
  { id: '7', nome: 'Pão de Alho', imagem: '/src/img/paoalho.jpg' },
  { id: '8', nome: 'Picanha', imagem: '/src/img/picanha.jpg' },
  { id: '9', nome: 'Tilápia', imagem: '/src/img/tilapia.jpg' },
];

const bebidas = [
  { id: '1', nome: 'Água', imagem: '/src/bebidas/agua.jpg' },
  { id: '2', nome: 'Amstel', imagem: '/src/bebidas/amstel.jpg' },
  { id: '3', nome: 'Coca-Cola', imagem: '/src/bebidas/coca.jpg' },
  { id: '4', nome: 'Heineken', imagem: '/src/bebidas/heineken.jpeg' },
  { id: '5', nome: 'Mineiro', imagem: '/src/bebidas/mineiro.jpg' },
  { id: '6', nome: 'Stapen', imagem: '/src/bebidas/stapen.jpg' },
];

const acompanhamentos = [
  { id: '1', nome: 'Couve', imagem: '/src/acompanhamento/couve.jpg' },
  { id: '2', nome: 'Maionese', imagem: '/src/acompanhamento/maionese.jpg' },
  { id: '3', nome: 'Repolho', imagem: '/src/acompanhamento/repolho.jpg' },
  { id: '4', nome: 'Salpicão', imagem: '/src/acompanhamento/salpicao.jpg' },
  { id: '5', nome: 'Tomate', imagem: '/src/acompanhamento/tomate.jpg' },
  { id: '6', nome: 'Vinagrete', imagem: '/src/acompanhamento/vinagrete.jpg' },
];

const pagamentos = [
  { id: '1', nome: 'Pix', imagem: '/src/pagamento/pix.png' },
  { id: '2', nome: 'Crédito', imagem: '/src/pagamento/credito.jpg' },
  { id: '3', nome: 'Débito', imagem: '/src/pagamento/debito.png' },
];

export default function App() {
  const [nome, setNome] = useState('');
  const [Observação, setObservacao] = useState('');
  const [carnesSelecionadas, setCarnesSelecionadas] = useState<string[]>([]);
  const [bebidasSelecionadas, setBebidasSelecionadas] = useState<string[]>([]);
  const [acompanhamentosSelecionados, setAcompanhamentosSelecionados] = useState<string[]>([]);
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState<string | null>(null);

  const handleSelecionar = (id: string, tipo: 'carne' | 'bebida' | 'acompanhamento' | 'pagamento') => {
    if (tipo === 'carne') {
      if (carnesSelecionadas.includes(id)) {
        setCarnesSelecionadas(carnesSelecionadas.filter((carneId) => carneId !== id));
      } else if (carnesSelecionadas.length < 3) {
        setCarnesSelecionadas([...carnesSelecionadas, id]);
      }
    } else if (tipo === 'bebida') {
      if (bebidasSelecionadas.includes(id)) {
        setBebidasSelecionadas(bebidasSelecionadas.filter((bebidaId) => bebidaId !== id));
      } else {
        setBebidasSelecionadas([...bebidasSelecionadas, id]);
      }
    } else if (tipo === 'acompanhamento') {
      if (acompanhamentosSelecionados.includes(id)) {
        setAcompanhamentosSelecionados(acompanhamentosSelecionados.filter((acompId) => acompId !== id));
      } else if (acompanhamentosSelecionados.length < 3) {
        setAcompanhamentosSelecionados([...acompanhamentosSelecionados, id]);
      } else {
        alert('Você só pode selecionar até 3 acompanhamentos!');
      }
    } else if (tipo === 'pagamento') {
      setPagamentoSelecionado(id);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
  
    if (!nome.trim()) {
      alert('Por favor, preencha o seu nome.');
      return;
    }
    if (carnesSelecionadas.length === 0) {
      alert('Por favor, selecione pelo menos uma carne.');
      return;
    }
    if (acompanhamentosSelecionados.length === 0) {
      alert('Por favor, selecione pelo menos um acompanhamento.');
      return;
    }
    if (!pagamentoSelecionado) {
      alert('Por favor, selecione uma forma de pagamento.');
      return;
    }
  
    const pedido = {
      nome,
      carnes: JSON.stringify(carnesSelecionadas.map((id) => carnes.find((carne) => carne.id === id)?.nome)), // Converte os nomes das carnes para uma string JSON
      bebidas: JSON.stringify(bebidasSelecionadas.map((id) => bebidas.find((bebida) => bebida.id === id)?.nome)), // Converte os nomes das bebidas para uma string JSON
      Acompanhamentos: JSON.stringify(acompanhamentosSelecionados.map((id) => acompanhamentos.find((acomp) => acomp.id === id)?.nome)), // Converte os nomes dos acompanhamentos para uma string JSON
      pagamento: pagamentos.find((pag) => pag.id === pagamentoSelecionado)?.nome,
      Observação: Observação.trim(),
    };
    
    try {
      await api.post('/pedido', pedido);
      alert('Pedido enviado com sucesso!');
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data: { message: string } } }).response?.data?.message || 'Erro ao enviar o pedido. Tente novamente.';
      alert(`Erro ao enviar o pedido: ${errorMessage}`);
    }
  };
  

  return (
    <div className="w-full min-h-screen bg-black flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-semibold text-red-900">CHURRASCARIA PONTO DO BOI</h1>
        <h2 className="mt-6 text-3xl font-semibold text-white">Faça seu pedido de marmitex aqui...</h2>
        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="text-2xl font-medium text-white">Nome:</label>
          <input
            type="text"
            placeholder="Digite seu nome completo..."
            className="w-full mb-5 p-2 rounded-lg"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <label className="text-2xl font-medium text-white mb-3">Selecione até 3 tipos de carnes:</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {carnes.map((carne) => (
              <div
                key={carne.id}
                onClick={() => handleSelecionar(carne.id, 'carne')}
                className={`border rounded-lg p-2 flex flex-col items-center cursor-pointer ${
                  carnesSelecionadas.includes(carne.id) ? 'bg-red-900 border-red-500' : 'bg-gray-800 border-gray-600'
                }`}
              >
                <img src={carne.imagem} alt={carne.nome} className="w-full h-28 object-cover rounded-lg" />
                <span className="text-white font-medium mt-2">{carne.nome}</span>
              </div>
            ))}
          </div>
          <label className="text-2xl font-medium text-white mt-6 mb-3">Selecione suas bebidas:</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {bebidas.map((bebida) => (
              <div
                key={bebida.id}
                onClick={() => handleSelecionar(bebida.id, 'bebida')}
                className={`border rounded-lg p-2 flex flex-col items-center cursor-pointer ${
                  bebidasSelecionadas.includes(bebida.id) ? 'bg-blue-900 border-blue-500' : 'bg-gray-800 border-gray-600'
                }`}
              >
                <img src={bebida.imagem} alt={bebida.nome} className="w-full h-28 object-cover rounded-lg" />
                <span className="text-white font-medium mt-2">{bebida.nome}</span>
              </div>
            ))}
          </div>
          <label className="text-2xl font-medium text-white mt-6 mb-3">Selecione seus acompanhamentos:</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {acompanhamentos.map((acomp) => (
              <div
                key={acomp.id}
                onClick={() => handleSelecionar(acomp.id, 'acompanhamento')}
                className={`border rounded-lg p-2 flex flex-col items-center cursor-pointer ${
                  acompanhamentosSelecionados.includes(acomp.id) ? 'bg-green-900 border-green-500' : 'bg-gray-800 border-gray-600'
                }`}
              >
                <img src={acomp.imagem} alt={acomp.nome} className="w-full h-28 object-cover rounded-lg" />
                <span className="text-white font-medium mt-2">{acomp.nome}</span>
              </div>
            ))}
          </div>
          <label className="text-2xl font-medium text-white mt-6 mb-3">Forma de pagamento:</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {pagamentos.map((pag) => (
              <div
                key={pag.id}
                onClick={() => handleSelecionar(pag.id, 'pagamento')}
                className={`border rounded-lg p-2 flex flex-col items-center cursor-pointer ${
                  pagamentoSelecionado === pag.id ? 'bg-yellow-900 border-yellow-500' : 'bg-gray-800 border-gray-600'
                }`}
              >
                <img src={pag.imagem} alt={pag.nome} className="w-full h-28 object-cover rounded-lg" />
                <span className="text-white font-medium mt-2">{pag.nome}</span>
              </div>
            ))}
          </div>
          <label className="text-2xl font-medium text-white mt-6 mb-3">Observações (opcional):</label>
          <textarea
            placeholder="Adicione observações sobre seu pedido..."
            className="w-full p-2 rounded-lg mb-6"
            value={Observação}
            onChange={(e) => setObservacao(e.target.value)}
          />
          <button type="submit" className="bg-red-900 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition duration-300">
            Enviar Pedido
          </button>
        </form>
      </main>
    </div>
  );
}
