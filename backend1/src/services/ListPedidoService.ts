import prismaClient from "../prisma";

class ListPedidoService{
    async execute(){
        const pedido = await prismaClient.pedido.findMany()

        return pedido;
    }
}
export {ListPedidoService}