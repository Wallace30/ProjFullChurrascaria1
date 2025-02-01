import prismaClient from "../prisma";

interface CreatePedidoProps {
  nome: string;
  carnes: string;
  bebidas: string;
  Acompanhamentos: string;
  pagamento: string;
  Observação: string;
}

class CreatePedidoService {
  async execute({
    nome,
    carnes,
    bebidas,
    Acompanhamentos,
    Observação,
    pagamento,
  }: CreatePedidoProps) {
    // Validação individual
    const errors: string[] = [];

    if (!nome) errors.push("O campo 'nome' é obrigatório.");
    if (!carnes) errors.push("O campo 'carnes' é obrigatório.");
    if (!Acompanhamentos)
      errors.push("O campo 'Acompanhamentos' é obrigatório.");
    if (!pagamento) errors.push("O campo 'pagamento' é obrigatório.");

    if (errors.length > 0) {
      throw new Error(errors.join(" ")); // Retorna todas as mensagens de erro concatenadas
    }

    // Criação do pedido no banco de dados
    const pedido = await prismaClient.pedido.create({
      data: {
        nome,
        carnes,
        bebidas,
        Acompanhamentos,
        Observação,
        pagamento,
      },
    });

    return pedido;
  }
}

export { CreatePedidoService };
