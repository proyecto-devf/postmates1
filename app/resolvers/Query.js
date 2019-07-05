const PedidoModel = require('../models/pedido');

const listarPedidos = async(root,params,context,info) => {
    const pedidos = await PedidoModel.find({});
    return pedidos
}

const soloPedido = async(root,params,context,info) => {
    const pedido = await PedidoModel.findById(params,id);
    if(!pedido) throw new Error("El pedido no existeee!!");

    return pedido.toObject();
}

const 