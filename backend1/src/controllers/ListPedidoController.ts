import { FastifyRequest,FastifyReply } from "fastify";
import { ListPedidoService} from "../services/ListPedidoService";

class ListPedidoController{
    async handle(request:FastifyRequest,reply:FastifyReply){
        const listPedidoService = new ListPedidoService();
        const pedidos = await listPedidoService.execute();
        reply.send(pedidos);
    }
}
export {ListPedidoController}