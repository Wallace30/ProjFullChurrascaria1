import prismaClient from "../prisma";

interface DeletePedidoProps {
  id: string;
}

class DeletePedidoService {
  async execute({ id }: DeletePedidoProps) {
    if (!id) {
      throw new Error("Solicitação inválida.");
    }

    // Consulta no Prisma sem necessidade de ObjectId
    const findCustomer = await prismaClient.pedido.findFirst({
      where: {
        id: id,  // Prisma cuida da conversão para ObjectId internamente
      },
    });

    if (!findCustomer) {
      throw new Error("Cliente não existe!");
    }

    // Deletando o pedido
    await prismaClient.pedido.delete({
      where: {
        id: findCustomer.id,
      },
    });

    return { message: "Deletado com sucesso" };
  }
}

export { DeletePedidoService };
