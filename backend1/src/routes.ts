import fastify, { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreatePedidoController } from "./controllers/CreatePedidoController";
import { ListPedidoController } from "./controllers/ListPedidoController";
import { DeletePedidoController } from "./controllers/DeletePedidoController";

export async function routes(fastify:FastifyInstance, options: FastifyPluginOptions) {
    
fastify.get("/pedido",async(request:FastifyRequest,reply:FastifyReply)=>{
    return new ListPedidoController().handle(request,reply)
})
fastify.post("/pedido",async(request:FastifyRequest,reply:FastifyReply)=>{
    return new CreatePedidoController().handle(request,reply)
})
fastify.delete("/pedido",(request:FastifyRequest,reply:FastifyReply)=>{
    return new DeletePedidoController().handle(request,reply)
})

}