import { useEffect, useState } from 'react';
import { api } from './services/api';

interface Pedido {
  id: string;
  nome: string;
  carnes: string[];
  bebidas: string[];
  acompanhamentos: string[];
  pagamento: string;
  observacao: string;
}

export default function MostrarPedido() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPedidos, setSelectedPedidos] = useState<string[]>([]);

  
  const fetchPedidos = async () => {
    try {
      const response = await api.get('/pedido');
      console.log('Dados retornados da API:', response.data);

      if (Array.isArray(response.data)) {
        const pedidosComArrays = response.data.map((pedido: any) => ({
          ...pedido,
          carnes: pedido.carnes ? pedido.carnes.split(',').map((item: string) => item.trim()) : [],
          bebidas: pedido.bebidas ? pedido.bebidas.split(',').map((item: string) => item.trim()) : [],
          acompanhamentos: pedido.Acompanhamentos ? pedido.Acompanhamentos.split(',').map((item: string) => item.trim()) : [],
        }));
        setPedidos(pedidosComArrays);
      } else {
        throw new Error('Dados da API inválidos');
      }
    } catch (error: unknown) {
      console.error('Erro ao buscar os pedidos:', error);
      setError('Erro ao buscar os pedidos. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

 
  const toggleSelectPedido = (id: string) => {
    setSelectedPedidos((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((pedidoId) => pedidoId !== id) 
        : [...prevSelected, id] 
    );
  };

 
  useEffect(() => {
    console.log('Iniciando busca de pedidos...');
    fetchPedidos();

    
    const intervalId = setInterval(() => {
      console.log('Buscando novos pedidos...');
      fetchPedidos();
    }, 5000);

    
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-black flex justify-center items-center">
        <p className="text-white">Carregando pedidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-black flex justify-center items-center">
        <p className="text-white">{error}</p>
      </div>
    );
  }

  if (pedidos.length === 0) {
    return (
      <div className="w-full min-h-screen bg-black flex justify-center items-center">
        <p className="text-white">Nenhum pedido encontrado.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl text-white">
        <h1 className="text-4xl font-semibold text-red-900">CHURRASCARIA PONTO DO BOI</h1>
        <h2 className="mt-6 text-3xl font-semibold">Pedidos Realizados</h2>

        <ul className="mt-6 space-y-4">
          {pedidos.map((pedido) => (
            <li
              key={pedido.id}
              onClick={() => toggleSelectPedido(pedido.id)} 
              className={`bg-gray-800 rounded-lg p-4 border border-gray-600 text-white flex justify-between items-center ${
                selectedPedidos.includes(pedido.id) ? 'bg-green-500' : ''
              }`} 
            >
              <div>
                <h3 className="text-2xl font-semibold">{pedido.nome}</h3>
                <p className="mt-2">Carnes: {pedido.carnes?.join(', ') || 'Nenhuma'}</p>
                <p>Bebidas: {pedido.bebidas?.join(', ') || 'Nenhuma'}</p>
                <p>Acompanhamentos: {pedido.acompanhamentos?.join(', ') || 'Nenhum'}</p>
                <p>Pagamento: {pedido.pagamento || 'Não informado'}</p>
                <p>Observação: {pedido.observacao || 'Nenhuma'}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
