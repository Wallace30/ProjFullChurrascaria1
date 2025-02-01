import { FastifyRequest,FastifyReply } from "fastify";
import { DeletePedidoService } from "../services/DeletePedidoService";

class DeletePedidoController{
    async handle(request:FastifyRequest,reply:FastifyReply){
        const {id} = request.query as {id:string}
        const pedidoService = new DeletePedidoService();
        const customer = await pedidoService.execute({id});
        reply.send(customer);
    }
}
export {DeletePedidoController}