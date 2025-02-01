import { FastifyRequest,FastifyReply } from "fastify";
import { CreatePedidoService } from "../services/CreatePedidoService";

class CreatePedidoController{
    async handle(request:FastifyRequest,reply:FastifyReply)
    {
        const{nome,carnes,bebidas,Acompanhamentos,Observação,pagamento} = request.body as {nome:string,carnes:string,bebidas:string,Acompanhamentos:string,Observação:string,pagamento:string}
        const PedidoService = new CreatePedidoService()

        const pedido = await PedidoService.execute({nome,carnes,bebidas,Acompanhamentos,Observação,pagamento});
        reply.send(pedido);
    }
}
export{CreatePedidoController}